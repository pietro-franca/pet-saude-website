import { FileText, Hospital, Shield, Megaphone, TriangleAlert } from "lucide-react";
import { Card } from "./ui/card";

const steps = [
  {
    icon: Megaphone,
    number: "1",
    title: "Comunique imediatamente o ocorrido",
    description: "Em caso de acidente, informe imediatamente o ocorrido ao seu supervisor, responsável pelo setor ou à área de segurança do trabalho da empresa. Explique de forma clara o que aconteceu, onde ocorreu e se houve alguma lesão."
  },
  {
    icon: Hospital,
    number: "2",
    title: "Busque Atendimento Médico",
    description: "Caso haja lesão ou mal-estar, procure atendimento médico o mais rápido possível. Solicite ao profissional um relatório detalhado com o diagnóstico, a descrição do ocorrido, o CID-10 e a relação com o trabalho (nexo causal)."
  },
  {
    icon: FileText,
    number: "3",
    title: "Comunique à Empresa",
    description: "Informe seu empregador sobre o agravo e em seguida entregue a ele os atestados e documentos médicos. Ele tem a obrigação legal de emitir a CAT (Comunicação de Acidente de Trabalho), mesmo sem afastamento do trabalho."
  },
  {
    icon: Shield,
    number: "4",
    title: "Acompanhe seus Direitos",
    description: "Após o registro da CAT, acompanhe o processo e guarde os documentos relacionados ao agravo. Isso é importante para garantir seus direitos trabalhistas e previdenciários."
  }
];

export function NotificationGuide() {
  return (
    <section id="notificar" className="pt-24 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-orange-600">Como Notificar um Acidente de Trabalho</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A notificação é fundamental para garantir seus direitos e contribuir para a melhoria
            das condições de trabalho no Brasil
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={index}
                className={`relative pt-4 flex ${isLeft ? "justify-start" : "justify-end"}`}
              >
                <Card className={`w-full lg:w-[70%] p-6 relative border-2 border-gray-200 hover:border-orange-500 transition-all shadow-lg ${isLeft ? "bg-white" : "bg-gray-50"}`}>
                  <div className="absolute -top-4 right-6 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>

                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 mt-2">
                    <step.icon className="w-6 h-6 text-sky-600" />
                  </div>

                  <h3 className="text-lg mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </Card>

                {/* Conector em L — visível apenas em telas grandes */}
                {!isLast && (
                  <div
                    className={`hidden lg:block absolute border-sky-400 ${
                      isLeft
                        ? "left-[70%] right-[85px] border-t-[3px] border-r-[3px] rounded-tr-[36px]"
                        : "right-[70%] left-[85px] border-t-[3px] border-l-[3px] rounded-tl-[36px]"
                    }`}
                    style={{
                      // centro visual do card (compensa pt-4 = 1rem)
                      top: "calc(50% + 1.7rem)",
                      // do centro até o topo do próximo card (gap-12 = 3rem)
                      height: "calc(50% + 2.5rem)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
          <h3 className="flex gap-3 items-center text-lg mb-2 text-gray-900"><TriangleAlert className="text-amber-500" /> Importante</h3>
          <p className="text-gray-700">
            A empresa tem até <span className="font-semibold">24 horas</span> para emitir a CAT em caso de acidente.
            Se ela não o fizer, o próprio trabalhador, o sindicato ou um médico podem fazer a notificação
            no site do <a href="https://www.gov.br/pt-br/servicos/registrar-comunicacao-de-acidente-de-trabalho-cat" target="_blank" rel="noopener" className="font-semibold text-orange-600">gov.br</a> ou 
            via <a href="https://login.esocial.gov.br/login.aspx" target="_blank" rel="noopener" className="font-semibold text-sky-400">eSocial</a>. A falta de notificação pode prejudicar seus direitos e dificultar ações preventivas.
          </p>
        </div>
      </div>
    </section>
  );
}
