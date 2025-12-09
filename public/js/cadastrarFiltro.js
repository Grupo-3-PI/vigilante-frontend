function cadastrar() {
    const nome = document.getElementById("nome_value").value.trim();
    const descricao = document.getElementById("descricao_value").value.trim();
    const categoria = document.getElementById("categoria_filtro").value;

    if (nome.length < 3) {
        alert("O nome do filtro deve ter pelo menos 3 caracteres.");
        return;
    }
    if (descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        return;
    }
    if (!categoria) {
        alert("Selecione uma categoria.");
        return;
    }

    const fkAdministradorRaw = sessionStorage.ADMIN_ID;

    if (!fkAdministradorRaw) {
        alert("Administrador não encontrado (sessionStorage.ADMIN_ID). Faça login novamente.");
        return;
    }

    const fkAdministrador = Number(fkAdministradorRaw);
    if (Number.isNaN(fkAdministrador)) {
        alert("ID do administrador inválido.");
        return;
    }

    fetch("/filtros/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: nome,
            descricaoServer: descricao,
            categoriaServer: categoria,
            fkAdministradorServer: fkAdministrador
        })
    })
    .then(r => {
        if (!r.ok) throw "Erro ao cadastrar filtro.";
        return r.json();
    })
    .then(data => {
        alert("Filtro cadastrado com sucesso!");
        const modal = document.getElementById("modal");
        if (modal && typeof modal.close === "function") modal.close();

        document.getElementById("nome_value").value = "";
        document.getElementById("descricao_value").value = "";
        document.getElementById("categoria_filtro").value = "";
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao cadastrar filtro.");
    });
}
