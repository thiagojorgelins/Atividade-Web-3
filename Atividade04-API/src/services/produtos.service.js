const Produtos = require('../database/models/produtos.js')
const { Op } = require('sequelize')
class ProdutoService {
    async createProduto(nome, descricao, preco, categoriaId, disponivel) {
        try {
            const produtoData = {
                nome: nome,
                descricao: descricao,
                preco: preco,
                categoriaId: categoriaId,
                disponivel: disponivel
            }
            const produto = await Produtos.create(produtoData)
            return produto
        } catch (error) {
            throw 'Erro ao criar produto: ' + error
        }
    }

    async exibirTodosProdutos() {
        try {
            return await Produtos.findAll()
        } catch (error) {
            throw error
        }
    }

    async exibirProdutoPeloId(id) {
        try {
            return await Produtos.findByPk(id)
        } catch (error) {
            throw error
        }
    }

    async exibirProdutosPelaCategoria(categoriaId) {
        try {
            return await Produtos.findAll({ where: { categoriaId: categoriaId } })
        } catch (error) {
            throw error
        }
    }

    async exibirProdutosPeloNome(nome) {
        try {
            const produtos = await Produtos.findAll({
                where: {
                    nome: {
                        [Op.substring]: nome
                    }
                }
            })
            return produtos
        } catch (error) {
            throw error
        }
    }

    async exibirProdutosPeloPreco(precoMin, precoMax) {
        try {
            const produtos = await Produtos.findAll({
                where: {
                    preco: {
                        [Op.between]: [precoMin, precoMax]
                    }
                },
                order: [['preco', 'ASC']]
            });
            return produtos;
        } catch (error) {
            throw error;
        }
    }

    editarProduto = async (id, nome, descricao, preco, categoriaId, disponivel) => {
        try {
            const produtoData = {
                nome: nome,
                descricao: descricao,
                preco: preco,
                categoriaId: categoriaId,
                disponivel: disponivel
            }
            const produtoAtt = await Produtos.update(produtoData, { where: { id: id } })
            return produtoAtt
        } catch (error) {
            throw error
        }
    }

    async deletarProduto(id) {
        try {
            return await Produtos.destroy({ where: { id: id } })
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProdutoService