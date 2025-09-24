let listaAgenciasCadastradas = [];


function cadastrar() {
    //Criando variáveis do cadastro
    let nome = nome_value.value;
    let email = email_value.value;
    let senha = senha_value.value;
    let agencia = agencia_value.value;
    let idAgenciaVincular;

    // Verificando se o código de ativação é de alguma empresa cadastrada
    for (let i = 0; i < listaAgenciasCadastradas.length; i++) {
       console.log('OIIII')
      if (listaAgenciasCadastradas[i].codigoAtivacao == agencia) {
        idAgenciaVincular = listaAgenciasCadastradas[i].idAgencia
        console.log("Código de ativação válido.");
        break;
      } else {
        console.log("(Mensagem de erro para código inválido)");
      }
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            idAgenciaVincularServer: idAgenciaVincular
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...")

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}


function listar() {
    fetch("/agencia/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((agencias) => {
                agencias.forEach((agencias) => {
                    listaAgenciasCadastradas.push(agencias);

                    console.log("listaAgenciasCadastradas")
                    console.log(listaAgenciasCadastradas[0].codigoAtivacao)
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}