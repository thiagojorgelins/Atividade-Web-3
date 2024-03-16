const express = require('express')
const ClienteController = require("../controller/clientes.controller")

const router = express.Router();
const clienteController = new ClienteController()

router.post('/clientes', clienteController.createCliente)
router.get('/clientes', clienteController.exibirTodosClientes)
router.get('/clientes/:id', clienteController.exibirClientePeloId)
router.get('/clientes/email/:email', clienteController.exibirClientePeloEmail)
router.put('/clientes/:id', clienteController.editarCliente)
router.delete('/clientes/:id', clienteController.deletarCliente)
module.exports = router
    