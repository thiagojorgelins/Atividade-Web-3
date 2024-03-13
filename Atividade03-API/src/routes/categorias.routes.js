const express = require('express');
const CategoriaController = require("../controller/categorias.controller");

const router = express.Router();
const categoriaController = new CategoriaController();

router.get('/categorias', categoriaController.exibirTodasCategorias)
router.get('/categorias/:id', categoriaController.exibirCategoriaPeloId)
router.post('/categorias', categoriaController.createCategoria)
router.delete('/categorias/:id', categoriaController.deletarCategoria)

module.exports = router
