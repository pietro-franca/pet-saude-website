import { Shield, Clock, Heart, FileCheck, Home, TrendingUp, Phone, Handshake } from "lucide-react";
import { Card } from "./ui/card";

const rights = [
  {
    id: 1,
    icon: Shield,
    title: "Estabilidade no Emprego",
    description: "Após o acidente, você tem direito a 12 meses de estabilidade, não podendo ser demitido sem justa causa."
  },
  {
    id: 2,
    icon: Clock,
    title: "Auxílio-Doença Acidentário",
    description: "Se ficar afastado por mais de 15 dias, tem direito ao benefício do INSS (B91) com alíquota diferenciada."
  },
  {
    id: 3,
    icon: Heart,
    title: "Tratamento Médico Gratuito",
    description: "Direito a tratamento completo pelo SUS e reabilitação profissional quando necessário."
  },
  {
    id: 4,
    icon: FileCheck,
    title: "FGTS durante Afastamento",
    description: "Mesmo afastado, a empresa deve continuar depositando o FGTS durante o período de auxílio-doença."
  },
  {
    id: 5,
    icon: Home,
    title: "Aposentadoria por Invalidez",
    description: "Em casos de incapacidade permanente, direito à aposentadoria por invalidez acidentária."
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Pensão por Morte",
    description: "Em caso fatal, os dependentes têm direito à pensão por morte acidentária."
  }
];

export function WorkerRights() {
  return (
    <section id="direitos" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-sky-800">Seus Direitos como Trabalhador</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conhecer seus direitos é fundamental para garantir proteção e dignidade no trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-18">
          {rights.map((right, index) => (
            <Card key={index} className="p-6 border-2 border-gray-200 hover:border-sky-500 shadow-lg transition-all">
              <div className={`w-12 h-12 ${right.id < 4 ? "bg-sky-100" : "bg-orange-100"} rounded-lg flex items-center justify-center mb-4`}>
                <right.icon className={`w-6 h-6 ${right.id < 4 ? "text-sky-700" : "text-orange-600"}`} />
              </div>
              <h3 className="text-lg mb-3 text-gray-900">{right.title}</h3>
              <p className="text-gray-600 text-sm">{right.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <h3 className="flex gap-3 items-center text-lg mb-3 text-gray-900"><Phone className="text-blue-600"/> Denúncias e Orientações</h3>
            <p className="text-gray-700 mb-4">
              Se você teve seus direitos violados, procure ajuda:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Disque 158:</strong> Denúncias ao Ministério do Trabalho</li>
              <li>• <strong>CEREST:</strong> Centro de Referência em Saúde do Trabalhador</li>
              <li>• <strong>Sindicato da Categoria:</strong> Orientação e apoio jurídico</li>
              <li>• <strong>Ministério Público do Trabalho:</strong> Denúncias graves</li>
            </ul>
          </div>

          <div className="p-6 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
            <h3 className="flex gap-3 items-center text-lg mb-3 text-gray-900"><Handshake className="text-teal-600" /> Rede de Apoio</h3>
            <p className="text-gray-700 mb-4">
              Você não está sozinho. Há uma rede de apoio disponível:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>CEREST Regional:</strong> Atendimento e vigilância em saúde</li>
              <li>• <strong>CAPs (Caixa de Aposentadorias):</strong> Benefícios previdenciários</li>
              <li>• <strong>Defensoria Pública:</strong> Assistência jurídica gratuita</li>
              <li>• <strong>INSS:</strong> Perícias e concessão de benefícios</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
