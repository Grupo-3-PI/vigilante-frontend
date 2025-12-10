function validarSessao() {
    // Recupera os dados da sessionStorage usando getItem
    var email = sessionStorage.getItem("EMAIL_USUARIO");
    var nome = sessionStorage.getItem("NOME_USUARIO");
    var cargo_agencia = sessionStorage.getItem("CARGO_AGENCIA_USUARIO");

    // Encontra o elemento <span> no header
    var b_usuario = document.getElementById("b_usuario");
    var b_cargo_agencia = document.getElementById("b_cargo_agencia");

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
            b_cargo_agencia.innerHTML = cargo_agencia;
        }
    }

    Swal.fire({
        title: 'Autenticando...',
        text: 'Por favor, aguarde.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });

    fetch("/admin/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
    .then(resposta => {

        if (resposta.ok) {
            resposta.json().then(json => {

                sessionStorage.setItem("ADMIN_ID", json.id);
                sessionStorage.setItem("ADMIN_NOME", json.nome);
                sessionStorage.setItem("ADMIN_EMAIL", json.email);

                Swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Login realizado!',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location = "./dashboardAdmin.html";
                }, 1500);
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro no login',
                text: 'Email ou senha inválidos!'
            });
        }

    })
    .catch(erro => {
        Swal.fire({
            icon: 'error',
            title: 'Erro no servidor',
            text: 'Não foi possível conectar.'
        });
        console.error(erro);
    });

    return false;
}
