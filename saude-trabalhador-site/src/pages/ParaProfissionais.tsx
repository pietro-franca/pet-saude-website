import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  // ArrowRight,
  Baby,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  // ChevronUp,
  ClipboardList,
  ExternalLink,
  FileText,
  Gavel,
  HeartPulse,
  Info,
  MapPin,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Biohazard,
  Clock,
  Mail,
  Phone,
  XCircle,
} from "lucide-react";
import { Card } from "../app/components/ui/card";

// ─── QUANDO NOTIFICAR ─────────────────────────────────────────────────────────
const casosObrigatorios = [
  {
    icon: Baby,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-300",
    titulo: "Acidente com menor de 18 anos",
    detalhe: "Toda ocorrência envolvendo criança ou adolescente em situação de trabalho, incluindo trabalho informal e doméstico.",
  },
  {
    icon: Biohazard,
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-300",
    titulo: "Exposição a material biológico",
    detalhe: "Acidente com material perfurocortante, respingos ou contato com sangue e fluidos corporais em ambiente de trabalho.",
  },
  {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-400",
    titulo: "Acidente de trabalho grave ou fatal",
    detalhe: "Qualquer evento que resulte em morte, amputação, fratura exposta, lesão permanente ou internação.",
  },
  {
    icon: HeartPulse,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-300",
    titulo: "Suspeita ou confirmação de doença relacionada ao trabalho",
    detalhe: "LER/DORT, pneumoconioses, intoxicação por agrotóxico, transtornos mentais relacionados ao trabalho, entre outros.",
  },
];

// ─── PASSO A PASSO ────────────────────────────────────────────────────────────
const passos = [
  {
    numero: "01",
    icon: ClipboardList,
    titulo: "Realize o atendimento e documente",
    descricao:
      "Conduza o atendimento clínico completo e registre no prontuário: diagnóstico (CID-10), descrição do evento, relação com o trabalho, dados da empresa/local de trabalho e conduta adotada.",
    dica: "O prontuário é a base para todos os outros instrumentos de notificação.",
  },
  {
    numero: "02",
    icon: Stethoscope,
    titulo: "Identifique o nexo causal",
    descricao:
      "Investigue a relação entre o agravo apresentado e a atividade laboral do paciente. Pergunte sobre a ocupação, o ambiente de trabalho e a exposição a agentes de risco. O nexo causal é o elemento central da notificação.",
    dica: "Mesmo na suspeita, notifique. Não é necessária confirmação diagnóstica.",
  },
  {
    numero: "03",
    icon: FileText,
    titulo: "Preencha a ficha de notificação do SINAN",
    descricao:
      "Acesse o sistema da unidade de saúde ou o portal do SINAN e preencha a ficha correspondente ao agravo. Informe todos os campos obrigatórios: dados do paciente, do agravo, do estabelecimento de saúde e da exposição.",
    dica: 'Use a ficha correta conforme o tipo de agravo (ex.: "Acidente de Trabalho Grave", "Intoxicação Exógena", etc.).',
  },
  {
    numero: "04",
    icon: MapPin,
    titulo: "Encaminhe à Vigilância Epidemiológica",
    descricao:
      "Envie a ficha preenchida para a Vigilância Epidemiológica do seu município dentro do prazo estabelecido. Em casos graves ou fatais, a notificação deve ser imediata (por telefone ou sistema), e confirmada em até 24 horas.",
    dica: "Guarde o comprovante de envio. O fluxo segue: Unidade → Secretaria Municipal → Estadual → Ministério da Saúde.",
  },
  {
    numero: "05",
    icon: Building2,
    titulo: "Acione o CEREST, se necessário",
    descricao:
      "Em casos de maior complexidade, doenças ocupacionais raras, necessidade de investigação do ambiente de trabalho ou capacitação da equipe, acione o CEREST da sua região. Eles são o suporte técnico especializado da rede.",
    dica: "O CEREST também pode auxiliar no estabelecimento do nexo causal em casos de difícil diagnóstico.",
  },
];

// ─── PROTEÇÃO LEGAL ───────────────────────────────────────────────────────────
const leis = [
  {
    sigla: "Lei 8.080/1990",
    descricao: "Lei Orgânica da Saúde. Estabelece a notificação compulsória como obrigação de todo profissional de saúde e define a vigilância epidemiológica como competência do SUS.",
  },
  {
    sigla: "Portaria de Consolidação nº 4/2017",
    descricao: "Define a Lista Nacional de Notificação Compulsória de doenças, agravos e eventos de saúde pública. Os acidentes de trabalho graves, fatais e com menores são de notificação imediata.",
  },
  {
    sigla: "Código de Ética Médica",
    descricao: "O CFM veda ao médico deixar de notificar às autoridades competentes os casos de doenças de notificação compulsória. A omissão pode constituir infração ético-disciplinar.",
  },
  {
    sigla: "Resolução CFM nº 2.183/2018",
    descricao: "Dispõe especificamente sobre normas para médicos que atendem trabalhadores, reforçando o dever de notificação, o estabelecimento do nexo causal e a emissão de laudos.",
  },
];

// ─── OBJETIVOS SINAN ──────────────────────────────────────────────────────────
const sinanObjetivos = [
  "Coletar e processar dados sobre agravos de notificação compulsória em todo o território nacional",
  "Fornecer informações para análise do perfil de morbidade e tomadas de decisão nos níveis federal, estadual e municipal",
  "Detectar surtos, epidemias e situações de risco à saúde do trabalhador com rapidez",
  "Iniciar investigações epidemiológicas dos casos notificados",
  "Subsidiar o planejamento e definição de prioridades de intervenção em vigilância, promoção e prevenção",
  "Avaliar o impacto das intervenções e o comportamento dos agravos notificáveis ao longo do tempo",
];

// ─── ATRIBUIÇÕES CEREST ───────────────────────────────────────────────────────
const cerestAtribuicoes = [
  "Prestar suporte técnico especializado à Rede de Atenção à Saúde (RAS) no que se refere à saúde do trabalhador",
  "Realizar vigilância epidemiológica e sanitária dos ambientes e processos de trabalho",
  "Notificar e investigar os acidentes de trabalho graves, fatais e com crianças/adolescentes",
  "Capacitar profissionais de saúde da rede SUS para reconhecimento, diagnóstico e notificação dos agravos",
  "Articular e coordenar a RENAST no âmbito regional",
  "Produzir e divulgar informações epidemiológicas e técnicas sobre saúde do trabalhador",
];

// ─── INSTRUMENTOS (CAT / SINAN / RAAT) ────────────────────────────────────────
const instrumentos = [
  {
    sigla: "CAT",
    nome: "Comunicação de Acidente de Trabalho",
    finalidade: "Previdenciária e Laboral",
    colorClass: "border-orange-400",
    titleClass: "text-orange-600",
    bgClass: "bg-orange-50",
    icon: FileText,
    descricao:
      "A CAT é o instrumento que formaliza o acidente de trabalho ou doença ocupacional perante o INSS. Seu foco é garantir a proteção social do segurado, permitindo o acesso a benefícios acidentários e estabilidade provisória.",
    publico:
      "Exclusivamente trabalhadores segurados pelo Regime Geral de Previdência Social (CLT, avulsos, segurados especiais). Não se aplica a servidores públicos estatutários ou trabalhadores informais.",
    responsavel:
      "Empresa (obrigação primária). Na inércia, pode ser emitida pelo médico assistente, sindicato ou pelo próprio trabalhador.",
    prazo: "Até o primeiro dia útil seguinte à ocorrência (imediatamente em caso de óbito).",
    legislacao: "Lei 8.213/1991",
    erroComum: {
      erro: 'A empresa se recusa a emitir a CAT ou diz que "vai resolver internamente".',
      correcao: "O trabalhador, o médico ou o sindicato podem emitir a CAT mesmo sem a empresa. A omissão da empresa é infração administrativa.",
    },
  },
  {
    sigla: "SINAN",
    nome: "Sistema de Informação de Agravos de Notificação",
    finalidade: "Vigilância Epidemiológica",
    colorClass: "border-sky-400",
    titleClass: "text-sky-500",
    bgClass: "bg-sky-50",
    icon: ClipboardList,
    descricao:
      "O SINAN é a ferramenta do Ministério da Saúde para monitorar a saúde da população. A notificação não gera benefícios financeiros diretos ao trabalhador, mas é crucial para o planejamento de políticas públicas e fiscalização de ambientes de trabalho.",
    publico:
      "Universal. Deve-se notificar todo e qualquer trabalhador: formal, informal, autônomo, servidor público, criança/adolescente em trabalho infantil.",
    responsavel:
      "Profissional de saúde (médico, enfermeiro ou outro profissional habilitado) da unidade que realiza o atendimento.",
    prazo: "Imediata para casos graves/fatais. Em até 7 dias para casos não urgentes.",
    legislacao: "Portaria de Consolidação nº 4/2017 (Anexo 1)",
    erroComum: {
      erro: "Acreditar que apenas trabalhadores com carteira assinada devem ser notificados.",
      correcao: "A notificação no SINAN é universal, incluindo informais, autônomos, domésticos e servidores públicos.",
    },
  },
  {
    sigla: "RAAT",
    nome: "Relatório de Atendimento ao Acidentado do Trabalho",
    finalidade: "Assistencial e Administrativa Local",
    colorClass: "border-emerald-400",
    titleClass: "text-emerald-500",
    bgClass: "bg-emerald-50",
    icon: UserCheck,
    descricao:
      "O RAAT é um documento administrativo-clínico do SUS para registrar o nexo causal entre o trabalho e o atendimento prestado. Em muitas redes, funciona como documento de entrada que alimenta o SINAN e serve como comprovante para perícias.",
    publico: "Qualquer cidadão atendido na rede SUS por agravo relacionado ao trabalho, independente de vínculo empregatício.",
    responsavel: "Equipe de saúde da unidade de atendimento (UBS, UPA, Pronto-Socorro, CEREST).",
    prazo: "No momento do atendimento.",
    legislacao: "Protocolos Estaduais/Municipais e normas do CEREST regional",
    erroComum: {
      erro: "Confundir o RAAT com a notificação epidemiológica, achando que um substitui o outro.",
      correcao: "O RAAT e o SINAN são complementares. O RAAT documenta o atendimento, já o SINAN notifica o agravo ao sistema de vigilância.",
    },
  },
];

// ─── TABELA COMPARATIVA ───────────────────────────────────────────────────────
const tableRows = [
  { criterio: "Foco Principal", cat: "Direitos Previdenciários (INSS)", sinan: "Notificação Epidemiológica", raat: "Registro de Atendimento (SUS)" },
  { criterio: "Vínculo Empregatício", cat: "Apenas CLT / Segurados RGPS", sinan: "Qualquer vínculo (Universal)", raat: "Qualquer paciente atendido" },
  { criterio: "Responsável Principal", cat: "Empresa (ou médico / sindicato)", sinan: "Profissional de Saúde", raat: "Equipe de Saúde da Unidade" },
  { criterio: "Legislação Base", cat: "Lei 8.213/1991", sinan: "Portaria de Consolidação 4/2017", raat: "Protocolos Estaduais/Municipais" },
  { criterio: "Gera Benefício Financeiro?", cat: "Sim (benefício acidentário INSS)", sinan: "Não diretamente", raat: "Não diretamente" },
  { criterio: "Alimenta Dados Públicos?", cat: "Parcialmente (via eSocial)", sinan: "Sim, banco nacional de agravos", raat: "Sim, SINAN e controle local" },
];

// ─── FONTES ───────────────────────────────────────────────────────────────────
// const fontes = [
//   { texto: "Ministério da Saúde — Portal SINAN: Manual do SINAN de Doenças e Agravos", link: "https://portalsinan.saude.gov.br/" },
//   { texto: "Ministério da Previdência Social: Instruções para preenchimento da CAT", link: "https://www.gov.br/previdencia" },
//   { texto: "Conselho Federal de Medicina (CFM): Resolução CFM nº 2.183/2018", link: "https://www.cfm.org.br" },
//   { texto: "CEREST — Centro de Referência em Saúde do Trabalhador (MS)", link: "https://www.gov.br/saude/pt-br/composicao/svsa/cerest" },
//   { texto: "Portaria de Consolidação nº 4/2017 — Lista Nacional de Notificação Compulsória", link: "https://bvsms.saude.gov.br" },
//   { texto: "Lei nº 8.080/1990 — Lei Orgânica da Saúde", link: "https://www.planalto.gov.br/ccivil_03/leis/l8080.htm" },
// ];

// ─── COMPONENTE: EXPANDABLE CARD ─────────────────────────────────────────────
function ExpandCard({
  title,
  subtitle,
  icon: Icon,
  colorClass,
  bgClass,
  titleClass,
  link,
  linkLabel,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  titleClass?: string;
  link?: string;
  linkLabel?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const textColor = titleClass ?? colorClass.replace("border-", "text-");

  return (
    <div className={`rounded-2xl border-2 ${colorClass} overflow-hidden shadow-md transition-shadow hover:shadow-lg`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`w-full text-left px-6 py-5 ${bgClass} flex items-start justify-between gap-4 cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white border shrink-0 ${colorClass}`}>
            <Icon className={`w-6 h-6 ${textColor}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${textColor}`}>{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 mt-1 shrink-0 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-5 bg-white border-t border-gray-100 space-y-4">
          {children}
          {link && linkLabel && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-semibold ${textColor} hover:underline`}
            >
              <ExternalLink className="w-4 h-4" />
              {linkLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENTE: ALERTA DE ERRO ───────────────────────────────────────────────
function ErroComum({ erro, correcao }: { erro: string; correcao: string }) {
  return (
    <div className="rounded-xl p-4">
      <div className="flex gap-2 mb-2">
        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-700">
          <strong>Erro comum:</strong> {erro}
        </p>
      </div>
      <div className="flex gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-700">
          <strong>Correção:</strong> {correcao}
        </p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ParaProfissionais() {
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("cerest@botucatu.sp.gov.br");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-sky-700 pt-32 pb-20 px-6">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none select-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #fb923c 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sky-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6 hover:-translate-y-1 transition cursor-default">
            <ShieldCheck className="w-4 h-4" />
            Área do Profissional de Saúde
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Vigilância em
            <br />
            <span className="text-orange-400">Saúde do Trabalhador</span>
          </h1>
          <p className="text-sky-100 text-lg sm:text-xl max-w-2xl leading-relaxed">
            A notificação de acidentes e doenças ocupacionais é um{" "}
            <strong className="text-white">dever ético e legal</strong> do profissional de saúde. Conheça os
            instrumentos, saiba quando e como notificar e entenda como a legislação protege você.
          </p>
        </div>
      </section>

      {/* ── CONSCIENTIZAÇÃO ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <span className="text-orange-500 font-semibold uppercase tracking-widest">Conscientização</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-7">
            Por que a Vigilância em Saúde do Trabalhador importa?
          </h2>
          <div className="flex flex-col-reverse min-[1080px]:block">
            <div className="overflow-hidden rounded-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] min-[1080px]:float-right min-[1080px]:w-[45%] min-[1080px]:ml-10 max-[1080px]:mt-12 mb-6">
              <img src="/pet-consulta-medica.png" alt="" className="w-full h-auto hover:scale-105 transition duration-300" />
            </div>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                A saúde do trabalhador é uma área da Saúde Pública que procura entender como o trabalho influencia
                a saúde das pessoas e, a partir disso, agir para melhorar essa relação. Nesse contexto, doenças e
                acidentes no ambiente de trabalho não acontecem por acaso, eles costumam revelar problemas
                estruturais que poderiam ser evitados com <span className="text-sky-600">medidas adequadas de prevenção</span>.
              </p>
              <p>
                Para que esses problemas sejam identificados e enfrentados de forma eficaz, é necessário que
                existam dados confiáveis sobre sua ocorrência. É justamente nesse ponto que a <span className="text-sky-600">notificação</span>{' '}
                dos agravos relacionados ao trabalho se torna fundamental.
              </p>
              <p>
                No entanto, a subnotificação ainda é um dos grandes desafios da saúde pública. Quando um problema
                de saúde não é registrado, ele deixa de existir para o sistema, o que dificulta a criação de políticas,
                a fiscalização e a prevenção. Assim, o profissional de saúde assume um <span className="text-sky-600">papel essencial</span> nesse processo,
                pois é quem garante que essas informações sejam corretamente notificadas.
              </p>
            </div>
            <div className="clear-both" />
          </div>
          

          <div className="mt-8 p-6 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl">
            <div className="flex gap-3 items-start">
              <Info className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Impacto social e econômico:</strong> Acidentes e doenças relacionadas ao trabalho geram
                afastamentos, perda de produtividade, sofrimento familiar e custos bilionários ao sistema
                previdenciário e de saúde. A cada notificação realizada corretamente, amplia-se a base de dados que
                orienta políticas de prevenção, fiscalização e promoção da saúde — salvando vidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUANDO NOTIFICAR ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <span className="text-sky-700 font-semibold uppercase tracking-widest">Obrigatoriedade</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-7">Quando devo notificar?</h2>
          <p className="text-gray-700 mb-10 text-lg">
            Conforme a <strong>Portaria de Consolidação nº 4/2017</strong>, os seguintes eventos são de{" "}
            <strong className="text-orange-600">notificação compulsória imediata</strong>, independentemente de
            confirmação diagnóstica:
          </p>

          <div className="grid sm:grid-cols-2 gap-7">
            {casosObrigatorios.map((caso, i) => (
              <div
                key={i}
                className={`rounded-2xl border ${caso.border} ${caso.bg} p-5 flex gap-7 hover:scale-103 transition duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white border ${caso.border} flex items-center justify-center shrink-0`}>
                  <caso.icon className={`w-5 h-5 ${caso.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{caso.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{caso.detalhe}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-11 text-gray-700 text-lg">
            Na dúvida, <strong>notifique</strong>. A lei não exige confirmação diagnóstica para a notificação,
            a <strong className="text-sky-600">suspeita fundamentada</strong> já é suficiente e obriga o profissional a agir.
            A omissão pode configurar <strong>infração sanitária</strong>.
          </p>

          {/* ── CARD LDRT ── */}
          <div className="mt-11 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <div className="flex flex-col lg:flex-row">
              {/* Esquerda: informações sobre a LDRT */}
              <div className="bg-[#0d1b6e] p-8 flex-1 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <a href="https://www.institutowalterleser.org/noticias-aplicativo-hiago" target="_blank" rel="noopener" className="sm:shrink-0">
                    <img src="/pet-ldrt-logo.webp" alt="LDRT" className="w-full sm:w-18 sm:h-18 h-auto rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300" />
                  </a>
                  <div>
                    <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">Recurso de consulta</span>
                    <h3 className="text-white font-black text-xl leading-tight mt-0.5">
                      Lista de Doenças<br />Relacionadas ao Trabalho
                    </h3>
                  </div>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  A LDRT é uma ferramenta de consulta que relaciona doenças e agravos à exposição a agentes presentes
                  nos ambientes de trabalho. É fundamental para o profissional de saúde estabelecer o nexo causal e
                  identificar quais condições devem ser notificadas.
                </p>
                <Link
                  to="/ldrt"
                  className="self-start inline-flex items-center gap-2 bg-white text-[#0d1b6e] font-bold px-5 py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:duration-0 transition text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Consultar a LDRT
                </Link>
              </div>

              {/* Direita: aplicativo */}
              <div className="bg-blue-50 p-8 flex gap-5 lg:w-80">
                <button
                  type="button"
                  onClick={() => setAppModalOpen(true)}
                  className="shrink-0 cursor-zoom-in"
                >
                  <img
                    src="/pet-ldrt-app-expandido.webp"
                    alt="App LDRT"
                    className="w-24 rounded-2xl shadow-md object-cover object-top hover:opacity-90 active:opacity-75 hover:-translate-y-1 active:scale-95 active:duration-0 transition"
                  />
                </button>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[#0d1b6e] text-xs font-semibold uppercase tracking-widest">Aplicativo</span>
                    <h4 className="text-gray-900 font-bold text-base mt-0.5">LDRT App</h4>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      Consulte a lista de doenças ocupacionais pelo celular, de qualquer lugar.
                    </p>
                  </div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.ldrtcrst.app&hl=pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start inline-flex items-center gap-2 bg-[#0d1b6e] text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2a8a] active:bg-[#0a1250] active:duration-0 transition text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Play
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOAST: EMAIL COPIADO ── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl transition-all duration-300 ${
          emailCopied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        E-mail copiado para a área de transferência
      </div>

      {/* ── MODAL: APP LDRT ── */}
      {appModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setAppModalOpen(false)}
        >
          <div className="relative max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src="/pet-ldrt-app-expandido.webp"
              alt="App LDRT"
              className="max-h-[85vh] w-auto rounded-3xl shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setAppModalOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── PASSO A PASSO ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Guia prático</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">
            Como notificar um agravo
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Siga este passo a passo sempre que atender um trabalhador com suspeita ou confirmação de agravo
            relacionado ao trabalho.
          </p>

          <div className="space-y-6">
            {passos.map((passo, i) => {
              const isLast = i === passos.length - 1;
              return (
                <div key={i} className="relative">
                  <div className="flex gap-5">
                    {/* Linha conectora */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-sky-800 flex items-center justify-center shrink-0">
                        <passo.icon className="w-6 h-6 text-white" />
                      </div>
                      {!isLast && <div className="w-0.5 flex-1 bg-sky-200 my-2" />}
                    </div>

                    <Card className={`flex-1 p-5 border-2 border-gray-100 hover:border-sky-200 shadow-sm hover:shadow-md transition-all mb-${isLast ? "0" : "0"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-black text-sky-300 tracking-widest">{passo.numero}</span>
                        <h3 className="font-bold text-gray-900">{passo.titulo}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{passo.descricao}</p>
                      <div className="flex gap-2 p-3 bg-orange-100 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700 leading-relaxed">{passo.dica}</p>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROTEÇÃO LEGAL ── */}
      <section className="py-20 px-6 bg-cyan-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Gavel className="w-6 h-6 text-cyan-300" />
            <span className="text-cyan-300 font-semibold text-sm uppercase tracking-widest">Proteção Legal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Você está protegido ao notificar.
          </h2>
          <div className="space-y-4 text-cyan-100 text-lg leading-relaxed mb-10">
            <p>
              A notificação de agravos relacionados ao trabalho <strong className="text-white">não é opcional</strong>,{" "}
              é um dever legal do profissional de saúde, previsto em lei federal. E quem notifica de boa-fé{" "}
              <strong className="text-white">não pode ser responsabilizado</strong> civil ou administrativamente por
              isso.
            </p>
            <p>
              Pelo contrário: a <strong className="text-white">omissão da notificação</strong> pode configurar
              infração sanitária, infração ético-disciplinar perante o conselho profissional e até
              responsabilidade civil em casos de dano ao trabalhador.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {leis.map((lei, i) => (
              <div key={i} className="bg-cyan-300/25 rounded-2xl p-5 hover:scale-103 transition duration-300">
                <div className="text-cyan-300 font-bold text-sm mb-3">{lei.sigla}</div>
                <p className="text-cyan-100 text-sm leading-relaxed">{lei.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SINAN E CEREST: ACESSO RÁPIDO ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Acesso Rápido</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">SINAN e CEREST</h2>
          </div>

          <div className="flex flex-col gap-10">
            {/* ── SINAN ── */}
            <div className="rounded-3xl border-2 border-sky-200 overflow-hidden shadow-md">
              {/* Header */}
              <div className="bg-sky-50 px-6 py-4 flex items-center gap-4 border-b border-sky-200">
                <div className="w-10 h-10 rounded-xl bg-white border border-sky-300 flex items-center justify-center shrink-0">
                  <ClipboardList className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sky-600">SINAN</h3>
                  <p className="text-sm text-gray-500">Sistema de Informação de Agravos de Notificação</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col lg:flex-row">
                {/* Esquerda: informações */}
                <div className="lg:w-1/2 p-7 space-y-5 border-b lg:border-b-0 lg:border-r border-sky-100">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    O SINAN é o sistema nacional do Ministério da Saúde destinado a coletar, transmitir e disseminar
                    dados gerados rotineiramente pelo Sistema de Vigilância Epidemiológica. Permite o acompanhamento
                    permanente da ocorrência de doenças e agravos relacionados ao trabalho em todo o território nacional.
                  </p>
                  <div>
                    <h4 className="text-sky-700 font-semibold mb-6 flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4" />
                      Objetivos do SINAN
                    </h4>
                    <ul className="space-y-4">
                      {sinanObjetivos.map((obj, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="https://portalsinan.saude.gov.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:underline active:underline active:opacity-70 mt-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Acessar Portal SINAN
                  </a>
                </div>

                {/* Direita: logo + botões */}
                <div className="lg:w-1/2 p-7 flex flex-col items-center justify-center gap-6 bg-sky-50/50">
                  <img src="/pet-sinan-logo.png" alt="Logo SINAN" className="w-full object-contain rounded-2xl border border-sky-400 hover:scale-102 transition duration-300" />
                  <div className="flex flex-col gap-3 w-full">
                    <a
                      href="https://portalsinan.saude.gov.br/images/documentos/Agravos/NINDIV/Notificacao_Individual_v5.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 active:duration-0 text-white text-sm font-semibold rounded-xl transition"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      Ficha de Notificação
                    </a>
                    <a
                      href="https://portalsinan.saude.gov.br/images/documentos/Agravos/NINDIV/Ficha_conclusao_v5_instr.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white hover:bg-sky-50 active:bg-sky-100 active:duration-0 text-sky-700 text-sm font-semibold rounded-xl border-2 border-sky-300 transition"
                    >
                      <BookOpen className="w-4 h-4 shrink-0" />
                      Instruções de Preenchimento
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CEREST ── */}
            <div className="rounded-3xl border-2 border-orange-200 overflow-hidden shadow-md">
              {/* Header */}
              <div className="bg-orange-50 px-6 py-4 flex items-center gap-4 border-b border-orange-200">
                <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-orange-600">CEREST</h3>
                  <p className="text-sm text-gray-500">Centro de Referência em Saúde do Trabalhador</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col lg:flex-row">
                {/* Esquerda: logo */}
                <div className="lg:w-1/2 p-7 flex flex-col items-center gap-6 bg-orange-50/50 border-b lg:border-b-0 lg:border-r border-orange-100">
                  <img src="/pet-cerest-logo.png" alt="Logo CEREST" className="w-full object-contain rounded-2xl border border-orange-200 hover:scale-102 transition duration-300" />
                </div>

                {/* Direita: informações */}
                <div className="lg:w-1/2 p-7 space-y-5">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Os CERESTs são unidades especializadas do SUS que integram a RENAST. Funcionam como polos de
                    referência técnica para toda a rede de saúde, orientando o diagnóstico, tratamento e vigilância dos
                    agravos relacionados ao trabalho.
                  </p>
                  <div>
                    <h4 className="text-orange-700 font-semibold mb-3 flex items-center gap-2 text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      Principais atribuições do CEREST
                    </h4>
                    <ul className="space-y-3">
                      {cerestAtribuicoes.map((attr, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                          {attr}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-orange-100">
                    <h3 className="text-gray-700">CEREST - Unidade de Botucatu</h3>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="ml-1 text-sm font-normal text-orange-600 hover:underline active:underline active:opacity-70 break-all text-left cursor-pointer"
                        title="Clique para copiar"
                      >
                        cerest@botucatu.sp.gov.br
                      </button>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700 leading-relaxed">
                        (14) 3811-1415 | (14) 99721 5043
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Rua João Passos, 2085, Lavapés | CEP: 18601-060
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Seg. a Sex. - 07h30 às 17h
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://www.gov.br/saude/pt-br/composicao/svsa/cerest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline active:underline active:opacity-70 mt-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Encontrar o CEREST da sua região
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAT / SINAN / RAAT: EXPANDABLE ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Instrumentos de Notificação</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">
              CAT, SINAN e RAAT: entenda as diferenças
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Embora compartilhem o objetivo de registrar o evento, cada instrumento tem finalidade, público e fluxo
              distintos. Conhecê-los é fundamental para notificar corretamente.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {instrumentos.map((inst) => (
              <ExpandCard
                key={inst.sigla}
                title={inst.sigla}
                subtitle={`${inst.nome} - ${inst.finalidade}`}
                icon={inst.icon}
                colorClass={inst.colorClass}
                bgClass={inst.bgClass}
                titleClass={inst.titleClass}
              >
                <p className="text-gray-700 text-sm leading-relaxed">{inst.descricao}</p>

                <dl className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <dt className={`text-xs font-bold ${inst.titleClass} uppercase tracking-wider mb-1`}>Público-alvo</dt>
                    <dd className="text-sm text-gray-700">{inst.publico}</dd>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <dt className={`text-xs font-bold ${inst.titleClass} uppercase tracking-wider mb-1`}>Responsável</dt>
                    <dd className="text-sm text-gray-700">{inst.responsavel}</dd>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <dt className={`text-xs font-bold ${inst.titleClass} uppercase tracking-wider mb-1`}>Prazo</dt>
                    <dd className="text-sm text-gray-700">{inst.prazo}</dd>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <dt className={`text-xs font-bold ${inst.titleClass} uppercase tracking-wider mb-1`}>Legislação</dt>
                    <dd className="text-sm text-gray-700">{inst.legislacao}</dd>
                  </div>
                </dl>

                <ErroComum erro={inst.erroComum.erro} correcao={inst.erroComum.correcao} />
              </ExpandCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABELA COMPARATIVA ── */}
      <section className="py-20 px-6 bg-sky-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Resumo</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Quadro Comparativo</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sky-900 text-white">
                  <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl w-40">Critério</th>
                  <th className="text-center px-5 py-4 font-semibold">
                    <span className="text-orange-400">CAT</span>
                  </th>
                  <th className="text-center px-5 py-4 font-semibold">
                    <span className="text-sky-300">SINAN</span>
                  </th>
                  <th className="text-center px-5 py-4 font-semibold rounded-tr-2xl">
                    <span className="text-emerald-300">RAAT</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-sky-50"}>
                    <td className="px-5 py-4 font-semibold text-gray-700">{row.criterio}</td>
                    <td className="px-5 py-4 text-center text-gray-700">{row.cat}</td>
                    <td className="px-5 py-4 text-center text-gray-700">{row.sinan}</td>
                    <td className="px-5 py-4 text-center text-gray-700">{row.raat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-sky-950 text-center">
        <div className="max-w-3xl mx-auto">
          <HeartPulse className="w-12 h-12 text-orange-400 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Seu registro pode
            <br />
            <span className="text-orange-400">salvar vidas.</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Cada notificação contribui para tornar visíveis os riscos no ambiente de trabalho. Sem dados, não há
            diagnóstico. Sem diagnóstico, não há prevenção. Portanto, a mudança começa com a <span className="text-sky-400">sua notificação</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://portalsinan.saude.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 active:duration-0 shadow-lg"
            >
              <ClipboardList className="w-5 h-5" />
              Acessar o SINAN
            </a>
            <a
              href="https://www.gov.br/saude/pt-br/composicao/svsa/cerest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 active:duration-0"
            >
              <MapPin className="w-5 h-5" />
              Encontrar o CEREST
            </a>
          </div>
        </div>
      </section>

      {/* ── FONTES ──
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            Fontes e Referências
          </h2>
          <ul className="space-y-3">
            {fontes.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-sky-400 font-bold mt-0.5 shrink-0">[{i + 1}]</span>
                <span>
                  {f.texto}.{" "}
                  <a
                    href={f.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline inline-flex items-center gap-1"
                  >
                    Acessar <ExternalLink className="w-3 h-3" />
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section> */}
    </main>
  );
}
