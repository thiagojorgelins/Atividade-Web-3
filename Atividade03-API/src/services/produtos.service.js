const connection = require('../database/db')

class ProdutoService{
    async createProduto(nome, descricao, preco, id_categoria, disponivel){
        try {
            const query = 'insert into Produtos (nome, descricao, preco, id_categoria, disponivel) values (?, ?, ?, ?, ?)'
            const [results] = await connection.promise().query(query, [nome, descricao, preco, id_categoria, disponivel])
            return { id: results.insertId, nome, descricao, preco, id_categoria, disponivel }
        } catch (error){
            throw 'Erro ao criar produto: ' + error.message
        }
    }

    async exibirTodosProdutos(){}

    async exibirProdutoPorId(){}

    async deletarProduto(){}
}

module.exports = ProdutoService