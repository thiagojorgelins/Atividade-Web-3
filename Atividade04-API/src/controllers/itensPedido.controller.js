const ItensPedidoService = require('../services/itensPedido.service')
const ProdutoService = require('../services/produtos.service')
const PedidoService = require('../services/pedidos.service')
class ItensPedidoController {
    constructor() {
        this.itensPedidoService = new ItensPedidoService()
        this.produtoService = new ProdutoService()
        this.pedidoService = new PedidoService()
    }

    createItensPedido = async (req, res) => {
        const { pedidoId, produtoId, quantidade } = req.body
        try {
            const pedido = await this.pedidoService.exibirPedidoPeloId(pedidoId)
            const produto = await this.produtoService.exibirProdutoPeloId(produtoId)
            if (pedido == undefined) {
                res.status(404).json({ erro: 'Pedido não encontrado!' })
            } else {
                if (produto == undefined) {
                    res.status(404).json({ erro: 'Produto não encontrado!' })
                } else {
                    const itemPedido = await this.itensPedidoService.createItensPedido(pedidoId, produtoId, quantidade, produto.preco)
                    res.status(201).json({ msg: 'Itens do pedido cadastrado com sucesso!', itemPedido })
                }
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirItensPedidoPeloId = async (req, res) => {
        try {
            const { id } = req.params
            const itemPedido = await this.itensPedidoService.exibirItensPedidoPeloId(id)
            if (itemPedido == undefined) {
                res.status(404).json({ erro: 'Item do pedido não encontrado!' })
            } else {
                res.status(200).json(itemPedido)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirItensPedidoPeloIdPedido = async (req, res) => {
        try {
            const { pedidoId } = req.params
            const itemPedido = await this.itensPedidoService.exibirItensPedidoPeloIdPedido(pedidoId)
            if (itemPedido == undefined) {
                res.status(404).json({ erro: 'Item do pedido não encontrado!' })
            } else {
                res.status(200).json(itemPedido)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    editarItensPedido = async (req, res) => {
        const { id } = req.params
        const { pedidoId, produtoId, quantidade } = req.body
        try {
            const itemPedido = await this.itensPedidoService.editarItensPedido(id, pedidoId, produtoId, quantidade)
            res.status(200).json({ msg: 'Item do pedido editado com sucesso!', itemPedido })
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    deletarItensPedido = async (req, res) => {
        const { id } = req.params
        try {
            await this.itensPedidoService.deletarItensPedido(id)
            res.status(200).json({ msg: 'Item do pedido deletado com sucesso!' })
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
}

module.exports = ItensPedidoController