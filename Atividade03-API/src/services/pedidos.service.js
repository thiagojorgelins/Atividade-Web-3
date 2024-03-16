const connection = require('../database/db')

class PedidoService{
    async createPedido(id_cliente, data_pedido, status){
        try {
            const query = 'insert into Pedidos (id_cliente, data_pedido, status) values (?, ?, ?)'
            const [results] = await connection.promise().query(query, [id_cliente, data_pedido, status])
            return { id: results.insertId, id_cliente, data_pedido, status}
        } catch(error){
            throw 'Erro ao criar pedido: ' + error.message
        }
    }

    async exibirTodosPedidos(){
        try {
            const query = 'select * from Pedidos'
            const [results] = await connection.promise().query(query)
            return results
        } catch (error){
            throw error
        }
    }

    async exibirPedidoPeloId(id){
        try {
            const query = 'select * from Pedidos where id = ?'
            const [results] = await connection.promise().query(query, [id])
            return results[0]
        } catch (error){
            throw error
        }
    }

    async exibirPedidoPeloIdCliente(id_cliente){
        try {
            const query = 'select * from Pedidos where id_cliente = ?'
            const [results] = await connection.promise().query(query, [id_cliente])
            return results
        } catch (error){
            throw error
        }
    }

    async editarPedido(id, id_cliente, data_pedido, status){
        try {
            const query = 'update Pedidos set id_cliente = ?, data_pedido = ?, status = ? where id = ?'
            await connection.promise().query(query, [id_cliente, data_pedido, status, id])
            return { id, id_cliente, data_pedido, status }
        } catch (error){
            throw 'Erro ao editar pedido: ' + error.message
        }
    }

    async deletarPedido(id){
        try {
            const query = 'delete from Pedidos where id = ?'
            await connection.promise().query(query, [id])
        } catch (error){
            throw 'Erro ao deletar pedido: ' + error.message
        }
    }
}

module.exports = PedidoService