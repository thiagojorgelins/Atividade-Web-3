const connection = require('../database/db');

class ClienteService {
    async createCliente(nome, email, endereco, telefone){
        try {
            const query = 'insert into Clientes (nome, email, endereco, telefone) values (?, ?, ?, ?)'
            const [results] = await connection.promise().query(query, [nome, email, endereco, telefone])
            return { id: results.insertId, nome, email, endereco, telefone}
        } catch(error){
            throw 'Erro ao criar cliente: ' + error.message
        }
    }

    async exibirTodosClientes(){
        try {
            const query = 'select * from Clientes'
            const [results] = await connection.promise().query(query)
            return results
        } catch (error){
            throw error
        }
    }

    async exibirClientePeloId(id){
        try {
            const query = 'select * from Clientes where id = ?'
            const [results] = await connection.promise().query(query, [id])
            return results[0]
        } catch (error){
            throw error
        }
    }

    async exibirClientePeloEmail(email){
        try {
            const query = 'select * from Clientes where email = ?'
            const [results] = await connection.promise().query(query, [email])
            return results[0]
        } catch (error){
            throw error
        }
    }

    async editarCliente(id, nome, email, endereco, telefone){
        try {
            const query = 'update Clientes set nome = ?, email = ?, endereco = ?, telefone = ? where id = ?'
            await connection.promise().query(query, [nome, email, endereco, telefone, id])
            return { id, nome, email, endereco, telefone }
        } catch (error){
            throw 'Erro ao editar cliente: ' + error.message
        }
    }

    async deletarCliente(id){
        try {
            const query = 'delete from Clientes where id = ?'
            await connection.promise().query(query, [id])
        } catch (error){
            throw 'Erro ao deletar cliente: ' + error.message
        }
    }
}

module.exports = ClienteService