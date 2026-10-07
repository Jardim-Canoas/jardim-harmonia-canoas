"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cadastro, contato, lead } from "@/dados";

type Status = "ocioso" | "enviando" | "sucesso" | "falha";

const CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
const ARMAZEM = "jh_origem";

// First touch vence: só grava se ainda não houver origem na sessão.
function capturarOrigem() {
  try {
    if (sessionStorage.getItem(ARMAZEM)) return;
    const qs = new URLSearchParams(window.location.search);
    const origem: Record<string, string> = {};
    for (const k of CHAVES) {
      const v = qs.get(k);
      if (v) origem[k] = v;
    }
    sessionStorage.setItem(ARMAZEM, JSON.stringify(origem));
  } catch {
    // storage bloqueado: segue sem UTM, o lead não pode travar por isso
  }
}

function lerOrigem(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ARMAZEM) ?? "{}");
  } catch {
    return {};
  }
}

function lerCookie(nome: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${nome.replace(".", "\\.")}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

function linkWhatsapp() {
  if (!contato.whatsapp) return "";
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(contato.mensagemWhatsapp)}`;
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>("ocioso");
  const enviando = useRef(false);

  useEffect(capturarOrigem, []);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando.current) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    enviando.current = true;
    setStatus("enviando");
    const f = new FormData(form);

    try {
      const resposta = await fetch(lead.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: f.get("nome"),
          telefone: f.get("telefone"),
          email: f.get("email"),
          consentimento: f.get("consentimento") === "on",
          website: f.get("website"),
          ...lerOrigem(),
          trf_src: lerCookie("__trf.src"),
          rdtrk: lerCookie("rdtrk"),
        }),
      });
      const json = await resposta.json().catch(() => null);
      // Só mostra sucesso se o lead realmente chegou.
      setStatus(resposta.ok && json?.ok ? "sucesso" : "falha");
      if (resposta.ok && json?.ok) form.reset();
    } catch {
      setStatus("falha");
    } finally {
      enviando.current = false;
    }
  }

  const campo =
    "mt-1 block min-h-12 w-full rounded-xl border border-tinta/15 bg-white px-4 text-base text-tinta outline-none transition-colors focus:border-verde focus:ring-2 focus:ring-verde/30 user-invalid:border-erro";
  const whats = linkWhatsapp();

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label htmlFor="nome" className="text-sm font-medium">
          {cadastro.campos.nome}
        </label>
        <input id="nome" name="nome" type="text" autoComplete="name" required minLength={2} className={campo} />
      </div>
      <div>
        <label htmlFor="telefone" className="text-sm font-medium">
          {cadastro.campos.telefone}
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          pattern="[\d\s()+\-]{10,20}"
          className={campo}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          {cadastro.campos.email}
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={campo} />
      </div>

      {/* Campo isca: humano não vê, bot preenche. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-tinta-suave">
        <input type="checkbox" name="consentimento" required className="mt-0.5 size-5 shrink-0 accent-verde" />
        <span>
          {cadastro.consentimento}{" "}
          <a href={cadastro.politicaUrl} target="_blank" rel="noopener" className="underline">
            {cadastro.linkPolitica}
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "enviando"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-verde px-7 font-semibold text-white transition-colors duration-200 hover:bg-verde-escuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde disabled:opacity-60"
      >
        {status === "enviando" ? cadastro.botaoEnviando : cadastro.botao}
      </button>

      <div role="status" aria-live="polite" className="text-sm">
        {status === "sucesso" && <p className="text-verde">{cadastro.sucesso}</p>}
        {status === "falha" && (
          <div className="space-y-3">
            <p className="text-erro">{cadastro.falha}</p>
            {whats ? (
              <a
                href={whats}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center rounded-full border border-verde px-5 font-semibold text-verde"
              >
                {cadastro.botaoWhatsapp}
              </a>
            ) : (
              <p className="font-semibold">[PREENCHER] WhatsApp do comercial</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
