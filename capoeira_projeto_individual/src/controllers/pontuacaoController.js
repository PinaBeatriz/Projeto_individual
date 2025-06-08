var pontuacaoModel = require("../models/pontuacaoModel");

function marcarPontuacao(req, res){
    var acertos = req.body.acertosServer;
    var fkUser = req.body.fkUser;
    var erros = req.body.errosServer;
    var fkQuiz = req.body.fkQuizServer;


    if (acertos == undefined || erros == undefined) {
        res.status(400).send("Sua pontuação está undefined!");
    }else{
        pontuacaoModel.marcarPontuacao(fkUser, acertos, erros, fkQuiz)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function(erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarPontuacao(req,res){
    var fkUser = req.params.fkUser;
    var fkQuiz = req.params.fkQuiz;

        pontuacaoModel.buscarPontuacao(fkUser,fkQuiz)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function(erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    
}

function top3Ranking(req, res) {
  var fkQuiz = req.params.fkQuiz;

  pontuacaoModel.top3Ranking(fkQuiz)
    .then(resultado => res.json(resultado))
    .catch(erro => {
      console.log("Erro no ranking:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    marcarPontuacao,
    buscarPontuacao,
    top3Ranking
}