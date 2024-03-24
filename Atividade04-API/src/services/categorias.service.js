const Categoria = require('../database/models/categorias.js')

class CategoriaService {
    async createCategorias(nome, descricao) {
        try {
            const categoriaData = {
                nome: nome,
                descricao: descricao
            }
            const categoria = await Categoria.create(categoriaData)
            return categoria
        } catch (error) {
            throw 'Erro ao criar categoria: ' + error
        }
    }

    async exibirTodasCategorias() {
        try {
            return await Categoria.findAll()
        } catch (error) {
            throw error
        }
    }

    async exibirCategoriaPeloId(id) {
        try {
            return await Categoria.findByPk(id)
        } catch (error) {
            throw error
        }
    }

    async editarCategoria(id, nome, descricao) {
        try {
            const categoriaData = {
                nome: nome,
                descricao: descricao
            }
            const categoriaAtt = Categoria.update(categoriaData, { where: { id: id } })
            return categoriaAtt
        } catch (error) {
            throw error
        }
    }

    async deletarCategoria(id) {
        try {
            return await Categoria.destroy({ where: { id: id } })
        } catch (error) {
            throw error
        }
    }
}

module.exports = CategoriaService;