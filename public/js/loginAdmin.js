function entrar() {
    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        Swal.fire({
            icon: 'error',
            title: 'Erro...',
            text: 'Preencha todos os campos!'
        });
        return false;
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
                    window.location = "./filtros.html";
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
