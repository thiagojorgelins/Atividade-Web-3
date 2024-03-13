const express = require('express');
const ProdutoController = require("../controller/produtos.controller");

const router = express.Router();
const produtoController = new ProdutoController();

router.post('/produtos', produtoController.createProduto)

module.exports = router