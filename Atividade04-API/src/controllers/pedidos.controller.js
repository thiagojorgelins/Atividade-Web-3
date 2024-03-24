const PedidoService = require('../services/pedidos.service')

class PedidoController {
    constructor() {
        this.pedidoService = new PedidoService()
    }

    createPedido = async (req, res) => {
        const dataPedido = new Date()
        const { clienteId, status } = req.body
        try {
            const pedido = await this.pedidoService.createPedido(clienteId, dataPedido, status)
            res.status(201).json({ msg: 'Pedido cadastrado com sucesso!', pedido })
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirTodosPedidos = async (req, res) => {
        try {
            const pedidos = await this.pedidoService.exibirTodosPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirPedidoPeloId = async (req, res) => {
        try {
            const { id } = req.params
            const pedido = await this.pedidoService.exibirPedidoPeloId(id)
            if (pedido == undefined) {
                res.status(404).json({ erro: 'Pedido não encontrado!' })
            } else {
                res.status(200).json(pedido)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirPedidoPeloIdCliente = async (req, res) => {
        try {
            const { clienteId } = req.params
            const pedido = await this.pedidoService.exibirPedidoPeloIdCliente(clienteId)
            if (pedido == undefined) {
                res.status(404).json({ erro: 'Pedido não encontrado!' })
            } else {
                res.status(200).json(pedido)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    editarPedido = async (req, res) => {
        const { id } = req.params
        const { clienteId, dataPedido, status } = req.body
        try {
            const pedido = await this.pedidoService.editarPedido(id, clienteId, dataPedido, status)
            res.status(200).json({ msg: 'Pedido editado com sucesso!', pedido })
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    deletarPedido = async (req, res) => {
        const { id } = req.params
        try {
            await this.pedidoService.deletarPedido(id)
            res.status(200).json({ msg: 'Pedido deletado com sucesso!' })
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
}

module.exports = PedidoController