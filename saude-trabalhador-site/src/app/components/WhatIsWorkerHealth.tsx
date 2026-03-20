import { AlertCircle, HeartPulse, Brain, Wrench, Lightbulb } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";

export function WhatIsWorkHealth() {
  const topics = [
    {
      icon: AlertCircle,
      title: "Acidentes de Trabalho",
      description: "Qualquer lesão corporal ou perturbação funcional que ocorra no exercício do trabalho ou em decorrência dele."
    },
    {
      icon: HeartPulse,
      title: "Doenças Ocupacionais",
      description: "Doenças causadas ou agravadas pelas condições de trabalho, como LER/DORT, problemas respiratórios, perda auditiva."
    },
    {
      icon: Brain,
      title: "Saúde Mental",
      description: "Transtornos psicológicos relacionados ao trabalho, como estresse, ansiedade, burnout e depressão."
    },
    {
      icon: Wrench,
      title: "Prevenção",
      description: "Uso de EPIs, treinamentos, adequação ergonômica e fiscalização das condições de trabalho."
    }
  ];

  return (
    <section id="sobre" className="pt-24 pb-15 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-sky-800">O que é Saúde do Trabalhador?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A saúde do trabalhador envolve a prevenção, promoção e recuperação da saúde 
            de quem trabalha, garantindo ambientes seguros e saudáveis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {topics.map((topic, index) => (
            <div key={index} className="flex gap-4 p-6 bg-white rounded-lg shadow hover:-translate-y-2 border border-transparent hover:border-sky-500 transition duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <topic.icon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-gray-900">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex gap-3 mb-3 items-center">
            <Lightbulb className="hidden sm:block w-8 h-8 text-sky-600" />
            <h3 className="text-xl font-semibold text-sky-800">
              Qual é a diferença entre <span className="text-sky-600">Saúde do Trabalho</span>, <span className="text-sky-600">Saúde Ocupacional</span> e <span className="text-orange-500">Saúde do Trabalhador</span>?
            </h3>
          </div>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow border border-gray-100 px-6 mt-5">
            <AccordionItem value="saude-trabalho">
              <AccordionTrigger className="text-base font-semibold text-gray-800 hover:no-underline hover:text-sky-700 cursor-pointer">
                Saúde do Trabalho
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                A saúde do trabalho é uma <span className="text-orange-600">especialidade médica</span> que se concentra principalmente na relação entre o trabalho e a doença. Surgiu a partir da medicina do trabalho e busca identificar e controlar riscos presentes no <span className="font-semibold">ambiente laboral</span>, como agentes físicos, químicos e biológicos, para evitar acidentes e problemas de saúde. Nesse modelo, o foco está na prevenção de danos, e o trabalhador costuma ser visto mais como alguém que recebe as intervenções do que como um participante ativo no cuidado com a própria saúde.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="saude-ocupacional">
              <AccordionTrigger className="text-base font-semibold text-gray-800 hover:no-underline hover:text-sky-700 cursor-pointer">
                Saúde Ocupacional
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                A saúde ocupacional é um <span className="text-orange-600">conceito</span> com enfoque mais técnico e científico na relação entre trabalho e saúde. Seu objetivo é adaptar o trabalho ao ser humano, algo muito presente na <span className="font-semibold">ergonomia</span>, e prevenir doenças relacionadas ao trabalho por meio de vigilância epidemiológica e controle das exposições a riscos. Mesmo assim, é uma abordagem mais limitada que a saúde do trabalhador, pois muitas vezes trata a saúde como uma questão individual de <span className="font-semibold">adaptação ao trabalho</span>, sem discutir de forma mais ampla como o próprio trabalho é organizado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="saude-trabalhador">
              <AccordionTrigger className="text-base font-semibold text-gray-800 hover:no-underline hover:text-sky-700 cursor-pointer">
                Saúde do Trabalhador
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                A saúde do trabalhador é um campo mais recente e mais amplo. Nessa perspectiva, o trabalhador é visto como um <span className="font-semibold">sujeito ativo</span>, que participa das ações voltadas à própria saúde. Além de considerar os riscos do ambiente de trabalho, também leva em conta <span className="font-semibold">fatores sociais</span>, organizacionais e políticos que influenciam o processo de adoecimento. O foco não está apenas em evitar acidentes, mas também em promover qualidade de vida, cuidar da saúde mental e garantir condições dignas de trabalho. Essa é a <span className="text-orange-600">abordagem adotada pelo SUS</span>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
      </div>
    </section>
  );
}
