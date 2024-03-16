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

    async exibirTodosProdutos(){
        try {
            const query = 'select * from Produtos'
            const [results] = await connection.promise().query(query)
            return results
        } catch (error){
            throw error
        }
    }

    async exibirProdutoPeloId(id){
        try {
            const query = 'select * from Produtos where id = ?'
            const [results] = await connection.promise().query(query, [id])
            return results[0]
        } catch (error){
            throw error
        }
    }
    
    async exibirProdutosPelaCategoria(id_categoria){
        try {
            const query = 'select * from Produtos where id_categoria = ?'
            const [results] = await connection.promise().query(query, [id_categoria])
            return results
        } catch (error){
            throw error
        }
    }

    async exibirProdutosPeloNome(nome){
        try { 
            const query = 'select * from Produtos where nome like ?'
            const [results] = await connection.promise().query(query, [`%${nome}%`])
            return results
        } catch (error){    
            throw error
        }
    }

    async exibirProdutosPeloPreco(precoMin, precoMax) {
        try {
            const query = 'select * from Produtos where preco between ? and ? order by preco asc'
            const [results] = await connection.promise().query(query, [precoMin, precoMax])
            return results
        } catch (error) {
            throw error
        }
    }
    

    async deletarProduto(id){
        try {
            const query = 'delete from Produtos where id = ?'
            await connection.promise().query(query, [id])
        } catch (error){
            throw error
        }
    }
}

module.exports = ProdutoService