// Em: public/js/login.js

function entrar() {
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        // Exibe um alerta de erro
        Swal.fire({
            icon: 'error',
            title: 'Erro...',
            text: 'Por favor, preencha todos os campos!',
        });
        return false;
    }
    else {
        // Exibe um indicador de carregamento
        Swal.fire({
            title: 'Autenticando...',
            text: 'Por favor, aguarde.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                // --- ESTA É A PARTE MAIS IMPORTANTE ---
                // Salva os dados do usuário na sessionStorage
                // (Baseado nas chaves do seu usuarioController.js)
                
                // Usamos setItem para garantir a gravação
                sessionStorage.setItem("EMAIL_USUARIO", json.email);
                sessionStorage.setItem("NOME_USUARIO", json.nome);
                sessionStorage.setItem("ID_USUARIO", json.idAgencia);
                sessionStorage.setItem("CNPJ_USUARIO", json.cnpj);
                // --- FIM DA MUDANÇA ---

                // Fecha o alerta de carregamento
                Swal.close();

                // Exibe o alerta de sucesso e redireciona
                Swal.fire({
                    icon: 'success',
                    title: 'Login realizado com sucesso!',
                    showConfirmButton: false,
                });
                
                setTimeout(function () {
                    window.location = "./municipio.html";
                }, 1500); // Espera o alerta de sucesso fechar

            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            
            resposta.text().then(texto => {
                console.error(texto);
                // Exibe o erro para o usuário
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no login',
                    text: 'Email ou senha inválidos!',
                });
            });
        }

    }).catch(function (erro) {
        console.log(erro);
        Swal.fire({
            icon: 'error',
            title: 'Erro na requisição',
            text: 'Não foi possível conectar ao servidor.',
        });
    });

    return false;
}