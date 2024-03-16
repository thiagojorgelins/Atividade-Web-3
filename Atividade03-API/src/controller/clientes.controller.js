const ClienteService = require('../services/clientes.service')
class ClienteController {
    constructor() {
        this.clienteService = new ClienteService()
    }

    createCliente = async (req, res) => {
        const { nome, email, endereco, telefone } = req.body
        try {
            const findCliente = await this.clienteService.exibirClientePeloEmail(email)
            if (findCliente) {
                res.status(400).json({ msg: 'Cliente já cadastrado!' })
            } else {
                const cliente = await this.clienteService.createCliente(nome, email, endereco, telefone)
                res.status(201).json({ msg: 'Cliente cadastrado com sucesso!', cliente })
            }
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }

    exibirTodosClientes = async (req, res) => {
        try {
            const clientes = await this.clienteService.exibirTodosClientes()
            res.status(200).json(clientes)
        } catch (error) {
            res.status(500).json({ erro: error })
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
            res.status(500).json({ erro: error })
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
            res.status(500).json({ erro: error })
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
            res.status(500).json({ erro: error })
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
            res.status(500).json({ erro: error })
        }
    }
}

module.exports = ClienteController