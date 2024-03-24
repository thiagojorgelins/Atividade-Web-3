const Pedido = require('../database/models/pedidos')

class PedidoService{
    async createPedido(clienteId, dataPedido, status){
        try {
            const pedidoData = {
                clienteId: clienteId,
                dataPedido: dataPedido,
                status: status
            }
            const pedido = await Pedido.create(pedidoData)
            return pedido
        } catch(error){
            throw 'Erro ao criar pedido: ' + error
        }
    }

    async exibirTodosPedidos(){
        try {
            return await Pedido.findAll()
        } catch (error){
            throw error
        }
    }

    async exibirPedidoPeloId(id){
        try {
            return await Pedido.findByPk(id)
        } catch (error){
            throw error
        }
    }

    async exibirPedidoPeloIdCliente(clienteId){
        try {
            return await Pedido.findOne({ where: { clienteId: clienteId }})
        } catch (error){
            throw error
        }
    }

    async editarPedido(id, clienteId, dataPedido, status){
        try {
            const pedidoData = {
                clienteId: clienteId,
                dataPedido: dataPedido,
                status: status
            }
            const pedidoAtt = await Pedido.update(pedidoData, { where: { id: id }})
            return pedidoAtt
        } catch (error){
            throw 'Erro ao editar pedido: ' + error
        }
    }

    async deletarPedido(id){
        try {
            return await Pedido.destroy({ where: { id: id }})
        } catch (error){
            throw 'Erro ao deletar pedido: ' + error
        }
    }
}

module.exports = PedidoService