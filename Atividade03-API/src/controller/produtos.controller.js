const CategoriaService = require('../services/categorias.service')
const ProdutoService = require('../services/produtos.service')

class ProdutoController {
    constructor() {
        this.produtoService = new ProdutoService()
        this.categoriaService = new CategoriaService()
    }

    createProduto = async (req, res) => {
        const { nome, descricao, preco, id_categoria, disponivel } = req.body
        try {
            const categoria = await this.categoriaService.exibirCategoriaPeloId(id_categoria)
            if (categoria == undefined) {
                res.status(400).json({ msg: 'Categoria não existe!' })
            } else {
                const produto = await this.produtoService.createProduto(nome, descricao, preco, id_categoria, disponivel)
                res.status(201).json({ msg: 'Produto cadastrado com sucesso!', produto })
            }
            
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    }
}

module.exports = ProdutoController