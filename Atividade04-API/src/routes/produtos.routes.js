const express = require('express');
const ProdutoController = require("../controllers/produtos.controller");

const router = express.Router();
const produtoController = new ProdutoController();

router.get('/produtos', produtoController.exibirTodosProdutos)
router.get('/produtos/:id', produtoController.exibirProdutosPeloId)
router.get('/produtos/categoria/:id_categoria', produtoController.exibirProdutosPelaCategoria)
router.get('/produtos/nome/:nome', produtoController.exibirProdutosPeloNome)
router.get('/produtos/preco/:precoMin/:precoMax', produtoController.exibirProdutosPeloPreco);
router.post('/produtos', produtoController.createProduto)
router.delete('/produtos/:id', produtoController.deletarProduto)
router.put('/produtos/:id', produtoController.editarProduto)

module.exports = router