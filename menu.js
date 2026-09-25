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
    const temaAtual = htmlTag.getAttribute('data-theme');
    
    if (temaAtual === 'dark') {
        htmlTag.removeAttribute('data-theme'); // Volta pro claro
        localStorage.setItem('tema', 'light');
        iconeTema.classList.replace('bi-sun-fill', 'bi-moon-fill');
    } else {
        htmlTag.setAttribute('data-theme', 'dark'); // Ativa o escuro
        localStorage.setItem('tema', 'dark');
        iconeTema.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
});

// ==========================================
// LÓGICA DO CABEÇALHO INTELIGENTE (SCROLL)
// ==========================================
let ultimoScroll = 0; // Armazena a posição anterior para comparar se desceu ou subiu
const header = document.querySelector('header');

// Fica escutando os eventos de rolagem da tela
window.addEventListener('scroll', () => {
    const scrollAtual = window.scrollY;

    // Aplica uma sombra abaixo do menu se a página não estiver no topo (posição 0)
    if (scrollAtual > 50) {
        header.classList.add('header-com-sombra');
    } else {
        header.classList.remove('header-com-sombra');
    }

    // Esconde o menu se rolou para baixo (e passou de 150px) / Mostra se rolou para cima
    if (scrollAtual > ultimoScroll && scrollAtual > 150) {
        header.classList.add('header-escondido');
    } else {
        header.classList.remove('header-escondido');
    }

    // Atualiza a posição registrada para a próxima verificação
    ultimoScroll = scrollAtual;
});

// ==========================================
// AUTO-SCROLL DA SEÇÃO DE CERTIFICADOS
// ==========================================
const containerCertificados = document.querySelector('.certificados .flex');
const scrollBar = document.getElementById('scroll-bar');

if (containerCertificados) {
    let scrollSpeed = 0.5; // Velocidade do movimento reduzida
    let isScrollingRight = true; // Direção
    let isPaused = false; // Controle de pausa
    let currentScroll = 0; // Armazena o valor exato (com decimais)

    // Pausa a animação ao colocar o mouse por cima (ou tocar)
    containerCertificados.addEventListener('mouseenter', () => isPaused = true);
    containerCertificados.addEventListener('mouseleave', () => {
        isPaused = false;
        currentScroll = containerCertificados.scrollLeft; // Sincroniza ao soltar
    });
    containerCertificados.addEventListener('touchstart', () => isPaused = true);
    containerCertificados.addEventListener('touchend', () => {
        setTimeout(() => {
            isPaused = false;
            currentScroll = containerCertificados.scrollLeft; // Sincroniza ao soltar
        }, 1000);
    });

    // Permite o scroll manual sincronizado com a barra
    containerCertificados.addEventListener('scroll', () => {
        if (isPaused) {
            currentScroll = containerCertificados.scrollLeft;
        }
        if (scrollBar) {
            const maxScroll = containerCertificados.scrollWidth - containerCertificados.clientWidth;
            if (maxScroll > 0) {
                const percentage = (containerCertificados.scrollLeft / maxScroll) * 100;
                scrollBar.style.width = `${percentage}%`;
            }
        }
    });

    function autoScrollCertificados() {
        const maxScroll = containerCertificados.scrollWidth - containerCertificados.clientWidth;
        
        // Se não tem overflow, esconde a barra e não move
        if (maxScroll <= 0) {
            if (scrollBar && scrollBar.parentElement) scrollBar.parentElement.style.display = 'none';
        } else {
            if (scrollBar && scrollBar.parentElement) scrollBar.parentElement.style.display = 'block';
            
            if (!isPaused) {
                if (isScrollingRight) {
                    currentScroll += scrollSpeed;
                    if (currentScroll + containerCertificados.clientWidth >= containerCertificados.scrollWidth - 2) {
                        isScrollingRight = false;
                    }
                } else {
                    currentScroll -= scrollSpeed;
                    if (currentScroll <= 0) {
                        isScrollingRight = true;
                    }
                }
                containerCertificados.scrollLeft = currentScroll;
            }
        }
        
        requestAnimationFrame(autoScrollCertificados);
    }

    // Inicia a animação
    requestAnimationFrame(autoScrollCertificados);
}

// ==========================================
// AUTO-SCROLL DA SEÇÃO DE PORTFÓLIO
// ==========================================
const containerPortfolio = document.querySelector('.portfolio .flex');
const scrollBarPortfolio = document.getElementById('scroll-bar-portfolio');

if (containerPortfolio) {
    let scrollSpeedPort = 0.5; // Velocidade do movimento
    let isScrollingRightPort = true; // Direção
    let isPausedPort = false; // Controle de pausa
    let currentScrollPort = 0; // Armazena o valor exato (com decimais)

    // Pausa a animação ao colocar o mouse por cima (ou tocar)
    containerPortfolio.addEventListener('mouseenter', () => isPausedPort = true);
    containerPortfolio.addEventListener('mouseleave', () => {
        isPausedPort = false;
        currentScrollPort = containerPortfolio.scrollLeft; // Sincroniza ao soltar
    });
    containerPortfolio.addEventListener('touchstart', () => isPausedPort = true);
    containerPortfolio.addEventListener('touchend', () => {
        setTimeout(() => {
            isPausedPort = false;
            currentScrollPort = containerPortfolio.scrollLeft; // Sincroniza ao soltar
        }, 1000);
    });

    // Permite o scroll manual sincronizado com a barra
    containerPortfolio.addEventListener('scroll', () => {
        if (isPausedPort) {
            currentScrollPort = containerPortfolio.scrollLeft;
        }
        if (scrollBarPortfolio) {
            const maxScrollPort = containerPortfolio.scrollWidth - containerPortfolio.clientWidth;
            if (maxScrollPort > 0) {
                const percentagePort = (containerPortfolio.scrollLeft / maxScrollPort) * 100;
                scrollBarPortfolio.style.width = `${percentagePort}%`;
            }
        }
    });

    function autoScrollPortfolio() {
        const maxScrollPort = containerPortfolio.scrollWidth - containerPortfolio.clientWidth;

        if (maxScrollPort <= 0) {
            if (scrollBarPortfolio && scrollBarPortfolio.parentElement) scrollBarPortfolio.parentElement.style.display = 'none';
        } else {
            if (scrollBarPortfolio && scrollBarPortfolio.parentElement) scrollBarPortfolio.parentElement.style.display = 'block';
            
            if (!isPausedPort) {
                if (isScrollingRightPort) {
                    currentScrollPort += scrollSpeedPort;
                    if (currentScrollPort + containerPortfolio.clientWidth >= containerPortfolio.scrollWidth - 2) {
                        isScrollingRightPort = false;
                    }
                } else {
                    currentScrollPort -= scrollSpeedPort;
                    if (currentScrollPort <= 0) {
                        isScrollingRightPort = true;
                    }
                }
                containerPortfolio.scrollLeft = currentScrollPort;
            }
        }
        
        requestAnimationFrame(autoScrollPortfolio);
    }

    // Inicia a animação
    requestAnimationFrame(autoScrollPortfolio);
}