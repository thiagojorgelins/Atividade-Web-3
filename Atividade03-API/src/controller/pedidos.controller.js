const PedidoService = require('../services/pedidos.service')

class PedidoController {
    constructor() {
        this.pedidoService = new PedidoService()
    }

    createPedido = async (req, res) => {
        const data_pedido = new Date()
        const { id_cliente, status } = req.body
        try {
            const pedido = await this.pedidoService.createPedido(id_cliente, data_pedido, status)
            res.status(201).json({ msg: 'Pedido cadastrado com sucesso!', pedido })
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }

    exibirTodosPedidos = async (req, res) => {
        try {
            const pedidos = await this.pedidoService.exibirTodosPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            res.status(500).json({ erro: error })
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
            res.status(500).json({ erro: error })
        }
    }

    exibirPedidoPeloIdCliente = async (req, res) => {
        try {
            const { id_cliente } = req.params
            const pedido = await this.pedidoService.exibirPedidoPeloIdCliente(id_cliente)
            if (pedido == undefined) {
                res.status(404).json({ erro: 'Pedido não encontrado!' })
            } else {
                res.status(200).json(pedido)
            }
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }

    editarPedido = async (req, res) => {
        const { id } = req.params
        const { id_cliente, data_pedido, status } = req.body
        try {
            const pedido = await this.pedidoService.editarPedido(id, id_cliente, data_pedido, status)
            res.status(200).json({ msg: 'Pedido editado com sucesso!', pedido })
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }

    deletarPedido = async (req, res) => {
        const { id } = req.params
        try {
            await this.pedidoService.deletarPedido(id)
            res.status(200).json({ msg: 'Pedido deletado com sucesso!' })
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }
}

module.exports = PedidoController