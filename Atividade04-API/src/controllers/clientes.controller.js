const ClienteService = require('../services/clientes.service')
class ClienteController {
    constructor() {
        this.clienteService = new ClienteService()
    }

    createCliente = async (req, res) => {
        const { nome, email, telefone, logradouro, bairro, cidade, complemento, numero } = req.body;
        try {
            if (!nome || !email || !telefone) {
                return res.status(500).json({ erro: 'Dados inválidos' });
            }
            const findCliente = await this.clienteService.exibirClientePeloEmail(email);
            if (findCliente) {
                res.status(400).json({ erro: 'Cliente já cadastrado!' })
            } else {
                const cliente = await this.clienteService.createCliente(
                    nome, email, telefone, logradouro, bairro, cidade, complemento, numero
                );
                res.status(201).json({ msg: 'Cliente cadastrado com sucesso!', cliente });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    };

    exibirTodosClientes = async (req, res) => {
        try {
            const clientes = await this.clienteService.exibirTodosClientes()
            res.status(200).json(clientes)
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirClientePeloId = async (req, res) => {
        try {
            const { id } = req.params
            const cliente = await this.clienteService.exibirClientePeloId(id)
            if (cliente == undefined) {
                res.status(404).json({ erro: 'Cliente não encontrado!' })
            } else {
                res.status(200).json(cliente)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirEnderecoCliente = async (req, res) => {
        try {
            const { id } = req.params
            const endereco = await this.clienteService.exibirEnderecoCliente(id)
            if (endereco == undefined) {
                res.status(404).json({ erro: 'Endereço não encontrado!' })
            } else {
                res.status(200).json(endereco)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
    
    exibirClientePeloEmail = async (req, res) => {
        try {
            const { email } = req.params
            const cliente = await this.clienteService.exibirClientePeloEmail(email)
            if (cliente == undefined) {
                res.status(404).json({ erro: 'Cliente não encontrado!' })
            } else {
                res.status(200).json(cliente)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    editarCliente = async (req, res) => {
        const { id } = req.params
        const { nome, email, endereco, telefone } = req.body
        try {
            const cliente = await this.clienteService.exibirClientePeloId(id)
            if (cliente == undefined) {
                res.status(404).json({ erro: 'Cliente não encontrado!' })
            } else {
                const clienteEditado = await this.clienteService.editarCliente(id, nome, email, endereco, telefone)
                res.status(200).json({ msg: 'Cliente editado com sucesso!', clienteEditado })
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    editarEnderecoCliente = async (req, res) => {
        const { id } = req.params
        const { logradouro, bairro, cidade, complemento, numero } = req.body
        try {
            const cliente = await this.clienteService.exibirClientePeloId(id)
            if (cliente == undefined) {
                res.status(404).json({ erro: 'Cliente não encontrado!' })
            } else {
                const enderecoEditado = await this.clienteService.editarEnderecoCliente(id, logradouro, bairro, cidade, complemento, numero)
                res.status(200).json({ msg: 'Endereço editado com sucesso!', enderecoEditado })
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    deletarCliente = async (req, res) => {
        const { id } = req.params
        try {
            const cliente = await this.clienteService.exibirClientePeloId(id)
            if (cliente == undefined) {
                res.status(404).json({ erro: 'Cliente não encontrado!' })
            } else {
                await this.clienteService.deletarCliente(id)
                res.status(200).json({ msg: 'Cliente deletado com sucesso!' })
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
}

module.exports = ClienteController