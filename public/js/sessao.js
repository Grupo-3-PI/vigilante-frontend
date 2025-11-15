function validarSessao() {
    // Recupera os dados da sessionStorage usando getItem
    var email = sessionStorage.getItem("EMAIL_USUARIO");
    var nome = sessionStorage.getItem("NOME_USUARIO");

    // Encontra o elemento <span> no header
    var b_usuario = document.getElementById("b_usuario");

    // Validação:
    // Se o email ou o nome não existirem (forem nulos),
    // significa que o usuário não está logado.
    if (email == null || nome == null) {
        
        // Limpa qualquer lixo que possa ter ficado
        sessionStorage.clear();
        
        // Avisa o usuário e o expulsa para a tela de login
        alert("Sua sessão expirou ou você não está logado. Por favor, faça login novamente.");
        window.location = "login.html"; 
    
    } else {
        
        // Se o usuário está logado:
        if (b_usuario != null) {
            // Se existir, preenche com a saudação
            b_usuario.innerHTML = nome;
        }
    }
}

// Função para limpar a sessão (botão "Sair")
function sair() {
    alert("Fazendo logout...");
    
    // Limpa todos os dados da sessionStorage
    sessionStorage.clear(); 
    
    // Redireciona para a página inicial (index.html)
    window.location = "index.html"; 
}

document.addEventListener("DOMContentLoaded", function () {
    validarSessao();
});