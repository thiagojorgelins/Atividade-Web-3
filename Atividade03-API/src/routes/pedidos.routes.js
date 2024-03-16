const express = require('express')
const PedidoController = require("../controller/pedidos.controller")

const router = express.Router();
const pedidoController = new PedidoController()

router.post('/pedidos', pedidoController.createPedido)
router.get('/pedidos', pedidoController.exibirTodosPedidos)
router.get('/pedidos/:id', pedidoController.exibirPedidoPeloId)
router.get('/pedidos/cliente/:id_cliente', pedidoController.exibirPedidoPeloIdCliente)
router.put('/pedidos/:id', pedidoController.editarPedido)
router.delete('/pedidos/:id', pedidoController.deletarPedido)

module.exports = router