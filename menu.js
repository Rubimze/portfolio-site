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