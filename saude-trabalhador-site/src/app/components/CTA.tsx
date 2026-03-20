export function CTA() {
  return (
    <section className="py-20 px-6 bg-sky-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl mb-6 text-white">
          Faça Parte da Mudança
        </h2>
        <p className="text-xl text-gray-100 mb-10">
          A notificação de acidentes e doenças do trabalho é um ato de cidadania. 
          Ao notificar, você protege a si mesmo e contribui para um Brasil com ambientes 
          de trabalho mais seguros e saudáveis.
        </p>
        <div className="flex flex-col sm:flex-row gap-7 mt-3 justify-center items-center">
          <a aria-label="pet-saude" href="https://www.gov.br/saude/pt-br/composicao/sgtes/pet-saude/pet-saude-digital" target="_blank" rel="noopener" className="w-[270px] items-center flex justify-center place-content-center p-5 bg-white rounded-2xl shadow-xl hover:-translate-y-2 border border-3 border-transparent hover:border-orange-500 transition duration-300">
            <img src="/pet-saude-logo-inteira.png" alt="" />
          </a>
          <a aria-label="gov.br" href="https://www.gov.br/saude/pt-br" target="_blank" rel="noopener" className="w-[270px] items-center flex justify-center place-content-center p-5 bg-white rounded-2xl shadow-xl hover:-translate-y-2 border border-3 border-transparent hover:border-orange-500 transition duration-300">
            <img src="/govbr-logo.webp" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}