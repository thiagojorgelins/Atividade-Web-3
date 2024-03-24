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
      res.status(500).json({ erro: 'Erro ao tentar criar a categoria' })
    }

  }

  exibirCategoriaPeloId = async (req, res) => {
    const { id } = req.params
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
      res.status(500).json({ erro: 'Erro ao obter categorias' })
    }

  }

  
  editarCategoria = async (req, res) => {
    const { id } = req.params
    const { nome, descricao } = req.body
    try {
        let categoria = await this.categoriaService.exibirCategoriaPeloId(id)
        console.log(categoria)
        if (categoria == undefined) {
            return res.status(404).json({ erro: 'Categoria não encontrada!' })
        } else {
          await this.categoriaService.editarCategoria(id, nome, descricao)
          return res.status(200).json({ msg: 'Categoria editada com sucesso!'})
        }
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao tentar editar categoria' })
    }
}


  deletarCategoria = async (req, res) => {
    const { id } = req.params
    const categoria = await this.categoriaService.exibirCategoriaPeloId(id)
    try {
      if (categoria == undefined) {
        res.status(404).json({ erro: 'Categoria não encontrada!' })
      } else {
        await this.categoriaService.deletarCategoria(id)
        return res.status(200).json({ msg: 'Categoria deletada com sucesso!'})
      }

    } catch (error) {
      return res.status(500).json({ erro: 'Internal server error' })
    }

  }

}

module.exports = CategoriaController