var database = require("../database/config");

function marcarPontuacao(fkUser, acertos, erros, fkQuiz, pontos){
    console.log("ACESSEI O QUEIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor  de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `INSERT INTO pontuacao (id_pont, fkUser, fkQuiz, dtpont, qtd_acertos, qtd_erros, pontos) VALUES (default, ${fkUser}, ${fkQuiz}, default, ${acertos}, ${erros},${pontos});`;
    return database.executar(instrucaoSql);
}

function buscarPontuacao(fkUser, fkQuiz){
    console.log("ACESSEI O QUEIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor  de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
    SELECT * FROM pontuacao 
    WHERE fkUser = ${fkUser} AND fkQuiz = ${fkQuiz}
    `;
    return database.executar(instrucaoSql);
}

function top3Ranking(fkQuiz) {
  const sql = `
    SELECT u.nome, MAX(p.qtd_acertos) AS qtd_acertos
    FROM pontuacao p
    JOIN usuario u ON p.fkUser = u.id_user
    WHERE p.fkQuiz = ${fkQuiz}
    GROUP BY u.id_user
    ORDER BY qtd_acertos DESC
    LIMIT 8;
  `;
  return database.executar(sql);
}


module.exports = {
    marcarPontuacao,
    buscarPontuacao,
    top3Ranking
};