var express = require("express");
var router = express.Router();

// requisicao nas funcoes da controller usuario
var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) { // pega os itens recebidos no cadastro.html, e manda pra função cadastrar no controllers
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});


module.exports = router;