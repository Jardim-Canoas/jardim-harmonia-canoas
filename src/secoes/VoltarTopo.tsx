"use client";

import { ArrowUp } from "lucide-react";
import { rodape } from "@/dados";
import { reduzMovimento } from "./util";

export function VoltarTopo() {
  return (
    <button
      className="rod-topo"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduzMovimento() ? "auto" : "smooth" })}
    >
      {rodape.voltarTopo} <ArrowUp aria-hidden="true" />
    </button>
  );
}
