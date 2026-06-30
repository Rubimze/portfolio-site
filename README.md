# Portfólio - Front-end

Este repositório contém o código-fonte da interface web do meu portfólio profissional. O site foi projetado para atuar como meu cartão de visitas digital, apresentando minhas especialidades como desenvolvedor backend Java, exibindo projetos de destaque e fornecendo um canal direto e seguro de comunicação.

A aplicação foi desenvolvida focando em alta performance visual, responsividade total e resiliência na comunicação assíncrona com microsserviços externos.

---

## 🚀 Tecnologias Utilizadas

O desenvolvimento da interface baseou-se na utilização de tecnologias nativas (Vanilla) para garantir máxima velocidade de carregamento, sem a necessidade de frameworks pesados:

- **HTML5:** Estruturação semântica de toda a aplicação (acessibilidade e SEO).
- **CSS3 Avançado:**
  - Arquitetura baseada em **Variáveis CSS** para controle centralizado de temas.
  - Layouts fluidos construídos com **Flexbox**.
  - Animações contínuas de interface utilizando `@keyframes` nativos.
  - Design totalmente responsivo adaptado via `@media screen`.
- **JavaScript Moderno (ES6+):**
  - Manipulação dinâmica do DOM para controle de menus e estados visuais.
  - Programação assíncrona baseada em `Async/Await` e `Promises`.
  - Controle estrito de ciclo de vida de requisições de rede.
- **Bootstrap Icons:** Conjunto de ícones vetoriais leve para representação visual.
- **Google Fonts:** Integração da família tipográfica *Poppins* para uma identidade visual limpa e moderna.

---

## 🛠️ Funcionalidades e Diferenciais Técnicos

### 1. Layout Fluido e Aproveitamento de Tela
O design foi otimizado para evitar o efeito de "compressão" ou falsos zooms em monitores grandes. O container principal suporta resoluções de até `1400px` com distribuição espacial inteligente (`justify-content: space-between`), garantindo harmonia visual e preenchimento elegante das laterais em telas High-Res.

### 2. Responsividade Mobile-First Eficiente
Diferente de abordagens comuns que sofrem distorções em navegadores mobile (como o Safari no iOS), a interface utiliza:
- Meta tags de controle de viewport estritas para impedir zooms involuntários.
- Alturas dinâmicas baseadas em **`100dvh` (Dynamic Viewport Height)** para o menu lateral móvel, impedindo que as barras de navegação nativas dos smartphones cortem o conteúdo do layout.

### 3. Alternador Dinâmico de Tema (Dark / Light Mode)
A aplicação conta com um sistema de chaveamento de tema em tempo real. Ao acionar o botão de tema, propriedades de dados customizadas (`data-theme="dark"`) são injetadas no escopo global da página, alterando instantaneamente a paleta de cores mapeada nas variáveis do CSS de forma suave.

### 4. Formulário de Contato Inteligente e Resiliente
O mecanismo de envio de mensagens do formulário conta com práticas avançadas de UX (User Experience) e resiliência de software para lidar com chamadas de APIs externas:
- **Prevenção de SPAM e Cliques Duplos:** Assim que o formulário é submetido, o botão de envio é desabilitado (`disabled = true`), o cursor do mouse é modificado e a opacidade é reduzida. O texto muda para `"ENVIANDO..."` para dar feedback visual imediato ao usuário.
- **Mecanismo Anti-Timeout (AbortController):** Como a API backend está hospedada em arquiteturas de nuvem com inicialização sob demanda (*cold start*), o JavaScript implementa um controlador de aborto de requisição fixado em 30 segundos. Caso o servidor demore para responder, a aplicação captura a falha e avisa o usuário de forma amigável para tentar novamente, sem travar a página.
- **Tratamento Amigável de Erros e Sucesso:** Mensagens flutuantes personalizadas indicam ao usuário se o e-mail foi disparado com sucesso, se houve uma falha de rede ou se ocorreu um erro interno no servidor, desaparecendo da tela automaticamente após 8 segundos.

### 5. Navegação Fluida (Smooth Scroll)
Os links do cabeçalho realizam uma rolagem suave até as respectivas seções da página de forma nativa. O layout previne que o menu fixo (*sticky header*) cubra os títulos das seções utilizando a propriedade `scroll-padding-top: 100px`.

---

## 📂 Estrutura de Arquivos Principal

```bash
├── index.html          # Estrutura principal da página e seções
├── style.css           # Variáveis, resets, seções e regras de responsividade
├── contato.js          # Lógica do formulário, validação, fetch e AbortController
├── menu.js             # Controle do menu sanduíche para dispositivos móveis
└── images/             # Ativos visuais, logos e capturas do portfólio
