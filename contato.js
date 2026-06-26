const formContato = document.getElementById('form-contato');
const msgRetorno = document.getElementById('msg-retorno');

if (formContato) {
    formContato.addEventListener('submit', function (event) {
        event.preventDefault();

        const btnEnviar = formContato.querySelector('input[type="submit"]');
        const textoOriginal = btnEnviar.value;

        // 1. Feedback de estado: Desativa botão e mostra carregamento
        btnEnviar.value = "ENVIANDO...";
        btnEnviar.disabled = true;
        btnEnviar.style.cursor = "not-allowed";
        btnEnviar.style.opacity = "0.7";

        // Limpa mensagens anteriores
        msgRetorno.className = 'msg-retorno';
        msgRetorno.textContent = '';

        const payload = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            mensagem: document.getElementById('mensagem').value
        };

        // 2. Controle de Timeout (30 segundos para o servidor "acordar")
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        fetch('https://portfolio-api-kg2u.onrender.com/api/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        })
        .then(response => {
            clearTimeout(timeoutId); // Cancela o timer se a API responder
            if (response.ok) {
                msgRetorno.textContent = "Mensagem enviada com sucesso! Retornarei em breve.";
                msgRetorno.classList.add('msg-sucesso');
                formContato.reset();
            } else {
                msgRetorno.textContent = "Houve um erro no servidor. Tente novamente mais tarde.";
                msgRetorno.classList.add('msg-erro');
            }
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                msgRetorno.textContent = "O servidor demorou para responder (estava acordando). Tente enviar novamente agora!";
            } else {
                console.error('Erro:', error);
                msgRetorno.textContent = "Erro de conexão. Verifique se o servidor está rodando.";
            }
            msgRetorno.classList.add('msg-erro');
        })
        .finally(() => {
            // 3. Restaura o botão
            btnEnviar.value = textoOriginal;
            btnEnviar.disabled = false;
            btnEnviar.style.cursor = "pointer";
            btnEnviar.style.opacity = "1";

            setTimeout(() => {
                msgRetorno.className = 'msg-retorno';
            }, 8000); // Aumentei para 8s para dar tempo de ler a mensagem de erro
        });
    });
}