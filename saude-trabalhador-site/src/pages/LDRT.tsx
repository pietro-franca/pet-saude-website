import { useState, useMemo, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  Search, Copy, Check, ChevronDown, ChevronRight,
  Briefcase, Heart, GraduationCap, Link2, ClipboardList,
  ArrowLeft, Info,
} from "lucide-react";
import { useLdrtData, type LdrtEntry } from "./ldrt/useLdrtData";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "doenca" | "risco";
type Category = "TODOS" | "FISICO" | "QUIMICO" | "BIOLOGICO" | "OUTRO";

const CATEGORY_LABELS: Record<Category, string> = {
  TODOS: "Todos",
  FISICO: "Físico",
  QUIMICO: "Químico",
  BIOLOGICO: "Biológico",
  OUTRO: "Outros",
};

const CATEGORY_COLORS: Record<Category, string> = {
  TODOS: "bg-gray-100 text-gray-600",
  FISICO: "bg-blue-50 text-blue-700",
  QUIMICO: "bg-yellow-50 text-yellow-700",
  BIOLOGICO: "bg-green-50 text-green-700",
  OUTRO: "bg-purple-50 text-purple-700",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function getKey(entry: LdrtEntry, mode: Mode) {
  return mode === "doenca"
    ? `${entry.nome_condicao.trim()} — ${entry.cid_com_ponto.trim()}`
    : entry.fator_de_risco.trim();
}

// ─── Welcome Panel ────────────────────────────────────────────────────────────

function WelcomePanel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-8 py-16 text-center">
      <div className="flex gap-4 mb-8">
        {[
          { icon: Briefcase, bg: "bg-sky-500", title: "Saúde do Trabalhador" },
          { icon: Heart, bg: "bg-emerald-500", title: "Saúde" },
          { icon: GraduationCap, bg: "bg-orange-500", title: "PET-Saúde" },
        ].map(({ icon: Icon, bg, title }) => (
          <div key={title} title={title} className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md hover:-translate-y-1 transition duration-300 ${bg}`}>
            <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">O que é a LDRT?</h2>
      <p className="text-base text-gray-600 leading-relaxed max-w-lg mb-8">
        A <strong className="text-sky-600">Lista de Doenças Relacionadas ao Trabalho</strong> é o
        instrumento oficial do SUS para reconhecer doenças causadas ou agravadas pelo trabalho,
        estabelecida pela <strong className="text-orange-600">Portaria GM/MS nº 1.999/2023</strong>.
      </p>

      <div className="flex flex-wrap gap-6 max-w-xl w-full mb-6">
        {[
          {
            icon: Link2,
            bg: "bg-indigo-50",
            iconColor: "text-indigo-700",
            title: "Nexo Causal",
            desc: "Determinar se uma doença tem origem no trabalho é o passo essencial para que o trabalhador acesse seus direitos. A LDRT orienta esse processo.",
          },
          {
            icon: ClipboardList,
            bg: "bg-teal-50",
            iconColor: "text-teal-700",
            title: "Notificação",
            desc: "Agravos relacionados ao trabalho são de notificação compulsória no SINAN. A LDRT auxilia na identificação e no preenchimento das fichas.",
          },
        ].map(({ icon: Icon, bg, iconColor, title, desc }) => (
          <div key={title} className="flex-1 bg-white border border-gray-200 rounded-xl p-5 text-left shadow-sm hover:scale-103 transition duration-300">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}>
                <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-gray-900">{title}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 max-w-xl w-full mb-6">
        <img src="/pet-ldrt-logo.webp" alt="PET Saúde Digital" className="w-6 h-6 object-contain flex-shrink-0" />
        <p className="text-xs text-violet-800 leading-snug">
          Desenvolvido no <strong>PET-Saúde/I&SD</strong> — Programa de Educação pelo Trabalho para a Saúde: Informação e Saúde Digital.
        </p>
      </div>

      <p className="flex items-center gap-1.5 text-sm text-gray-400">
        <ArrowLeft className="w-4 h-4" />
        Use a busca ao lado para começar
      </p>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

interface DetailPanelProps {
  entry: LdrtEntry;
  related: string[];
  mode: Mode;
  expansions: Record<string, string>;
  copiedKey: string | null;
  expandedCards: Set<string>;
  onBack: () => void;
  onCopyAll: (text: string, key: string) => void;
  onToggleExpand: (key: string) => void;
  onNavigate: (key: string, mode: Mode) => void;
}

function DetailPanel({
  entry, related, mode, expansions, copiedKey,
  expandedCards, onBack, onCopyAll, onToggleExpand, onNavigate,
}: DetailPanelProps) {
  const isDoenca = mode === "doenca";
  const titleText = isDoenca ? entry.nome_condicao.trim() : entry.fator_de_risco.trim();
  const headerText = isDoenca
    ? `${entry.nome_condicao.trim()} — ${entry.cid_com_ponto.trim()}`
    : entry.fator_de_risco.trim();
  const navMode: Mode = isDoenca ? "risco" : "doenca";

  const copyText = useMemo(() => {
    let t = headerText + ":\n\n";
    if (expansions[titleText]) t = headerText + "\n" + expansions[titleText] + "\n\n";
    related.forEach((r) => {
      t += `- ${r}\n`;
      if (expansions[r]) t += `  ${expansions[r]}\n`;
    });
    return t;
  }, [headerText, titleText, related, expansions]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        LDRT
      </button>

      {/* Big card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            isDoenca ? "bg-indigo-100 text-indigo-800" : "bg-teal-100 text-teal-800"
          }`}>
            {isDoenca ? "Doença / CID" : "Agente de Risco"}
          </span>
          <button
            type="button"
            onClick={() => onCopyAll(copyText, headerText)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
          >
            {copiedKey === headerText ? (
              <><Check className="w-4 h-4 text-green-500" /> Copiado</>
            ) : (
              <><Copy className="w-4 h-4" /> Copiar tudo</>
            )}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4">{headerText}</h2>

        {/* Expansion text */}
        {expansions[titleText] && (
          <div className="bg-gray-50 border border-gray-200 border-l-4 border-l-gray-400 rounded-lg p-4 mb-6 text-sm text-gray-700 leading-relaxed">
            {expansions[titleText]}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 mb-5" />

        {/* Related section */}
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4">
          <Link2 className="w-5 h-5 text-gray-400" />
          {isDoenca ? "Agentes e/ou Fatores Relacionados" : "Doenças Relacionadas"}
          <span className="ml-auto text-xs font-normal text-gray-400">
            {related.length} {related.length === 1 ? "item" : "itens"}
          </span>
        </h3>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {related.map((rel) => {
            const hasExpansion = !!expansions[rel];
            const isExpanded = expandedCards.has(rel);

            return (
              <div key={rel} className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-2 p-4">
                  <p className="flex-1 text-sm font-semibold text-gray-800 leading-snug">{rel}</p>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {hasExpansion && (
                      <button
                        type="button"
                        onClick={() => onToggleExpand(rel)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                        title="Ver descrição"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onNavigate(rel, navMode)}
                      className={`w-7 h-7 flex items-center justify-center rounded-full text-white transition-all hover:brightness-90 cursor-pointer ${
                        isDoenca ? "bg-teal-700" : "bg-indigo-800"
                      }`}
                      title={isDoenca ? "Ver doenças deste fator" : "Ver fatores desta doença"}
                    >
                      <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                {hasExpansion && isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <p className="pt-3 text-xs text-gray-600 leading-relaxed">{expansions[rel]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function LDRTApp() {
  const { loaded, data, expansions } = useLdrtData();
  const [mode, setMode] = useState<Mode>("doenca");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("TODOS");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showInfo, setShowInfo] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setQuery("");
    setCategory("TODOS");
    setSelectedKey(null);
    setExpandedCards(new Set());
  };

  const filteredList = useMemo(() => {
    const q = normalize(query);
    const seen = new Map<string, LdrtEntry>();
    for (const entry of data) {
      const cat = category === "TODOS" || entry.categoria === category;
      let match = false;
      if (mode === "doenca") {
        match = cat && (
          normalize(entry.nome_condicao).includes(q) ||
          normalize(entry.cid_com_ponto).includes(q) ||
          normalize(entry.cid_sem_ponto).includes(q)
        );
      } else {
        match = cat && normalize(entry.fator_de_risco).includes(q);
      }
      if (match) {
        const key = getKey(entry, mode);
        if (!seen.has(key)) seen.set(key, entry);
      }
    }
    return Array.from(seen.entries()).map(([key, entry]) => ({ key, entry }));
  }, [data, mode, query, category]);

  const selectedDetail = useMemo(() => {
    if (!selectedKey) return null;
    const found =
      filteredList.find((i) => i.key === selectedKey)?.entry ??
      data.find((e) => getKey(e, mode) === selectedKey);
    if (!found) return null;
    const related = new Set<string>();
    for (const d of data) {
      if (mode === "doenca" && normalize(d.nome_condicao) === normalize(found.nome_condicao)) {
        related.add(d.fator_de_risco.trim());
      } else if (mode === "risco" && normalize(d.fator_de_risco) === normalize(found.fator_de_risco)) {
        related.add(`${d.nome_condicao.trim()} — ${d.cid_com_ponto.trim()}`);
      }
    }
    return { entry: found, related: Array.from(related) };
  }, [selectedKey, data, mode, filteredList]);

  useEffect(() => {
    if (detailRef.current) detailRef.current.scrollTop = 0;
  }, [selectedKey]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedKey]);

  const navigateTo = (key: string, targetMode: Mode) => {
    setMode(targetMode);
    setQuery("");
    setCategory("TODOS");
    setSelectedKey(key);
    setExpandedCards(new Set());
  };

  const copyAll = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const isDoenca = mode === "doenca";

  if (!loaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin" />
          <p className="text-sky-700 text-sm font-medium">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-100 overflow-hidden mt-24 mb-18 mx-28 p-6 rounded-3xl">
      {/* ── Sidebar ── */}
      <aside className="w-80 xl:w-96 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 space-y-3 border-b border-gray-100 bg-gray-50/80">
          {/* Mode toggle */}
          <div className="flex gap-1 bg-gray-200 p-1 rounded-xl">
            {(["doenca", "risco"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === m
                    ? m === "doenca" ? "bg-white text-indigo-800 shadow-sm" : "bg-white text-teal-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {m === "doenca" ? "Doença" : "Fator de Risco"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isDoenca ? "Nome da doença ou CID..." : "Agente ou fator de risco..."}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition"
            />
          </div>

          {/* Category filters */}
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1.5">
              {isDoenca ? "Filtrar por fator associado:" : "Categoria:"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(["TODOS", "FISICO", "QUIMICO", "BIOLOGICO", "OUTRO"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    category === cat
                      ? isDoenca
                        ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                        : "bg-teal-100 text-teal-800 border-teal-300"
                      : `${CATEGORY_COLORS[cat]} border-transparent hover:brightness-95`
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400">
            {filteredList.length} resultado{filteredList.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-1.5 px-2">
          {filteredList.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">Nenhum resultado encontrado.</div>
          ) : (
            filteredList.map(({ key }) => {
              const isActive = selectedKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  ref={isActive ? selectedRef : undefined}
                  onClick={() => { setSelectedKey(key); setExpandedCards(new Set()); }}
                  className={`w-full text-left px-3 py-2.5 mb-0.5 rounded-lg text-sm font-medium leading-snug transition-all border cursor-pointer ${
                    isActive
                      ? isDoenca
                        ? "bg-indigo-50 border-indigo-200 text-indigo-900 border-l-4 border-l-indigo-700"
                        : "bg-teal-50 border-teal-200 text-teal-900 border-l-4 border-l-teal-700"
                      : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {key}
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ── Detail Pane ── */}
      <section ref={detailRef} className="flex-1 overflow-y-auto bg-gray-50 min-w-0 relative">
        <button
          type="button"
          onClick={() => setShowInfo(true)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 shadow-sm transition cursor-pointer"
          title="Informações sobre a LDRT"
        >
          <Info className="w-4 h-4" />
        </button>

        {selectedDetail ? (
          <DetailPanel
            entry={selectedDetail.entry}
            related={selectedDetail.related}
            mode={mode}
            expansions={expansions}
            copiedKey={copiedKey}
            expandedCards={expandedCards}
            onBack={() => setSelectedKey(null)}
            onCopyAll={copyAll}
            onToggleExpand={(key) =>
              setExpandedCards((prev) => {
                const next = new Set(prev);
                next.has(key) ? next.delete(key) : next.add(key);
                return next;
              })
            }
            onNavigate={navigateTo}
          />
        ) : (
          <WelcomePanel />
        )}
      </section>

      {/* ── Info Dialog ── */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowInfo(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <img src="/pet-ldrt-logo.webp" alt="PET" className="w-10 h-10 object-contain" />
              <div>
                <p className="font-bold text-gray-900">LDRT</p>
                <p className="text-sm text-gray-500">Lista de Doenças Relacionadas ao Trabalho</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Ferramenta de consulta à <strong>Portaria GM/MS nº 1.999/2023</strong>, que estabelece a LDRT — referência do SUS para identificar condições de saúde causadas ou agravadas pelo trabalho.
            </p>
            <p className="text-xs text-gray-400 mb-5">
              Desenvolvido no <strong>PET-Saúde/I&SD</strong> — Programa de Educação pelo Trabalho para a Saúde: Informação e Saúde Digital.
            </p>
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="w-full py-2 text-sm font-semibold text-sky-700 hover:text-sky-800 transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LDRT() {
  if (isMobileDevice()) {
    window.open("/ldrt/pwa/index.html", "_blank", "noopener");
    return <Navigate to="/" replace />;
  }

  return (
    <main className="h-[calc(100vh)] flex flex-col bg-sky-800 py-8" data-lenis-prevent>
      <LDRTApp />
    </main>
  );
}
