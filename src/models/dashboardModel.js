var database = require("../database/config")


function totalCrimes() {
  var instrucaoSql = `SELECT sum(qtd_ocorrencias) FROM Ocorrencias WHERE tipo_ocorrencia = 'Crime';`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function totalCrimesMunicipio(fkMunicipio) {
  var instrucaoSql = `SELECT sum(qtd_ocorrencias) FROM Ocorrencias WHERE fk_municipio = ${fkMunicipio} AND tipo_ocorrencia = 'Crime';`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function totalCrimesTodosMunicipios(ano) {
  var instrucaoSql = `SELECT m.nome_municipio, sum(o.qtd_ocorrencias) FROM Ocorrencias o JOIN Municipio m ON m.id = o.fk_municipio WHERE o.tipo_ocorrencia = "Crime" and ano = ${ano} GROUP BY o.fk_municipio;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function distribuicaoCrimes(fkMunicipio) {
  var instrucaoSql = `SELECT CASE
        WHEN nome_crime LIKE 'HOMICÍDIO DOLOSO%' 
          OR nome_crime LIKE 'Nº DE VÍTIMAS EM HOMICÍDIO DOLOSO%'
          OR nome_crime LIKE 'HOMICÍDIO DOLOSO POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'Nº DE VÍTIMAS EM HOMICÍDIO DOLOSO POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'HOMICÍDIO CULPOSO POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'HOMICÍDIO CULPOSO OUTROS%'
          OR nome_crime LIKE 'TENTATIVA DE HOMICÍDIO%'
          OR nome_crime LIKE 'LESÃO CORPORAL SEGUIDA DE MORTE%'
          OR nome_crime LIKE 'LATROCÍNIO%'
          OR nome_crime LIKE 'Nº DE VÍTIMAS EM LATROCÍNIO%'
        THEN 'CRIMES CONTRA A VIDA'

        WHEN nome_crime LIKE 'LESÃO CORPORAL DOLOSA%'
          OR nome_crime LIKE 'LESÃO CORPORAL CULPOSA POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'LESÃO CORPORAL CULPOSA - OUTRAS%'
        THEN 'AGRESSÕES FÍSICAS'

        WHEN nome_crime LIKE 'TOTAL DE ESTUPRO%'
          OR nome_crime LIKE 'ESTUPRO%'
          OR nome_crime LIKE 'ESTUPRO DE VULNERÁVEL%'
        THEN 'CRIMES SEXUAIS'

        WHEN nome_crime LIKE 'TOTAL DE ROUBO - OUTROS%'
          OR nome_crime LIKE 'ROUBO - OUTROS%'
          OR nome_crime LIKE 'ROUBO DE VEÍCULO%'
          OR nome_crime LIKE 'ROUBO A BANCO%'
          OR nome_crime LIKE 'ROUBO DE CARGA%'
          OR nome_crime LIKE 'FURTO - OUTROS%'
          OR nome_crime LIKE 'FURTO DE VEÍCULO%'
        THEN 'CRIMES CONTRA O PATRIMÔNIO'

        ELSE 'OUTROS'
    END AS categoria_crime,
    
    SUM(qtd_ocorrencias) AS total_ocorrencias

FROM Ocorrencias
WHERE fk_municipio = ${fkMunicipio}
GROUP BY 
    CASE
        WHEN nome_crime LIKE 'HOMICÍDIO DOLOSO%' 
          OR nome_crime LIKE 'Nº DE VÍTIMAS EM HOMICÍDIO DOLOSO%'
          OR nome_crime LIKE 'HOMICÍDIO DOLOSO POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'Nº DE VÍTIMAS EM HOMICÍDIO DOLOSO POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'HOMICÍDIO CULPOSO POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'HOMICÍDIO CULPOSO OUTROS%'
          OR nome_crime LIKE 'TENTATIVA DE HOMICÍDIO%'
          OR nome_crime LIKE 'LESÃO CORPORAL SEGUIDA DE MORTE%'
          OR nome_crime LIKE 'LATROCÍNIO%'
          OR nome_crime LIKE 'Nº DE VÍTIMAS EM LATROCÍNIO%'
        THEN 'CRIMES CONTRA A VIDA'

        WHEN nome_crime LIKE 'LESÃO CORPORAL DOLOSA%'
          OR nome_crime LIKE 'LESÃO CORPORAL CULPOSA POR ACIDENTE DE TRÂNSITO%'
          OR nome_crime LIKE 'LESÃO CORPORAL CULPOSA - OUTRAS%'
        THEN 'AGRESSÕES FÍSICAS'

        WHEN nome_crime LIKE 'TOTAL DE ESTUPRO%'
          OR nome_crime LIKE 'ESTUPRO%'
          OR nome_crime LIKE 'ESTUPRO DE VULNERÁVEL%'
        THEN 'CRIMES SEXUAIS'

        WHEN nome_crime LIKE 'TOTAL DE ROUBO - OUTROS%'
          OR nome_crime LIKE 'ROUBO - OUTROS%'
          OR nome_crime LIKE 'ROUBO DE VEÍCULO%'
          OR nome_crime LIKE 'ROUBO A BANCO%'
          OR nome_crime LIKE 'ROUBO DE CARGA%'
          OR nome_crime LIKE 'FURTO - OUTROS%'
          OR nome_crime LIKE 'FURTO DE VEÍCULO%'
        THEN 'CRIMES CONTRA O PATRIMÔNIO'

        ELSE 'OUTROS'
    END;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function percentualCrimes(ano) {
  var instrucaoSql = `
 SELECT m.nome_municipio, 
    (sum(o.qtd_ocorrencias  * 100.0)) / (SELECT sum(qtd_ocorrencias) FROM Ocorrencias WHERE tipo_ocorrencia = 'Crime' AND ano = ${ano})
    AS porcentagem
    FROM Ocorrencias o
    JOIN Municipio m 
      ON m.id = o.fk_municipio where o.tipo_ocorrencia = 'Crime' and ano = ${ano}
    GROUP BY m.nome_municipio ORDER BY m.nome_municipio DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function crimesAtividadePolicial(fkMunicipio, ano) {
  var instrucaoSql = `
    SELECT mes, tipo_ocorrencia,
    SUM(qtd_ocorrencias) as total_crimes
    from Ocorrencias where fk_municipio = ${fkMunicipio} and ano = ${ano} group by tipo_ocorrencia, mes;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function percentualUltimoMes(fk_municipio, ano) {
  var instrucaoSql = `
    select (select sum(qtd_ocorrencias) from Ocorrencias where mes = MONTH(curdate()) and fk_municipio = ${fk_municipio} and ano = ${ano}) as atual, (select sum(qtd_ocorrencias) from Ocorrencias where mes = (MONTH(curdate()) - 1) and fk_municipio = ${fk_municipio} and ano = ${ano}) as passado,  (select sum(qtd_ocorrencias) from Ocorrencias where mes = MONTH(curdate()) and fk_municipio = ${fk_municipio} and ano = ${ano}) * 100 /  (select sum(qtd_ocorrencias) from Ocorrencias where mes = (MONTH(curdate()) - 1) and fk_municipio = ${fk_municipio} and ano = ${ano}) - 100 as porcentagem;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function percentualTrimestrePassado(fk_municipio, ano) {
  var instrucaoSql = `
    select 
      (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 1 and mes <= 3 and ${fk_municipio} and ano = ${ano}) * 100 /  (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 1 and mes <= 3 and ${fk_municipio} and ano = ${ano - 1}) - 100 as primeiro, 
      (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 4 and mes <= 6 and ${fk_municipio} and ano = ${ano}) * 100 /  (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 4 and mes <= 6 and ${fk_municipio} and ano = ${ano - 1}) - 100 as segundo, 
      (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 7 and mes <= 9 and ${fk_municipio} and ano = ${ano}) * 100 /  (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 7 and mes <= 9 and ${fk_municipio} and ano = ${ano - 1}) - 100 as terceiro,
      (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 10 and mes <= 12 and ${fk_municipio} and ano = ${ano}) * 100 /  (select sum(qtd_ocorrencias) from Ocorrencias where mes >= 10 and mes <= 12 and ${fk_municipio} and ano = ${ano - 1}) - 100 as quarto;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function percentualProdutividadePolicial(fk_municipio) {
  var instrucaoSql = `
    select 
      (select sum(qtd_ocorrencias) from Ocorrencias where mes = MONTH(curdate()) and fk_municipio = ${fk_municipio} and ano = YEAR(curdate()) and tipo_ocorrencia = 'Produtividade Policial') * 100 / 
      (select sum(qtd_ocorrencias) from Ocorrencias where mes = MONTH(curdate()) and fk_municipio = ${fk_municipio} and ano = YEAR(curdate()) and tipo_ocorrencia = 'Crime') - 100 as percentual;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  totalCrimes,
  totalCrimesMunicipio,
  totalCrimesTodosMunicipios,
  distribuicaoCrimes,
  percentualCrimes,
  crimesAtividadePolicial,
  percentualUltimoMes,
  percentualTrimestrePassado,
  percentualProdutividadePolicial,
};