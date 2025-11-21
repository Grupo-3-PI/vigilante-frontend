let listaAgenciasCadastradas = [];


function cadastrar() {
    
    let nome = nome_value.value;
    let email = email_value.value;
    let senha = senha_value.value;
    let cargo_agencia = cargo_agencia_value.value;
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
            cargo_agenciaServer: cargo_agencia,
            codigoEmpresaServer: codigoEmpresa
        }),
    })
    .then(function(resposta){
        console.log("resposta: ", resposta);

        if(resposta.ok) {
            alert("Cadastro realizado com sucesso!");
            carregarUsuarios()
        } else{
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function(resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}