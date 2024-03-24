const ItensPedido = require('../database/models/itensPedido.js')

class ItensPedidoService{
    async createItensPedido(pedidoId, produtoId, quantidade, preco_unitario){
        try {
            const itensPedidoData = {
                pedidoId: pedidoId,
                produtoId: produtoId,
                quantidade: quantidade,
                preco_unitario: preco_unitario
            }
            const itenPedido = await ItensPedido.create(itensPedidoData)
            return itenPedido
        } catch(error){
            throw 'Erro ao criar item de pedido: ' + error
        }
    }

    async exibirItensPedidoPeloId(id){
        try {
            return await ItensPedido.findByPk(id)
        } catch (error){
            throw error
        }
    }

    async exibirItensPedidoPeloIdPedido(pedidoId){
        try {
            return await ItensPedido.findAll({ where: { pedidoId: pedidoId }})
        } catch (error){
            throw error
        }
    }

    async editarItensPedido(id, pedidoId, produtoId, quantidade, preco_unitario){
        try {
            const itensPedidoData = {
                pedidoId: pedidoId,
                produtoId: produtoId,
                quantidade: quantidade,
                preco_unitario: preco_unitario
            }
            const itensPedidoAtt = await ItensPedido.update(itensPedidoData, { where: { id: id }})
            return itensPedidoAtt
        } catch (error){
            throw 'Erro ao editar item de pedido: ' + error
        }
    }

    async deletarItensPedido(id){
        try {
            return await ItensPedido.destroy({ where: { id: id }})
        } catch (error){
            throw 'Erro ao deletar item de pedido: ' + error
        }
    }
}

module.exports = ItensPedidoService;