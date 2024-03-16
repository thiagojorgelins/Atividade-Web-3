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
        const { id_pedido, id_produto, quantidade } = req.body
        try {
            const pedido = await this.pedidoService.exibirPedidoPeloId(id_pedido)
            const produto = await this.produtoService.exibirProdutoPeloId(id_produto)
            if (pedido == undefined) {
                res.status(404).json({ erro: 'Pedido não encontrado!' })
            } else {
                if (produto == undefined) {
                    res.status(404).json({ erro: 'Produto não encontrado!' })
                } else {
                    const itemPedido = await this.itensPedidoService.createItensPedido(id_pedido, id_produto, quantidade, produto.preco)
                    res.status(201).json({ msg: 'Itens do pedido cadastrado com sucesso!', itemPedido })
                }
            }
        } catch (error) {
            res.status(500).json({ erro: error })
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
            res.status(500).json({ erro: error })
        }
    }

    exibirItensPedidoPeloIdPedido = async (req, res) => {
        try {
            const { id_pedido } = req.params
            const itemPedido = await this.itensPedidoService.exibirItensPedidoPeloIdPedido(id_pedido)
            if (itemPedido == undefined) {
                res.status(404).json({ erro: 'Item do pedido não encontrado!' })
            } else {
                res.status(200).json(itemPedido)
            }
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }

    editarItensPedido = async (req, res) => {
        const { id } = req.params
        const { id_pedido, id_produto, quantidade } = req.body
        try {
            const itemPedido = await this.itensPedidoService.editarItensPedido(id, id_pedido, id_produto, quantidade)
            res.status(200).json({ msg: 'Item do pedido editado com sucesso!', itemPedido })
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }

    deletarItensPedido = async (req, res) => {
        const { id } = req.params
        try {
            await this.itensPedidoService.deletarItensPedido(id)
            res.status(200).json({ msg: 'Item do pedido deletado com sucesso!' })
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }
}

module.exports = ItensPedidoController