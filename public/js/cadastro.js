let listaAgenciasCadastradas = [];

function cadastrar() {

    let nome = nome_value.value;
    let email = email_value.value;
    let senha = senha_value.value;
    let codigoEmpresa = agencia_value.value;

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            codigoEmpresaServer: codigoEmpresa
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                botao.disabled = true;
                
                document.getElementById("botao").style.opacity = (0.8);
                document.getElementById("botao").style.cursor = ("default");
                document.getElementById("div_mensagem").style.display = ("flex");
                document.getElementById("div_mensagem").style.color = ("#49c427ff");
                div_mensagem.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");
            } else {
                document.getElementById("div_mensagem").style.display = ("flex");
                document.getElementById("div_mensagem").style.color = ("red");
                div_mensagem.innerHTML = "Erro ao realizar cadastro! Verifique suas credenciais";
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}