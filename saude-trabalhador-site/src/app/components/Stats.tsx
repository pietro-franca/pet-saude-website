export function Stats() {
  const stats = [
    { number: "724 mil", label: "Acidentes de trabalho em 2024" },
    { number: "2.500+", label: "Mortes por ano" },
    { number: "30%", label: "Dos trabalhadores têm Burnout" },
    { number: "R$ 157bi", label: "Gastos desde 2012" }
  ];

  return (
    <section className="py-16 px-6 bg-sky-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white mb-2">A Realidade dos Acidentes de Trabalho no Brasil</h2>
          <p className="text-gray-300">Dados alarmantes que precisam da sua atenção</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl mb-2 text-orange-500/90">{stat.number}</div>
              <div className="text-gray-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}