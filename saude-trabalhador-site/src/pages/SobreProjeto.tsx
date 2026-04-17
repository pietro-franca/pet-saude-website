import {
  BookOpen,
  Stethoscope,
  Target,
  Users,
  Globe,
  Lightbulb,
  ClipboardCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

const ministerios = [
  {
    imagem: "/MS-img.png",
    nome: "Ministério da Saúde",
    sigla: "MS",
    cor: "text-sky-600",
    bg: "bg-sky-300",
    borda: "hover:border-sky-500",
    descricao:
      "O MS é o principal financiador e orientador do PET-Saúde. Por meio da Secretaria de Gestão do Trabalho e da Educação na Saúde (SGTES), o ministério coordena o programa e garante que as ações dos estudantes estejam alinhadas às prioridades do SUS, fortalecendo a integração entre ensino e serviço público de saúde.",
  },
  {
    imagem: "/MEC-img.png",
    nome: "Ministério da Educação",
    sigla: "MEC",
    cor: "text-orange-600",
    bg: "bg-orange-500",
    borda: "hover:border-orange-500",
    descricao:
      "O MEC participa do PET-Saúde viabilizando a inserção dos estudantes de graduação na saúde dentro do SUS como parte de sua formação acadêmica. A parceria assegura que o programa tenha reconhecimento acadêmico e que as universidades possam integrar a experiência prática no serviço público como componente curricular.",
  },
  {
    imagem: "/MTE-img.png",
    nome: "Ministério do Trabalho",
    sigla: "MTb",
    cor: "text-emerald-600",
    bg: "bg-emerald-300",
    borda: "hover:border-emerald-500",
    descricao:
      "As diretrizes do Ministério do Trabalho orientam as ações voltadas à Saúde do Trabalhador dentro do SUS. A Rede Nacional de Atenção Integral à Saúde do Trabalhador (RENAST), articulada com as políticas trabalhistas, fornece o arcabouço que norteia a atuação dos estudantes do PET-Saúde I&SD no campo da vigilância e notificação de agravos relacionados ao trabalho.",
  },
];

const objetivos = [
  {
    icon: Globe,
    titulo: "Digitalizar a informação em saúde",
    descricao:
      "Desenvolver ferramentas e materiais digitais que facilitem o acesso dos trabalhadores e profissionais de saúde às informações sobre agravos e notificações.",
  },
  {
    icon: Users,
    titulo: "Fortalecer a integração ensino-serviço-comunidade",
    descricao:
      "Inserir estudantes de saúde no SUS real, aproximando a formação acadêmica das necessidades concretas da população trabalhadora.",
  },
  {
    icon: ClipboardCheck,
    titulo: "Ampliar a notificação de agravos",
    descricao:
      "Aumentar a visibilidade das doenças e acidentes relacionados ao trabalho por meio da capacitação de profissionais e da sensibilização da população.",
  },
  {
    icon: Lightbulb,
    titulo: "Produzir conhecimento aplicado",
    descricao:
      "Gerar produtos educacionais e tecnológicos que possam ser incorporados pelas equipes de saúde e contribuir para políticas públicas baseadas em evidências.",
  },
  {
    icon: Building2,
    titulo: "Apoiar a RENAST e os CEREST",
    descricao:
      "Qualificar o trabalho desenvolvido nos Centros de Referência em Saúde do Trabalhador, ampliando sua capacidade de vigilância e assistência pública.",
  },
  {
    icon: Target,
    titulo: "Promover a interprofissionalidade",
    descricao:
      "Estimular a atuação colaborativa entre estudantes de diferentes cursos da saúde, preparando-os para o trabalho em equipe multiprofissional no SUS.",
  },
];

export default function SobreProjeto() {
  return (
    <main className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-36 bg-sky-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            PET-Saúde<br />
            <span className="text-sky-400">I&amp;SD</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            <span className="text-orange-400">Informação &amp; Saúde Digital:</span> um projeto que une estudantes e
            profissionais para transformar o SUS
            por meio do conhecimento e da tecnologia.
          </p>
        </div>
      </section>

      {/* ── O QUE É O PET-SAÚDE ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-sky-800 mb-4">O que é o PET-Saúde?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O Programa de Educação pelo Trabalho para a Saúde (PET-Saúde) é uma iniciativa
              do governo federal que promove a integração entre ensino, serviço e comunidade
              no âmbito do Sistema Único de Saúde (SUS).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              {
                icon: BookOpen,
                titulo: "Ensino",
                descricao:
                  "Estudantes de cursos da área da saúde vivenciam na prática os desafios do SUS, complementando sua formação acadêmica com experiências reais de serviço público.",
              },
              {
                icon: Stethoscope,
                titulo: "Serviço",
                descricao:
                  "As ações são desenvolvidas diretamente nas unidades de saúde do SUS, sob supervisão de profissionais tutores, gerando impacto real nos serviços prestados à população.",
              },
              {
                icon: Users,
                titulo: "Comunidade",
                descricao:
                  "O programa é orientado para as necessidades concretas da população, especialmente dos trabalhadores, promovendo saúde e cidadania.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow hover:-translate-y-2 border border-transparent hover:border-orange-500 transition duration-300"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 bg-white rounded-2xl shadow p-8 border border-gray-100">
            <p className="text-gray-700 text-lg leading-relaxed p-6">
              Criado em 2004 pelo Ministério da Saúde em parceria com o Ministério da Educação,
              o PET-Saúde já formou milhares de profissionais que atuam hoje em todo o país.
              Cada edição do programa elege um tema estratégico para o SUS: a edição atual,
              o <span className="text-sky-700 font-bold">PET-Saúde I&amp;SD</span>, tem como foco
              a <span className="text-orange-600 font-semibold">Informação e Saúde Digital</span>.
              Ela busca integrar estudantes e profissionais da área da saúde e do meio tecnológico, 
              como engenharia e computação, a fim de produzir <span className="text-orange-600 font-semibold">soluções inovadoras</span> que contribuam 
              para a <span className="text-sky-700 font-semibold">melhoria dos serviços de saúde</span>, ampliem seu acesso à população e fortaleçam 
              a gestão e o uso qualificado das informações no sistema público de saúde.
            </p>
            <img className="p-6" src="/pet-saude-logo-inteira.png" alt="" />
            
          </div>
        </div>
      </section>

      {/* ── GRUPOS TUTORIAIS ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-orange-500 mb-4">
              Grupos Tutoriais do PET-Saúde I&amp;SD
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O PET-Saúde I&amp;SD é organizado em diferentes grupos tutorais, cada um
              com um projeto específico voltado à inovação, tecnologia e melhoria
              dos serviços do SUS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Ferramenta digital para redução da mortalidade infantil em Botucatu",
              "Transformando o acesso à saúde: HCemCasa como ferramenta de integração e continuidade do cuidado",
              "EcoSUS digital: saúde, clima e transformação digital do SUS",
              "Programa de triagem de retinopatia diabética por teleoftalmologia e inteligência artificial no município de Botucatu",
              "Pré-natal: soluções digitais para educação em saúde de gestantes",
              "Boletim epidemiológico da violência contra a mulher: mapeamento digital, prevenção e intervenção oportuna",
              "Produção e difusão de informações digitais em saúde do(a) trabalhador(a) na atenção primária à saúde",
              "Ação Hygeia Digital: inovação na busca ativa para prevenção do câncer de colo do útero e mama",
            ].map((projeto, i) => (
              <div
                key={i}
                className={`p-6 bg-gray-50 rounded-2xl border border-transparent ${(i+ 1) % 2 == 0 ? "hover:border-orange-500" : (i + 1) == 7 ? "hover:border-emerald-500" : "hover:border-sky-500"} hover:bg-white hover:shadow hover:-translate-y-2 transition duration-300`}
              >
                <div className="flex items-start gap-3">
                  <div className={`py-1 px-3 ${(i+ 1) % 2 == 0 ? "bg-orange-100 text-orange-600" : (i + 1) == 7 ? "bg-emerald-100 text-emerald-500" : "bg-sky-100 text-sky-700"} font-bold rounded-lg flex items-center justify-center`}>
                    {i + 1}
                  </div>
                  <p className={`${(i + 1) == 7 ? "font-semibold" : ""} text-gray-700 text-sm leading-relaxed`}>
                    {projeto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O PET-SAÚDE I&SD E O SUS ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-sky-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">
              O PET-Saúde I&amp;SD - Saúde do <br></br> Trabalhador e o SUS
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Dentre os projetos presentes no PET-Saúde I&SD, este projeto está inserido no grupo 
              de <strong>Saúde do Trabalhador</strong>, um campo estratégico do SUS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                titulo: "Integração com a RENAST",
                texto:
                  "A Rede Nacional de Atenção Integral à Saúde do Trabalhador (RENAST) é a principal estrutura do SUS para cuidar de quem trabalha. O projeto fortalece essa rede ao formar profissionais capacitados para identificar, notificar e acompanhar agravos relacionados ao trabalho.",
              },
              {
                titulo: "Atuação nos CEREST",
                texto:
                  "Os Centros de Referência em Saúde do Trabalhador (CEREST) são os equipamentos especializados da RENAST. Estudantes e tutores desenvolvem atividades nesses centros, qualificando o atendimento e aprimorando os processos de vigilância epidemiológica.",
              },
              {
                titulo: "Saúde Digital como estratégia",
                texto:
                  "A digitalização da informação em saúde é uma prioridade do Ministério da Saúde. Ao desenvolver materiais e ferramentas digitais voltadas à Saúde do Trabalhador, o projeto contribui diretamente para essa agenda, tornando o SUS mais eficiente e acessível.",
              },
              {
                titulo: "Formação interprofissional",
                texto:
                  "O SUS funciona com equipes multiprofissionais. O PET-Saúde I&SD - Saúde do Trabalhador reúne estudantes de medicina, enfermagem, engenharia, computação e outras áreas, preparando-os para trabalhar de forma colaborativa em prol da melhoria do Sistema Único de Saúde.",
              },
            ].map((card, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <ArrowRight className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-white">{card.titulo}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm pl-8">{card.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOTIVAÇÃO ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-sky-800 mb-4">Por que este projeto existe?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O Brasil registra mais de 700 mil acidentes de trabalho por ano, e esse número
              reflete apenas os casos notificados. A <span className="font-semibold text-orange-500">subnotificação</span> é um problema estrutural
              que invisibiliza o sofrimento de milhões de trabalhadores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { numero: "700 mil+", legenda: "acidentes de trabalho notificados por ano no Brasil" },
              { numero: "~50%", legenda: "dos casos estimados ainda não chegam ao sistema de saúde" },
              { numero: "1 em cada 3", legenda: "trabalhadores já teve algum problema de saúde relacionado ao trabalho" },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white rounded-2xl shadow p-6 border border-gray-100">
                <div className="text-4xl font-black text-orange-500 mb-2">{stat.numero}</div>
                <div className="text-gray-600 text-sm leading-snug">{stat.legenda}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Diante desse cenário, o PET-Saúde I&amp;SD surge como resposta à necessidade de
              <strong className="text-sky-700"> qualificar profissionais de saúde</strong> para
              reconhecer, notificar e acompanhar os agravos que acometem trabalhadores,
              especialmente aqueles em situações de maior vulnerabilidade.
            </p>
            <p>
              A aposta na <strong className="text-orange-600">saúde digital</strong> é
              estratégica: ferramentas bem desenvolvidas ampliam o alcance da informação,
              reduzem barreiras de acesso e tornam o sistema de vigilância mais sensível
              e responsivo.
            </p>
            <p>
              Mais do que um programa acadêmico, o PET-Saúde I&amp;SD - Saúde do Trabalhador é uma forma de
              devolver ao trabalhador o que lhe pertence:
              <strong className="text-sky-700"> visibilidade, cuidado e direitos</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── OBJETIVOS ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-sky-800 mb-4">Objetivos do Projeto</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O projeto atua em múltiplas frentes para fortalecer a Saúde do
              Trabalhador no SUS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objetivos.map((obj, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 bg-gray-50 rounded-2xl hover:-translate-y-2 border border-transparent hover:border-sky-500 hover:bg-white hover:shadow transition duration-300"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <obj.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{obj.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{obj.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MINISTÉRIOS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-sky-800 mb-4">Apoio Institucional</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O PET-Saúde I&SD é fruto de uma parceria interministerial que garante sustentação
              política, acadêmica e institucional ao programa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ministerios.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col gap-4 p-6 bg-white rounded-2xl shadow hover:-translate-y-2 border border-transparent ${m.borda} transition duration-300`}
              >
                <div className={`${m.bg} rounded-xl flex items-center justify-center`}>
                  <img className={m.imagem == "/MS-img.png" ? "p-10" : ""} src={m.imagem} alt="" />
                </div>
                <div>
                  <span className={`text-xs font-bold tracking-widest uppercase ${m.cor}`}>{m.sigla}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-0.5">{m.nome}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{m.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RODAPÉ DA PÁGINA ─────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-sky-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Saúde do trabalhador é pauta de todos
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Nós acreditamos que um SUS forte começa com profissionais bem
            formados, informação de qualidade e trabalhadores que conhecem seus direitos.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.gov.br/saude/pt-br/composicao/sgtes/pet-saude/pet-saude-digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-800 font-semibold rounded-xl hover:bg-orange-50 hover:-translate-y-1 hover:shadow-lg transition duration-300"
            >
              Conheça o programa oficial
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
