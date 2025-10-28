input = document.querySelectorAll('.required')
spanErro = document.querySelectorAll('.erro')

emailValidado = false
senhaValidada = false

//Função de erro, caso o campo esteja incorreto
function erro(indice) {
    input[indice].style.border = '2px solid #e63636'
    spanErro[indice].style.display = 'block'
}

//Função de erro, caso o campo esteja correto
function acerto(indice) {
    input[indice].style.border = '0px'
}

function validarEmail() {
    if (input[0].value.length <= 0) {
        erro(0)
        emailValidado = false
    } else {
        acerto(0)
        emailValidado = true;
    }
}

function validarSenha() {
    if (input[1].value.length <= 0) {
        erro(1)
        senhaValidada = false
    }
    else {
        acerto(1)
        senhaValidada = true;
    }
}

// Função para fazer login
function entrar() {

    if (!emailValidado && !senhaValidada) {
        document.getElementById("aviso").innerHTML = "Preencha todos os campos corretamente!"
        return false;
    }

    document.getElementById("aviso").innerHTML = ""

    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    console.log("E-MAIL: ", emailVar);
    console.log("SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.idUsuario;

                    document.getElementById("botao").style.opacity = (0.8);
                    document.getElementById("botao").style.cursor = ("default");
                    document.getElementById("aviso").style.display = ("flex");
                    document.getElementById("aviso").style.color = ("#49c427ff");
                    aviso.innerHTML = "Login realizado com sucesso!";

                    setTimeout(function () {
                        window.location = "../dashboard/dashboard.html";
                    }, 1000);
                });
            } else {
                document.getElementById("aviso").style.display = ("flex");
                document.getElementById("aviso").style.color = ("red");
                aviso.innerHTML = "Erro ao realizar login! Verifique suas credenciais";
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
    return false;
}