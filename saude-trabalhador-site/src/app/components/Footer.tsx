import { Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="/pet-logo-branca.png" alt="" />
              </div>
              <span className="text-lg font-semibold ml-1 text-white">Saúde do Trabalhador</span>
            </div>
            <p className="text-sm">
              Uma iniciativa do Ministério da Saúde para promover ambientes de trabalho seguros e saudáveis.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Informações</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#sobre" className="hover:text-sky-300">O que é Saúde do Trabalhador?</a></li>
              <li><a href="#notificar" className="hover:text-sky-300">Como Notificar</a></li>
              <li><a href="#direitos" className="hover:text-sky-300">Direitos do Trabalhador</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <a href="https://www.gov.br/saude/pt-br" target="_blank" rel="noopener" className="hover:text-sky-300">Portal do Ministério da Saúde</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <a href="https://portalsinan.saude.gov.br/" target="_blank" rel="noopener" className="hover:text-sky-300">SINAN - Sistema de Notificação</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <a href="https://www.gov.br/saude/pt-br/composicao/svsa/cerest" target="_blank" rel="noopener" className="hover:text-sky-300">CEREST - Centros de Referência</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <a href="https://www.gov.br/trabalho-e-emprego/pt-br" target="_blank" rel="noopener" className="hover:text-sky-300">Ministério do Trabalho</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Denúncias</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <strong>Disque 158</strong> - Ministério do Trabalho
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <strong>Disque 136</strong> - Ministério da Saúde
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2026 PET-Saúde I&SD - Saúde do Trabalhador. Todos os direitos reservados.</p>
          <p className="mt-2 text-gray-500">
            Este é um projeto educativo para conscientização sobre saúde e segurança do trabalho.
          </p>
        </div>
      </div>
    </footer>
  );
}