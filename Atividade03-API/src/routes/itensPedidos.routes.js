const express = require('express')
const ItensPedidoController = require("../controller/itensPedido.controller")

const router = express.Router();
const itensPedidoController = new ItensPedidoController()

router.post('/itensPedido', itensPedidoController.createItensPedido)
router.get('/itensPedido/:id', itensPedidoController.exibirItensPedidoPeloId)
router.get('/itensPedido/pedido/:id_pedido', itensPedidoController.exibirItensPedidoPeloIdPedido)
router.put('/itensPedido/:id', itensPedidoController.editarItensPedido)
router.delete('/itensPedido/:id', itensPedidoController.deletarItensPedido)

module.exports = router