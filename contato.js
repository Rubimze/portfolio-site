const formContato = document.getElementById('form-contato');
const msgRetorno = document.getElementById('msg-retorno');

if (formContato) {
    formContato.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const btnEnviar = formContato.querySelector('input[type="submit"]');
        const textoOriginal = btnEnviar.value;
        
        // 1. Prevenção de SPAM (Desativa o botão)
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

        fetch('https://portfolio-api-kg2u.onrender.com/api/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                // 2. Feedback de Sucesso e Limpeza
                msgRetorno.textContent = "Mensagem enviada com sucesso! Retornarei em breve.";
                msgRetorno.classList.add('msg-sucesso');
                formContato.reset(); // Zera os campos do formulário
            } else {
                // Feedback de Erro do Servidor
                msgRetorno.textContent = "Houve um erro no servidor. Tente novamente mais tarde.";
                msgRetorno.classList.add('msg-erro');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            // Feedback de Erro de Conexão
            msgRetorno.textContent = "Erro de conexão. Verifique se o servidor está rodando.";
            msgRetorno.classList.add('msg-erro');
        })
        .finally(() => {
            // 3. Restaura o botão ao estado original
            btnEnviar.value = textoOriginal;
            btnEnviar.disabled = false;
            btnEnviar.style.cursor = "pointer";
            btnEnviar.style.opacity = "1";
            
            // Opcional: Oculta a mensagem automaticamente após 5 segundos
            setTimeout(() => {
                msgRetorno.className = 'msg-retorno';
            }, 5000);
        });
    });
}