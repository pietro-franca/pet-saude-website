import { TrendingUp, AlertTriangle, Users, Building } from "lucide-react";

export function DataSection() {
  const sectors = [
    { name: "Construção Civil", percentage: 18, cases: "110 mil" },
    { name: "Indústria", percentage: 22, cases: "135 mil" },
    { name: "Serviços", percentage: 30, cases: "184 mil" },
    { name: "Agricultura", percentage: 15, cases: "92 mil" },
    { name: "Transporte", percentage: 10, cases: "61 mil" },
    { name: "Outros", percentage: 5, cases: "30 mil" }
  ];

  const commonAccidents = [
    "Queda de altura ou mesmo nível",
    "Cortes e perfurações",
    "Esmagamento ou prensagem",
    "Exposição a produtos químicos",
    "Choques elétricos",
    "Acidentes de trânsito"
  ];

  return (
    <section id="dados" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-sky-800">Dados sobre Acidentes de Trabalho</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compreender os números é essencial para promover mudanças efetivas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl mb-2 text-gray-900">+8%</div>
            <div className="text-gray-600">Aumento em relação a 2022</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl mb-2 text-gray-900">7/dia</div>
            <div className="text-gray-600">Mortes em média por dia</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl mb-2 text-gray-900">15-34</div>
            <div className="text-gray-600">Faixa etária mais atingida</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Building className="w-6 h-6 text-sky-700" />
              <h3 className="text-xl text-gray-900">Acidentes por Setor</h3>
            </div>
            <div className="space-y-4">
              {sectors.map((sector, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{sector.name}</span>
                    <span className="text-gray-900">{sector.cases}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full" 
                      style={{ width: `${sector.percentage * 3}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-sky-700" />
              <h3 className="text-xl text-gray-900">Tipos Mais Comuns</h3>
            </div>
            <ul className="space-y-3">
              {commonAccidents.map((accident, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="text-sky-700 mt-1">•</span>
                  <span className="text-gray-700">{accident}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Atenção:</strong> Muitos acidentes podem ser evitados com treinamento adequado, 
                uso correto de EPIs e fiscalização das condições de trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
