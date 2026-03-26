import { useState, useEffect } from "react";

export interface LdrtEntry {
  fator_de_risco: string;
  cid_com_ponto: string;
  cid_sem_ponto: string;
  nome_condicao: string;
  categoria: "FISICO" | "QUIMICO" | "BIOLOGICO" | "OUTRO";
}

declare global {
  interface Window {
    LDRT_DATA: LdrtEntry[];
    EXPANSION_TEXTS: Record<string, string>;
  }
}

export function useLdrtData() {
  const [loaded, setLoaded] = useState(() => !!window.LDRT_DATA);

  useEffect(() => {
    if (window.LDRT_DATA) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "/ldrt/pwa/js/data.js";
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return {
    loaded,
    data: (window.LDRT_DATA ?? []) as LdrtEntry[],
    expansions: (window.EXPANSION_TEXTS ?? {}) as Record<string, string>,
  };
}
