/**
 * Módulo para gerenciar a instalação do PWA
 * Suporta Android (via beforeinstallprompt) e iOS (via instruções manuais)
 */
const InstallPrompt = (() => {
  let deferredPrompt;

  // Detecta se está sendo executado via desktop (projeto.html)
  const isDesktop = () => {
    return new URLSearchParams(window.location.search).get('desktop') === 'true';
  };

  // Detecta se é um dispositivo Apple
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  // Verifica se o app já está instalado / rodando em modo Standalone
  const isInStandaloneMode = () => {
    return ('standalone' in window.navigator && window.navigator.standalone) || 
           window.matchMedia('(display-mode: standalone)').matches;
  };

  const init = () => {
    // Não mostra na versão embutida do Desktop nem se já estiver instalado
    if (isDesktop() || isInStandaloneMode()) {
      return;
    }

    const androidBanner = document.getElementById('install-banner');
    const btnInstall = document.getElementById('btn-install');
    const btnCloseInstall = document.getElementById('btn-close-install');
    const iosBanner = document.getElementById('ios-install-banner');
    const btnCloseIos = document.getElementById('close-ios-banner');

    // ==========================================
    // 1) ANDROID / CHROME COMPATÍVEIS
    // ==========================================
    window.addEventListener('beforeinstallprompt', (e) => {
      // Previne abertura automática do prompt nativo mini-infobar (comportamento antigo do Chrome)
      e.preventDefault();
      deferredPrompt = e;
      
      // Exibe nosso banner personalizado
      if (!localStorage.getItem('hideInstallBanner')) {
        setTimeout(() => androidBanner.classList.add('show'), 2000);
      }
    });

    if (btnInstall) {
      btnInstall.addEventListener('click', async () => {
        // Oculta o banner customizado
        androidBanner.classList.remove('show');
        
        if (deferredPrompt) {
          // Dispara o prompt nativo
          deferredPrompt.prompt();
          
          // Aguarda a resposta do usuário
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User choice: ${outcome}`);
          
          // O disparo só pode acontecer uma vez
          deferredPrompt = null;
        }
      });
    }

    if (btnCloseInstall) {
      btnCloseInstall.addEventListener('click', () => {
        androidBanner.classList.remove('show');
        localStorage.setItem('hideInstallBanner', 'true');
      });
    }

    // ==========================================
    // 2) iPHONE / iOS (SAFARI)
    // ==========================================
    if (isIos() && iosBanner) {
      const closedKey = 'ios-banner-closed';
      
      if (!localStorage.getItem(closedKey)) {
        // Exibir banner de instrução manual após pequeno delay para smooth UI
        setTimeout(() => {
          iosBanner.classList.remove('hidden');
        }, 1500);
        
        if (btnCloseIos) {
          btnCloseIos.addEventListener('click', () => {
            iosBanner.classList.add('hidden');
            localStorage.setItem(closedKey, 'true');
          });
        }
      }
    }
    
    // Ouve a instalação bem-sucedida para fechar tudo que estiver aberto
    window.addEventListener('appinstalled', () => {
      androidBanner.classList.remove('show');
      deferredPrompt = null;
      console.log('App successfully installed!');
    });
  };

  return { init };
})();
