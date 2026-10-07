<?php
/**
 * Jardim Harmonia Canoas - recebimento de lead.
 *
 * Caminho do lead: form -> este arquivo -> RD Station -> integracao nativa -> CV CRM.
 * Nao postar direto no CV enquanto o RD estiver no caminho: duplica o lead.
 *
 * Este arquivo mora em public/api/ de proposito. O Next copia public/ para out/,
 * entao ele sobe junto no deploy. PHP solto no public_html seria apagado.
 *
 * A API key NAO fica aqui. Fica no arquivo de config fora do webroot.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ---------------------------------------------------------------- config

$config = null;
foreach ([
    dirname($_SERVER['DOCUMENT_ROOT']) . '/config/jardim-harmonia-canoas.php',
    getenv('HOME') . '/config/jardim-harmonia-canoas.php',
] as $caminho) {
    if (is_readable($caminho)) {
        $config = require $caminho;
        break;
    }
}

if (!is_array($config) || empty($config['rd_api_key'])) {
    registrar('config ausente ou sem rd_api_key', []);
    responder(500, false, 'indisponivel');
}

$logPath = $config['log'] ?? (dirname($_SERVER['DOCUMENT_ROOT']) . '/logs/leads.log');

// ---------------------------------------------------------------- entrada

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, false, 'metodo nao permitido');
}

$bruto = file_get_contents('php://input');
if ($bruto === false || strlen($bruto) > 20000) {
    responder(400, false, 'requisicao invalida');
}

$dados = json_decode($bruto, true);
if (!is_array($dados)) {
    responder(400, false, 'json invalido');
}

// Campo isca. Humano nunca preenche; bot preenche. Responde 200 e descarta.
if (!empty($dados['website'])) {
    responder(200, true, null);
}

$nome     = limpar($dados['nome'] ?? '', 120);
$email    = strtolower(limpar($dados['email'] ?? '', 160));
$telefone = telefoneE164($dados['telefone'] ?? '');

if ($nome === '' || mb_strlen($nome) < 2) {
    responder(422, false, 'nome invalido');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, false, 'email invalido');
}
if ($telefone === null) {
    responder(422, false, 'telefone invalido');
}

// ---------------------------------------------------------------- payload

$payload = [
    'conversion_identifier' => $config['conversion_identifier'] ?? 'lp-jardim-harmonia-canoas-formulario-principal',
    'name'                  => $nome,
    'email'                 => $email,
    'mobile_phone'          => $telefone,
    'cf_empreendimento'     => 'Jardim Harmonia Canoas',
    'cf_utm_source'         => limpar($dados['utm_source']   ?? '', 100),
    'cf_utm_medium'         => limpar($dados['utm_medium']   ?? '', 100),
    'cf_utm_campaign'       => limpar($dados['utm_campaign'] ?? '', 150),
    'cf_utm_content'        => limpar($dados['utm_content']  ?? '', 150),
    'cf_utm_term'           => limpar($dados['utm_term']     ?? '', 150),
];

// idempreendimento: sem ele o lead cai no CV sem empreendimento e some do
// funil por produto. Fica de fora do payload enquanto nao for confirmado.
if (!empty($config['idempreendimento'])) {
    $payload['idempreendimento'] = (string) $config['idempreendimento'];
}

// Origem. O cookie __trf.src preenche a origem sozinho no RD e e o jeito
// preferido quando o script de monitoramento esta na pagina.
if (!empty($dados['trf_src'])) {
    $payload['traffic_source'] = 'encoded_' . limpar($dados['trf_src'], 600);
}
if (!empty($dados['rdtrk'])) {
    $payload['cf_rdtrk'] = limpar($dados['rdtrk'], 600);
}
if (!empty($dados['client_id'])) {
    $payload['client_id'] = limpar($dados['client_id'], 80);
}
if (!empty($dados['gclid'])) {
    $payload['cf_gclid'] = limpar($dados['gclid'], 200);
}
if (!empty($dados['fbclid'])) {
    $payload['cf_fbclid'] = limpar($dados['fbclid'], 200);
}

// LGPD: so manda base legal se a pessoa marcou o aceite na tela.
if (!empty($dados['consentimento'])) {
    $payload['legal_bases'] = [[
        'category' => 'communications',
        'type'     => 'consent',
        'status'   => 'granted',
    ]];
}

$payload = array_filter($payload, static fn($v) => $v !== '' && $v !== null);

$corpo = json_encode([
    'event_type'   => 'CONVERSION',
    'event_family' => 'CDP',
    'payload'      => $payload,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

// ---------------------------------------------------------------- envio

$url = 'https://api.rd.services/platform/conversions?api_key=' . rawurlencode($config['rd_api_key']);

$tentativas = 0;
while (true) {
    $tentativas++;
    [$status, $resposta, $erroRede] = postar($url, $corpo);

    if ($status >= 200 && $status < 300) {
        responder(200, true, null);
    }

    // 429: o RD devolve remaining_time em ms. Espera e tenta de novo, no maximo
    // duas vezes. Loop imediato so piora.
    if ($status === 429 && $tentativas < 3) {
        $json = json_decode((string) $resposta, true);
        $espera = isset($json['remaining_time']) ? (int) $json['remaining_time'] : 1500;
        usleep(min(max($espera, 500), 4000) * 1000);
        continue;
    }

    break;
}

// Falhou. O lead nao pode sumir: grava tudo e avisa o front, que entao oferece
// o WhatsApp. Dizer "recebido" sem entregar e pior do que assumir a falha.
registrar('falha no envio ao RD', [
    'status'    => $status,
    'erro_rede' => $erroRede,
    'resposta'  => is_string($resposta) ? mb_substr($resposta, 0, 500) : null,
    'payload'   => $payload,
]);

responder(502, false, 'nao entregue');

// ---------------------------------------------------------------- apoio

function postar(string $url, string $corpo): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $corpo,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT        => 12,
    ]);
    $resposta  = curl_exec($ch);
    $status    = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $erroRede  = curl_errno($ch) ? curl_error($ch) : null;
    curl_close($ch);

    return [$status, $resposta, $erroRede];
}

function limpar($valor, int $max): string
{
    if (!is_scalar($valor)) {
        return '';
    }
    $v = trim((string) $valor);
    $v = str_replace(["\r", "\n", "\t"], ' ', $v);
    $v = preg_replace('/\s+/u', ' ', $v) ?? '';

    return mb_substr($v, 0, $max);
}

function telefoneE164($valor): ?string
{
    if (!is_scalar($valor)) {
        return null;
    }
    $d = preg_replace('/\D+/', '', (string) $valor) ?? '';
    $d = ltrim($d, '0');

    if (str_starts_with($d, '55') && strlen($d) >= 12) {
        $d = substr($d, 2);
    }
    // DDD + 8 ou 9 digitos
    if (strlen($d) < 10 || strlen($d) > 11) {
        return null;
    }

    return '+55' . $d;
}

function registrar(string $mensagem, array $contexto): void
{
    global $logPath;
    $destino = $logPath ?? (sys_get_temp_dir() . '/leads.log');
    $pasta = dirname($destino);
    if (!is_dir($pasta)) {
        @mkdir($pasta, 0750, true);
    }
    $linha = json_encode([
        'quando'   => date('c'),
        'mensagem' => $mensagem,
        'contexto' => $contexto,
    ], JSON_UNESCAPED_UNICODE) . PHP_EOL;

    @file_put_contents($destino, $linha, FILE_APPEND | LOCK_EX);
}

function responder(int $status, bool $ok, ?string $erro): void
{
    http_response_code($status);
    echo json_encode($erro === null ? ['ok' => $ok] : ['ok' => $ok, 'erro' => $erro]);
    exit;
}
