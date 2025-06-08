var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

router.post("/marcarPontuacao", function (req, res) {
   pontuacaoController.marcarPontuacao(req,res);
});

router.get("/buscarPontuacao/:fkUser/:fkQuiz", function (req, res) {
   pontuacaoController.buscarPontuacao(req,res);
});

router.get("/top3/:fkQuiz", function (req, res) {
  pontuacaoController.top3Ranking(req, res);
});


module.exports = router;

// get pega elemento 
// post joga o elemento em algum lugar