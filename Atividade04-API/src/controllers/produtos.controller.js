const CategoriaService = require('../services/categorias.service')
const ProdutoService = require('../services/produtos.service')

class ProdutoController {
    constructor() {
        this.produtoService = new ProdutoService()
        this.categoriaService = new CategoriaService()
    }

    createProduto = async (req, res) => {
        const { nome, descricao, preco, categoriaId, disponivel } = req.body
        try {
            const categoria = await this.categoriaService.exibirCategoriaPeloId(categoriaId)
            if (categoria == undefined) {
                res.status(400).json({ msg: 'Categoria não existe!' })
            } else {
                const produto = await this.produtoService.createProduto(nome, descricao, preco, categoriaId, disponivel)
                res.status(201).json({ msg: 'Produto cadastrado com sucesso!', produto })
            }

        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirTodosProdutos = async (req, res) => {
        try {
            const produtos = await this.produtoService.exibirTodosProdutos()
            res.status(200).json(produtos)
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirProdutosPeloId = async (req, res) => {
        try {
            const { id } = req.params
            const produto = await this.produtoService.exibirProdutoPeloId(id)
            if (produto == undefined) {
                res.status(404).json({ erro: 'Produto não encontrado!' })
            } else {
                res.status(200).json(produto)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirProdutosPelaCategoria = async (req, res) => {
        try {
            const { id_categoria } = req.params
            const produtos = await this.produtoService.exibirProdutosPelaCategoria(id_categoria)
            if (produtos.length == 0) {
                res.status(404).json({ erro: 'Nenhum produto encontrado para essa categoria!' })
            } else {
                res.status(200).json(produtos)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirProdutosPeloNome = async (req, res) => {
        try {
            const { nome } = req.params
            const produtos = await this.produtoService.exibirProdutosPeloNome(nome)
            if (produtos.length == 0) {
                res.status(404).json({ erro: 'Nenhum produto encontrado para esse nome!' })
            } else {
                res.status(200).json(produtos)
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    exibirProdutosPeloPreco = async (req, res) => {
        try {
            const { precoMin, precoMax } = req.params
            const produtos = await this.produtoService.exibirProdutosPeloPreco(precoMin, precoMax);
            if (produtos.length == 0) {
                res.status(404).json({ erro: 'Nenhum produto encontrado para esse intervalo de preço!' });
            } else {
                res.status(200).json(produtos);
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    editarProduto = async (req, res) => {
        const { id } = req.params
        const { nome, descricao, preco, id_categoria, disponivel } = req.body
        try {
            const produto = await this.produtoService.exibirProdutoPeloId(id)
            if (produto == undefined) {
                res.status(404).json({ erro: 'Produto não encontrado!' })

            } else {
                const categoria = await this.categoriaService.exibirCategoriaPeloId(id_categoria)
                if (categoria == undefined) {
                    res.status(400).json({ msg: 'Categoria não existe!' })
                } else {
                    await this.produtoService.editarProduto(id, nome, descricao, preco, id_categoria, disponivel)
                    res.status(200).json({ msg: 'Produto editado com sucesso!' })
                }
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
    deletarProduto = async (req, res) => {
        try {
            const { id } = req.params
            const produto = await this.produtoService.exibirProdutoPeloId(id)
            if (produto == undefined) {
                res.status(404).json({ erro: 'Produto não encontrado!' })
            } else {
                await this.produtoService.deletarProduto(produto.id)
                res.status(200).json({ msg: 'Produto deletado com sucesso!', produto: produto })
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
}

module.exports = ProdutoController