const Clientes = require('../database/models/clientes.js')
const Endereco = require('../database/models/endereco.js')
class ClienteService {
    async createCliente(nome, email, telefone, logradouro, bairro, cidade, complemento, numero){
        try {
            const clienteData = {
                nome: nome,
                email: email,
                telefone: telefone
            }
            const cliente = await Clientes.create(clienteData)
            
            const enderecoData = {
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                complemento: complemento,
                numero: numero,
                clienteId: cliente.id
            }
            const endereco = await Endereco.create(enderecoData)
            return {cliente: cliente, endereco: endereco }
        } catch(error){
            throw 'Erro ao criar cliente: ' + error
        }
    }

    async exibirTodosClientes(){
        try {
            return await Clientes.findAll()
        } catch (error){
            throw error
        }
    }

    async exibirClientePeloId(id){
        try {
            return await Clientes.findByPk(id)
        } catch (error){
            throw error
        }
    }

    async exibirEnderecoCliente(id){
        try {
            return await Endereco.findOne({ where: { clienteId: id }})
        } catch (error){
            throw error
        }
    }
    
    async exibirClientePeloEmail(email){
        try {
            return await Clientes.findOne({ where: { email: email}})
        } catch (error){
            throw error
        }
    }

    async editarCliente(id, nome, email, telefone){
        try {
            const clienteData = {
                nome: nome,
                email: email,
                telefone: telefone
            }
            const cliente = await Clientes.create(clienteData, { where: { id: id }})
            return cliente
        } catch (error){
            throw 'Erro ao editar cliente: ' + error
        }
    }

    async editarEnderecoCliente(id, logradouro, bairro, cidade, complemento, numero){
        try {
            const enderecoData = {
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                complemento: complemento,
                numero: numero
            }
            const enderecoAtt = await Endereco.update(enderecoData, { where: { clienteId: id }})
            return enderecoAtt
        } catch (error){
            throw 'Erro ao editar endereço do cliente: ' + error
        }
    }

    async deletarCliente(id){
        try {
            return await Clientes.destroy({ where: { id: id }})
        } catch (error){
            throw 'Erro ao deletar cliente: ' + error
        }
    }
}

module.exports = ClienteService