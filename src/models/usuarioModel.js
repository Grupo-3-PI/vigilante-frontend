var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, cargo_agencia, fk_agencia FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND status = 'Ativo';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, cargo_agencia, fk_agencia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cargo_agencia, fk_agencia);

    var instrucaoSql = `
    INSERT INTO Usuario (nome, email, senha, cargo_agencia, fk_agencia, status) VALUES ('${nome}', '${email}', '${senha}', '${cargo_agencia}', ${fk_agencia}, 'Ativo');
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodosAgencia(fk_agencia) {
    console.log("Listando todos usuários da agência...", fk_agencia);

    var instrucaoSql = `
        SELECT id, nome, email, status, cargo_agencia FROM Usuario WHERE fk_agencia = ${fk_agencia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarUsuarios(id, nome, email, status, cargo) {
    console.log("Atualizando usuários...", id);

    var instrucaoSql = `
        UPDATE Usuario SET nome = '${nome}', email = '${email}', status = '${status}', cargo_agencia = '${cargo}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarStatusUsuario(id, status) {
    console.log("Atualizando status do usuários...", id);

    var instrucaoSql = `
        UPDATE Usuario SET status = '${status}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarTodosAgencia,
    editarUsuarios,
    atualizarStatusUsuario
};