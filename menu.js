// ==========================================
// SELEÇÃO DE ELEMENTOS DO DOM (Menu Mobile)
// ==========================================
const mrsMenu = document.getElementById('mrs-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');
const btnFechar = document.getElementById('mrs-fechar');
const linksMenu = menu.querySelectorAll('nav ul li a'); 

// 1. Abre o menu ao clicar no ícone de sanduíche
mrsMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
});

// 2. Fecha o menu ao clicar no "X"
btnFechar.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
});

// 3. Fecha o menu ao clicar na parte escura fora dele
overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
});

// 4. Fecha o menu automaticamente quando um link é selecionado
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
    });
});

// ==========================================
// LÓGICA DO MODO NOTURNO (Dark Mode)
// ==========================================
const btnTema = document.getElementById('mrs-tema');
const iconeTema = btnTema.querySelector('i');
const htmlTag = document.documentElement;

// Recupera a preferência do usuário salva no navegador
const temaSalvo = localStorage.getItem('tema');

// Se o modo escuro foi salvo anteriormente, aplica na inicialização
if (temaSalvo === 'dark') {
    htmlTag.setAttribute('data-theme', 'dark');
    iconeTema.classList.replace('bi-moon-fill', 'bi-sun-fill'); 
}

// Alternância entre os temas ao clicar no botão
btnTema.addEventListener('click', () => {
    const isDark = htmlTag.getAttribute('data-theme') === 'dark';
    const novoTema = isDark ? 'light' : 'dark';
    
    isDark ? htmlTag.removeAttribute('data-theme') : htmlTag.setAttribute('data-theme', 'dark');
    localStorage.setItem('tema', novoTema);
    iconeTema.classList.replace(isDark ? 'bi-sun-fill' : 'bi-moon-fill', isDark ? 'bi-moon-fill' : 'bi-sun-fill');
});

// ==========================================
// LÓGICA DO CABEÇALHO INTELIGENTE (SCROLL)
// ==========================================
let ultimoScroll = 0; // Armazena a posição anterior para comparar se desceu ou subiu
const header = document.querySelector('header');

// Fica escutando os eventos de rolagem da tela (Otimizado com rAF)
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrollAtual = window.scrollY;

            if (scrollAtual > 50) {
                header.classList.add('header-com-sombra');
            } else {
                header.classList.remove('header-com-sombra');
            }

            if (scrollAtual > ultimoScroll && scrollAtual > 150) {
                header.classList.add('header-escondido');
            } else {
                header.classList.remove('header-escondido');
            }

            ultimoScroll = scrollAtual;
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// ==========================================
// AUTO-SCROLL DOS CARROSSEIS (PORTFÓLIO E CERTIFICADOS)
// ==========================================
function initCarrossel(selectorContainer, selectorBarra) {
    const container = document.querySelector(selectorContainer);
    const scrollBar = document.getElementById(selectorBarra);
    
    if (!container) return;

    let scrollSpeed = 0.5;
    let isScrollingRight = true;
    let isPaused = false;
    let currentScroll = 0;
    
    // Acessibilidade e Pausa no Hover/Touch
    const pausar = () => isPaused = true;
    const retomar = () => {
        isPaused = false;
        currentScroll = container.scrollLeft;
    };

    container.addEventListener('mouseenter', pausar);
    container.addEventListener('mouseleave', retomar);
    container.addEventListener('touchstart', pausar);
    container.addEventListener('touchend', () => setTimeout(retomar, 1000));
    
    // Acessibilidade (A11y): Pausa ao navegar com teclado (Tab)
    container.addEventListener('focusin', pausar);
    container.addEventListener('focusout', retomar);

    // Drag-to-Scroll (Mouse)
    let isDown = false;
    let startX;
    let scrollLeftStart;
    let dragged = false;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        dragged = false;
        container.classList.add('is-dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeftStart = container.scrollLeft;
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('is-dragging');
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('is-dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 5) dragged = true;
        container.scrollLeft = scrollLeftStart - walk;
        currentScroll = container.scrollLeft;
    });

    // Prevenir clique e arrasto nativo da imagem
    container.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (dragged) e.preventDefault();
        });
        link.addEventListener('dragstart', (e) => e.preventDefault());
    });

    let maxScroll = container.scrollWidth - container.clientWidth;
    window.addEventListener('resize', () => {
        maxScroll = container.scrollWidth - container.clientWidth;
    });

    // Permite o scroll manual sincronizado com a barra
    container.addEventListener('scroll', () => {
        if (isPaused) {
            currentScroll = container.scrollLeft;
        }
        if (scrollBar) {
            if (maxScroll > 0) {
                const percentage = (container.scrollLeft / maxScroll) * 100;
                scrollBar.style.width = `${percentage}%`;
            }
        }
    });

    // Torna o container da barra de rolagem interativo (clicável, arrastável e com lupa)
    const scrollContainer = scrollBar ? scrollBar.parentElement : null;
    if (scrollContainer) {
        scrollContainer.style.cursor = 'pointer';
        let isDraggingBar = false;

        const updateMouseX = (e) => {
            const rect = scrollContainer.getBoundingClientRect();
            let mouseX = e.clientX - rect.left;
            mouseX = Math.max(0, Math.min(rect.width, mouseX));
            scrollContainer.style.setProperty('--mouse-x', `${mouseX}px`);
            return mouseX / rect.width;
        };

        const handleBarScroll = (e) => {
            let percentage = updateMouseX(e);
            const maxScrollLocal = container.scrollWidth - container.clientWidth;
            container.scrollLeft = percentage * maxScrollLocal;
            currentScroll = container.scrollLeft;
        };

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDraggingBar) updateMouseX(e);
        });

        scrollContainer.addEventListener('mousedown', (e) => {
            isDraggingBar = true;
            isPaused = true;
            scrollContainer.classList.add('is-scrubbing');
            handleBarScroll(e);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDraggingBar) {
                e.preventDefault();
                handleBarScroll(e);
            }
        });

        window.addEventListener('mouseup', () => {
            if (isDraggingBar) {
                isDraggingBar = false;
                isPaused = false;
                scrollContainer.classList.remove('is-scrubbing');
            }
        });
    }

    function autoScroll() {
        if (maxScroll <= 0) {
            if (scrollBar && scrollBar.parentElement) scrollBar.parentElement.style.display = 'none';
        } else {
            if (scrollBar && scrollBar.parentElement) scrollBar.parentElement.style.display = 'block';
            
            if (!isPaused) {
                if (isScrollingRight) {
                    currentScroll += scrollSpeed;
                    if (currentScroll >= maxScroll - 2) {
                        isScrollingRight = false;
                    }
                } else {
                    currentScroll -= scrollSpeed;
                    if (currentScroll <= 0) {
                        isScrollingRight = true;
                    }
                }
                container.scrollLeft = currentScroll;
            }
        }
        requestAnimationFrame(autoScroll);
    }

    // Inicia a animação
    requestAnimationFrame(autoScroll);
}

// Inicializa os carrosseis
initCarrossel('.certificados .flex', 'scroll-bar');
initCarrossel('.portfolio .flex', 'scroll-bar-portfolio');
