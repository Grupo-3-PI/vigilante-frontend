// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cargo_agencia = sessionStorage.CARGO_AGENCIA_USUARIO;

    var b_cargo_agencia = document.getElementById("b_cargo_agencia");
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null && cargo_agencia != null) {
        b_usuario.innerHTML = nome;
        b_cargo_agencia.innerHTML = cargo_agencia;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

