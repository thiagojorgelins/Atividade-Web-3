const connection = require('../database/db');

class ItensPedidoService{
    async createItensPedido(id_pedido, id_produto, quantidade, preco_unitario){
        try {
            const query = 'insert into ItensPedido (id_pedido, id_produto, quantidade, preco_unitario) values (?, ?, ?, ?)'
            const [results] = await connection.promise().query(query, [id_pedido, id_produto, quantidade, preco_unitario])
            return { id: results.insertId, id_pedido, id_produto, quantidade, preco_unitario}
        } catch(error){
            throw 'Erro ao criar item de pedido: ' + error.message
        }
    }

    async exibirItensPedidoPeloId(id){
        try {
            const query = 'select * from ItensPedido where id = ?'
            const [results] = await connection.promise().query(query, [id])
            return results[0]
        } catch (error){
            throw error
        }
    }

    async exibirItensPedidoPeloIdPedido(id_pedido){
        try {
            const query = 'select * from ItensPedido where id_pedido = ?'
            const [results] = await connection.promise().query(query, [id_pedido])
            return results
        } catch (error){
            throw error
        }
    }

    async editarItensPedido(id, id_pedido, id_produto, quantidade, preco_unitario){
        try {
            const query = 'update ItensPedido set id_pedido = ?, id_produto = ?, quantidade = ? , preco_unitario = ? , where id = ?'
            await connection.promise().query(query, [id_pedido, id_produto, quantidade,preco_unitario, id])
            return { id, id_pedido, id_produto, quantidade }
        } catch (error){
            throw 'Erro ao editar item de pedido: ' + error.message
        }
    }

    async deletarItensPedido(id){
        try {
            const query = 'delete from ItensPedido where id = ?'
            await connection.promise().query(query, [id])
        } catch (error){
            throw 'Erro ao deletar item de pedido: ' + error.message
        }
    }
}

module.exports = ItensPedidoService;