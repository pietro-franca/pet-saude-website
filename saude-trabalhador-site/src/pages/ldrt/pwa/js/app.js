// app.js

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const splashScreen = document.getElementById('splash-screen');
  const searchScreen = document.getElementById('search-screen');
  const detailScreen = document.getElementById('detail-screen');
  
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const noResults = document.getElementById('no-results');
  const btnToggleMode = document.getElementById('btn-toggle-mode');
  const modeText = document.getElementById('mode-text');
  const modeIcon = document.getElementById('mode-icon');
  
  const searchAreaBg = document.getElementById('search-area-bg');
  const mainHeader = document.getElementById('main-header');
  const searchIcon = document.getElementById('search-icon');
  const modeSwap = document.getElementById('mode-swap');
  
  const categoryFilterWrapper = document.getElementById('category-filter-wrapper');
  const categorySelect = document.getElementById('category-select');
  
  const btnInfo = document.getElementById('btn-info');
  const infoDialog = document.getElementById('info-dialog');
  const btnCloseInfo = document.getElementById('btn-close-info');
  
  // Detail Screen Elements
  const detailHeader = document.getElementById('detail-header');
  const detailMainTitle = document.getElementById('detail-main-title');
  const btnBack = document.getElementById('btn-back');
  const btnHome = document.getElementById('btn-home');
  const btnCopyAll = document.getElementById('btn-copy-all');
  const titleExpandBtn = document.getElementById('title-expand-btn');
  const titleExpansionText = document.getElementById('title-expansion-text');
  const relatedItemsList = document.getElementById('related-items-list');
  const relatedItemsTitle = document.getElementById('related-items-title');
  const viewingBanner = document.getElementById('viewing-banner');
  const viewingIcon = document.getElementById('viewing-icon');
  const viewingText = document.getElementById('viewing-text');
  const detailHintText = document.getElementById('detail-hint-text');
  const searchHintText = document.getElementById('search-hint-text');

  // State
  let allDiseases = window.LDRT_DATA || [];
  let currentSearchType = localStorage.getItem('ldrt-search-type') || 'Doença';
  let currentCategory = localStorage.getItem('ldrt-category') || 'Todos';
  let detailState = null; // Stores current item being viewed
  let expandedItems = new Set();
  let isTitleExpanded = false;
  let navigationStack = []; // Array of states for back navigation
  
  // Theme colors matching CSS
  const colors = {
    disease: '#1A237E',
    risk: '#006064'
  };

  // --- Utility Functions ---
  
  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const normalizeText = (text) => {
    return removeDiacritics(text.toLowerCase()).trim();
  };

  const showSnackbar = (message = "Texto copiado para a área de transferência") => {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.remove('hidden');
    setTimeout(() => {
      snackbar.classList.add('hidden');
    }, 2000);
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showSnackbar()).catch(console.error);
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showSnackbar();
    }
  };

  // Ripple Effect
  const createRipple = (e, button) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    // Support for both mouse and touch events
    let clientX, clientY;
    if(e.type.includes('touch') && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${clientX - rect.left - size / 2}px`;
    ripple.style.top = `${clientY - rect.top - size / 2}px`;
    
    button.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 600);
  };


  // --- Initialization ---

  const isDesktop = window.location.search.includes('desktop=true');

  const init = () => {
    // Splash screen logic
    if (isDesktop) {
      document.body.classList.add('desktop-mode');
      splashScreen.classList.remove('active');
      splashScreen.style.display = 'none';
      searchScreen.classList.add('active');
      history.replaceState({ screen: 'search' }, 'Search', window.location.pathname + '?desktop=true');
    } else {
      setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
          splashScreen.classList.remove('active');
          searchScreen.classList.add('active');
           // Initialize History API for home screen
          history.replaceState({ screen: 'search' }, 'Search', window.location.pathname);
        }, 500); 
      }, 2000);
    }

    // Setup Event Listeners
    searchInput.addEventListener('input', () => filterSearchResults(searchInput.value));
    btnToggleMode.addEventListener('click', toggleSearchType);
    categorySelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      filterSearchResults(searchInput.value);
    });
    
    btnInfo.addEventListener('click', () => infoDialog.classList.remove('hidden'));
    btnCloseInfo.addEventListener('click', () => infoDialog.classList.add('hidden'));

    // Long press and ripple setup for generated items handled in render list
    
    btnBack.addEventListener('click', navigateBack);
    btnHome.addEventListener('click', navigateToHome);
    btnCopyAll.addEventListener('click', copyAllDetailContent);
    titleExpandBtn.addEventListener('click', () => toggleTitleExpansion());

    // Theme input wrapper border
    const inputWrapper = document.querySelector('.search-input-wrapper');
    searchInput.addEventListener('focus', () => {
      inputWrapper.classList.add(currentSearchType === 'Doença' ? 'focus-disease' : 'focus-risk');
    });
    searchInput.addEventListener('blur', () => {
      inputWrapper.className = 'search-input-wrapper';
    });

    categorySelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      localStorage.setItem('ldrt-category', currentCategory);
      filterSearchResults(searchInput.value);
    });
    
    
    // Initial Render
    const savedQuery = localStorage.getItem('ldrt-search-query') || '';
    if (savedQuery) searchInput.value = savedQuery;
    
    // Restore category select if saved
    if(currentCategory !== 'Todos') {
      categorySelect.value = currentCategory;
    }

    filterSearchResults(savedQuery);
    updateThemeUI();
    InstallPrompt.init();
  };

  // --- Search Logic ---

  const toggleSearchType = () => {
    currentSearchType = currentSearchType === 'Doença' ? 'Fator de Risco' : 'Doença';
    currentCategory = 'Todos';
    categorySelect.value = 'Todos';
    localStorage.setItem('ldrt-search-type', currentSearchType);
    localStorage.setItem('ldrt-category', currentCategory);
    
    updateThemeUI();
    filterSearchResults(searchInput.value);
  };

  const updateThemeUI = () => {
    const isDisease = currentSearchType === 'Doença';
    
    // Text & Icons
    modeText.textContent = currentSearchType;
    modeIcon.textContent = isDisease ? 'medical_services' : 'warning';
    
    searchInput.placeholder = isDisease ? 'Digite o nome da doença ou CID' : 'Digite o agente ou fator de risco';
    searchHintText.textContent = isDisease ? 'Toque em uma doença para listar os agentes e/ou fatores de risco relacionados.' : 'Toque em um agente ou fator de risco para listar as doenças relacionadas.';
    
    // Classes
    mainHeader.className = `app-header ${isDisease ? 'disease-mode' : 'risk-mode'}`;
    searchAreaBg.className = `search-area ${isDisease ? 'disease-mode-bg' : 'risk-mode-bg'}`;
    btnToggleMode.className = `mode-toggle-btn ${isDisease ? 'disease-mode-border' : 'risk-mode-border'}`;
    
    const elementsToColor = [modeText, modeIcon, searchIcon, modeSwap];
    elementsToColor.forEach(el => {
      el.className = el.className.replace(/disease-mode-text|risk-mode-text/g, '').trim();
      el.classList.add(isDisease ? 'disease-mode-text' : 'risk-mode-text');
    });

    if (isDisease) {
      categoryFilterWrapper.classList.add('hidden');
    } else {
      categoryFilterWrapper.classList.remove('hidden');
    }

    // Update Meta Theme Color
    document.getElementById('theme-color-meta').setAttribute('content', isDisease ? colors.disease : colors.risk);
  };

  const filterSearchResults = (query) => {
    const normalizedQuery = normalizeText(query);
    localStorage.setItem('ldrt-search-query', query);
    
    let filteredList = allDiseases;
    if (query !== '' || (currentSearchType === 'Fator de Risco' && currentCategory !== 'Todos')) {
      filteredList = allDiseases.filter(disease => {
        const normalizedName = normalizeText(disease.nome_condicao);
        const normalizedCidSemPonto = normalizeText(disease.cid_sem_ponto);
        const normalizedCidComPonto = normalizeText(disease.cid_com_ponto);
        const normalizedRisk = normalizeText(disease.fator_de_risco);
        const normalizedCategory = normalizeText(disease.categoria);
        
        const categoryMatch = currentSearchType === 'Fator de Risco' && currentCategory !== 'Todos' 
          ? normalizedCategory === normalizeText(currentCategory) 
          : true;

        if (currentSearchType === 'Doença') {
          return categoryMatch && (normalizedName.includes(normalizedQuery) || normalizedCidSemPonto.includes(normalizedQuery) || normalizedCidComPonto.includes(normalizedQuery));
        } else {
          return categoryMatch && normalizedRisk.includes(normalizedQuery);
        }
      });
    }

    renderSearchList(filteredList, currentSearchType);
  };

  const renderSearchList = (filteredList, type) => {
    searchResults.innerHTML = '';
    
    let listItems = [];
    if (type === 'Fator de Risco') {
      // Unique risk factors
      const risksSet = new Set(filteredList.map(d => d.fator_de_risco.trim()));
      listItems = Array.from(risksSet);
    } else {
      // Unique diseases
      const uniqueConditions = new Set();
      filteredList.forEach(d => {
        const key = `${d.nome_condicao.trim()}_${d.cid_com_ponto.trim()}`;
        if (!uniqueConditions.has(key)) {
          uniqueConditions.add(key);
          listItems.push(d);
        }
      });
    }

    if (listItems.length === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      
      const fragment = document.createDocumentFragment();
      listItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        
        let displayText, clickHandler;

        if (type === 'Doença') {
          displayText = `${item.nome_condicao.trim()} - ${item.cid_com_ponto.trim()}`;
          clickHandler = () => navigateToDetail(item, 'Doença');
        } else {
          displayText = item;
          clickHandler = () => {
            const disease = allDiseases.find(d => normalizeText(d.fator_de_risco.trim()) === normalizeText(item));
            if(disease) navigateToDetail(disease, 'Fator de Risco');
          };
        }

        card.innerHTML = `
          <div class="result-card-title">${displayText}</div>
          <i class="material-icons result-card-arrow">arrow_forward_ios</i>
        `;

        // Interaction Setup
        setupInteractions(card, clickHandler, () => copyToClipboard(displayText));
        fragment.appendChild(card);
      });
      searchResults.appendChild(fragment);
    }
  };

  // Setup click (with ripple) and long press
  const setupInteractions = (element, onClick, onLongPress) => {
    let pressTimer;
    let isLongPress = false;
    let startX, startY;

    const startPress = (e) => {
      isLongPress = false;
      if(e.type.includes('touch')) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
      pressTimer = setTimeout(() => {
        isLongPress = true;
        if(onLongPress) onLongPress();
      }, 500); // 500ms for long press
    };

    const cancelPress = (e) => {
      clearTimeout(pressTimer);
      if(e.type === 'touchmove' && startX && startY) {
         // if moved too much, cancel
         if (Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10) {
            clearTimeout(pressTimer);
            isLongPress = true; // prevent click
         }
      }
    };

    const endPress = (e) => {
      clearTimeout(pressTimer);
      if (!isLongPress && onClick) {
        // Prevent triggering tap if the user interacted with a button (like the expand icon)
        if (e.target.closest('.icon-btn') || e.target.closest('button')) {
          return;
        }
        createRipple(e, element);
        onClick();
      }
    };

    element.addEventListener('mousedown', startPress);
    element.addEventListener('touchstart', startPress, {passive: true});
    element.addEventListener('mouseout', cancelPress);
    element.addEventListener('touchmove', cancelPress, {passive: true});
    element.addEventListener('mouseup', endPress);
    element.addEventListener('touchend', endPress);
  };


  // --- Detail View Logic ---

  const canExpand = (text) => {
    return window.EXPANSION_TEXTS && window.EXPANSION_TEXTS.hasOwnProperty(text.trim());
  };

  const getUniqueRelatedItems = (state) => {
    if (state.searchType === 'Doença') {
      const items = new Set();
      allDiseases.forEach(d => {
        if (normalizeText(d.nome_condicao) === normalizeText(state.selectedItem.nome_condicao)) {
          items.add(d.fator_de_risco.trim());
        }
      });
      return Array.from(items);
    } else {
      const items = new Set();
      allDiseases.forEach(d => {
        if (normalizeText(d.fator_de_risco) === normalizeText(state.selectedItem.fator_de_risco)) {
          items.add(`${d.nome_condicao.trim()} - ${d.cid_com_ponto.trim()}`);
        }
      });
      return Array.from(items);
    }
  };

  const renderDetailScreen = (state) => {
    detailState = state;
    expandedItems.clear();
    isTitleExpanded = false;

    const isDisease = state.searchType === 'Doença';
    const headerText = isDisease 
      ? `${state.selectedItem.nome_condicao.trim()} - ${state.selectedItem.cid_com_ponto.trim()}`
      : state.selectedItem.fator_de_risco.trim();
    const titleText = isDisease ? state.selectedItem.nome_condicao.trim() : state.selectedItem.fator_de_risco.trim();
    
    // Theme Update for Detail
    const activeColor = isDisease ? colors.disease : colors.risk;
    const activeClass = isDisease ? 'disease-mode' : 'risk-mode';
    const textClass = isDisease ? 'disease-mode-text' : 'risk-mode-text';
    
    detailHeader.className = `app-header ${activeClass}`;
    document.getElementById('theme-color-meta').setAttribute('content', activeColor);
    
    // Viewing Banner
    viewingBanner.style.backgroundColor = isDisease ? 'rgba(26, 35, 126, 0.1)' : 'rgba(0, 96, 100, 0.1)';
    viewingBanner.style.border = `1px solid ${isDisease ? 'rgba(26, 35, 126, 0.3)' : 'rgba(0, 96, 100, 0.3)'}`;
    viewingBanner.style.color = activeColor;
    viewingIcon.textContent = isDisease ? 'medical_services' : 'warning';
    viewingIcon.style.marginRight = '8px';
    viewingText.textContent = `Visualizando ${isDisease ? 'Doença' : 'Agente e/ou Fator de Risco'}`;

    // Hint
    detailHintText.textContent = isDisease 
      ? 'Toque em um agente ou fator de risco para ver outras doenças relacionadas. Segure para copiar.'
      : 'Toque em uma doença para ver outros agentes e fatores de risco relacionados. Segure para copiar.';

    // Main Title Card
    const currentMainTitle = document.getElementById('detail-main-title');
    currentMainTitle.textContent = headerText;
    currentMainTitle.style.color = activeColor;
    document.getElementById('main-title-card').style.border = `1px solid ${isDisease ? 'rgba(26, 35, 126, 0.3)' : 'rgba(0, 96, 100, 0.3)'}`;
    document.getElementById('main-title-card').style.backgroundColor = isDisease ? 'rgba(26, 35, 126, 0.05)' : 'rgba(0, 96, 100, 0.05)';
    
    // Title interaction
    const mainTitleCardDOM = document.getElementById('main-title-card');
    // Remove old listeners
    const newCard = mainTitleCardDOM.cloneNode(true);
    mainTitleCardDOM.parentNode.replaceChild(newCard, mainTitleCardDOM);
    
    // Re-attach elements
    const newTitleExpandBtn = newCard.querySelector('#title-expand-btn');
    const newTitleExpansionText = newCard.querySelector('#title-expansion-text');
    
    setupInteractions(newCard, null, () => {
       copyTitleContent(headerText, titleText);
    });

    if (canExpand(titleText)) {
      newTitleExpandBtn.classList.remove('hidden');
      newTitleExpandBtn.style.color = activeColor;
      newTitleExpansionText.textContent = window.EXPANSION_TEXTS[titleText];
      
      newTitleExpandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTitleExpansion(newTitleExpandBtn, newTitleExpansionText);
      });
    } else {
      newTitleExpandBtn.classList.add('hidden');
      newTitleExpansionText.classList.add('hidden');
    }
  
    // Related Items List
    relatedItemsTitle.textContent = isDisease ? 'Agentes e/ou fatores de risco relacionados:' : 'Doenças relacionadas:';
    relatedItemsTitle.style.color = activeColor;
    relatedItemsList.innerHTML = '';
    
    const relatedItems = getUniqueRelatedItems(state);
    const fragment = document.createDocumentFragment();

    relatedItems.forEach(item => {
      const itemCanExpand = isDisease && canExpand(item);
      
      const itemCard = document.createElement('div');
      itemCard.className = 'result-card detail-card';
      
      let html = `
        <div class="detail-content">
          <div class="detail-text">${item}</div>
          <div class="detail-actions">
            ${itemCanExpand ? `<button class="icon-btn sub-expand-btn" style="color: ${activeColor}"><i class="material-icons">expand_more</i></button>` : ''}
            <button class="icon-btn nav-btn" style="color: ${activeColor}"><i class="material-icons">arrow_forward</i></button>
          </div>
        </div>
      `;
      if (itemCanExpand) {
        html += `<div class="expansion-text sub-expansion hidden">${window.EXPANSION_TEXTS[item]}</div>`;
      }
      
      itemCard.innerHTML = html;

      // Card Tap/LongPress
      setupInteractions(itemCard, () => handleRelatedItemTap(item, isDisease), () => {
        let textToCopy = item;
        if(expandedItems.has(item) && itemCanExpand) {
          textToCopy += `\n\n${window.EXPANSION_TEXTS[item]}`;
        }
        copyToClipboard(textToCopy);
      });

      // Expand Button
      if (itemCanExpand) {
        const expandBtn = itemCard.querySelector('.sub-expand-btn');
        const expandText = itemCard.querySelector('.sub-expansion');
        expandBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if(expandedItems.has(item)) {
            expandedItems.delete(item);
            expandText.classList.add('hidden');
            expandBtn.innerHTML = '<i class="material-icons">expand_more</i>';
          } else {
            expandedItems.add(item);
            expandText.classList.remove('hidden');
            expandBtn.innerHTML = '<i class="material-icons">expand_less</i>';
          }
        });
      }

      // Nav Button - intercept click to avoid main card click duplication
      const navBtn = itemCard.querySelector('.nav-btn');
      navBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleRelatedItemTap(item, isDisease);
      });

      fragment.appendChild(itemCard);
    });

    relatedItemsList.appendChild(fragment);
  };

  const handleRelatedItemTap = (item, isCurrentlyDiseaseView) => {
    if (isCurrentlyDiseaseView) {
      const riskDisease = allDiseases.find(d => normalizeText(d.fator_de_risco.trim()) === normalizeText(item));
      if (riskDisease) navigateToDetail(riskDisease, 'Agente e/ou Fator de Risco');
    } else {
      const nameFromItem = item.split(' - ')[0].trim();
      const conditionDisease = allDiseases.find(d => normalizeText(d.nome_condicao.trim()) === normalizeText(nameFromItem));
      if (conditionDisease) navigateToDetail(conditionDisease, 'Doença');
    }
  };

  const toggleTitleExpansion = (btn, textContainer) => {
    isTitleExpanded = !isTitleExpanded;
    if (isTitleExpanded) {
      btn.innerHTML = '<i class="material-icons">expand_less</i>';
      textContainer.classList.remove('hidden');
    } else {
      btn.innerHTML = '<i class="material-icons">expand_more</i>';
      textContainer.classList.add('hidden');
    }
  };

  const copyTitleContent = (headerText, titleText) => {
    let textToCopy = headerText;
    if (canExpand(titleText) && isTitleExpanded) {
      textToCopy += `\n\n${window.EXPANSION_TEXTS[titleText]}`;
    }
    copyToClipboard(textToCopy);
  };

  const copyAllDetailContent = () => {
    if (!detailState) return;
    const isDisease = detailState.searchType === 'Doença';
    const headerText = isDisease 
      ? `${detailState.selectedItem.nome_condicao.trim()} - ${detailState.selectedItem.cid_com_ponto.trim()}`
      : detailState.selectedItem.fator_de_risco.trim();
    const titleText = isDisease ? detailState.selectedItem.nome_condicao.trim() : detailState.selectedItem.fator_de_risco.trim();
    
    let allText = '';
    if (canExpand(titleText) && isTitleExpanded) {
      allText = `${headerText}\n${window.EXPANSION_TEXTS[titleText]}\n\n`;
    } else {
      allText = `${headerText}:\n\n`;
    }

    const uniqueItems = getUniqueRelatedItems(detailState);
    uniqueItems.forEach(item => {
      allText += `- ${item}`;
      if (expandedItems.has(item) && canExpand(item)) {
        allText += `\n  ${window.EXPANSION_TEXTS[item]}`;
      }
      allText += '\n';
    });

    copyToClipboard(allText);
  };


  // --- Navigation (History API) ---

  const navigateToDetail = (selectedItem, type) => {
    const newState = { selectedItem, searchType: type, id: Date.now() };
    navigationStack.push(newState);
    renderDetailScreen(newState);
    
    // Manage screens
    const oldScreen = document.querySelector('.screen.active');
    if (oldScreen) {
       oldScreen.classList.remove('active');
       oldScreen.classList.add('background');
    }
    detailScreen.classList.remove('background');
    detailScreen.classList.add('active');

    history.pushState({ screen: 'detail', id: newState.id }, 'Detail', window.location.pathname);
    
    // Scroll to top
    document.getElementById('detail-list-area').scrollTop = 0;
  };

  const navigateBack = () => {
    window.history.back();
  };

  const navigateToHome = () => {
    // Traverse history based on stack size
    if (navigationStack.length > 0) {
      window.history.go(-navigationStack.length);
    }
  };

  window.addEventListener('popstate', (e) => {
    if(!e.state) return;
    
    if (e.state.screen === 'search') {
      navigationStack = [];
      detailState = null;
      
      detailScreen.classList.remove('active');
      searchScreen.classList.remove('background');
      searchScreen.classList.add('active');

      // Restore color
      updateThemeUI();

    } else if (e.state.screen === 'detail') {
      // Find state in stack
      navigationStack.pop(); // Remove the current one
      const prevState = navigationStack[navigationStack.length - 1];
      if (prevState) {
        renderDetailScreen(prevState);
      }
    }
  });


  // --- PWA Installation & iOS Banner ---
  if (typeof InstallPrompt !== 'undefined') {
    InstallPrompt.init();
  }

  // Run app
  init();
});
