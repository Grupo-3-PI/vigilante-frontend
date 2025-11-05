function entrar() {
    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    if(emailVar == "" || senhaVar == "") {
        alert("Preencha todos os campos para prosseguir");
        return false;
    }

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
    .then(function(resposta) {
        console.log("resposta: ", resposta);

        if(resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;

                setTimeout(function() {
                    window.location = "../dashboard/dashboard.html";
                }, 1000);
            });
        } else {
            console.log("Houve um erro ao fazer o login!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    })
    .catch(function(erro) {
        console.log(erro);
    });
    return false;
}