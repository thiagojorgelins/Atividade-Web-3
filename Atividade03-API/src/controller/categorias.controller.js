const CategoriaService = require('../services/categorias.service')

class CategoriaController {

  constructor() {
    this.categoriaService = new CategoriaService()
  }

  createCategoria = async (req, res) => {
    const { nome, descricao } = req.body
    try {
      const categoria = await this.categoriaService.createCategorias(nome, descricao)
      res.status(201).json({ msg: 'Categoria cadastrada com sucesso!', categoria })
    } catch (error) {
      res.status(500).json({ erro: error })
    }

  }

  exibirCategoriaPeloId = async (req, res) => {
    const id = req.params.id
    try {
      const categoria = await this.categoriaService.exibirCategoriaPeloId(id)
      return res.status(200).json(categoria)
    } catch (error) {
      return res.status(500).json({ erro: 'Internal server error' })
    }
  }

  exibirTodasCategorias = async (req, res) => {
    try {
      const categorias = await this.categoriaService.exibirTodasCategorias()
      res.json(categorias)
    } catch (error) {
      console.error('Erro ao obter categorias:', error)
      res.status(500).json({ error: 'Erro ao obter categorias' })
    }

  }

  deletarCategoria = async (req, res) => {
    const id = req.params.id
    const categoria = await this.categoriaService.exibirCategoriaPeloId(id)
    try {
      if (categoria === undefined) {
        res.status(404).json({ erro: 'Categoria não encontrada!' })
        return
      }

    } catch (error) {
      return res.status(500).json({ erro: 'Internal server error' })
    }
    await this.categoriaService.deletarCategoria(id)
    return res.status(200).json({ msg: 'Categoria deletada com sucesso!', categoria: categoria })
  }

}

module.exports = CategoriaController