import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden md:h-screen">
      <div>
        <img
          src="/pet-hero-1-largura-mobile.png"
          alt="Saúde do Trabalhador"
          className="brightness-50 md:hidden w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:object-left"
        />
        <img
          src="/pet-hero-1-largura.png"
          alt="Saúde do Trabalhador"
          className="brightness-50 hidden md:block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between mt-12 md:mt-0 pt-8 md:pt-0">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center flex-1">
          <div className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-wide leading-none hover:scale-103 origin-left transition cursor-default">
              NOTIFICAR<br /><span className="text-sky-400">É CUIDAR</span>
            </h1>
            <div className="flex flex-wrap text-white/85 sm:text-lg lg:text-2xl mt-4 leading-snug">
              <p>Cuidando de quem constrói a </p><span className="inline-block mx-2 font-bold text-orange-400 hover:-translate-y-0.75 transition cursor-default">vida</span>
            </div>
            <div className="flex flex-wrap text-white/85 sm:text-lg lg:text-2xl leading-snug font-semibold">
              <p>A</p> <span className="inline-block mx-2 font-bold text-sky-300 hover:-translate-y-0.75 transition cursor-default">prevenção</span> <p>começa com a sua voz</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto px-6 pb-12 md:pb-18 pt-4 md:pt-0 flex flex-wrap gap-5 md:gap-7">
          <a href="#notificar">
            <Button className="hidden sm:flex text-xl md:text-2xl px-6 md:px-8 py-7 md:py-9 bg-white text-orange-600 hover:bg-white/90 hover:scale-103 hover:-translate-y-1 md:rounded-3xl rounded-2xl drop-shadow-lg/80 cursor-pointer transition">
              Como notificar
            </Button>
          </a>
          <a href="#sobre">
            <Button className="hidden sm:flex text-xl md:text-2xl px-6 md:px-8 py-7 md:py-9 text-white bg-sky-400/80 hover:bg-sky-400/80 hover:scale-103 hover:-translate-y-1 md:rounded-3xl rounded-xl drop-shadow-lg/80 cursor-pointer transition">
              Saiba Mais
            </Button>
          </a>
          
        </div>
      </div>
      
    </section>
  );
}
