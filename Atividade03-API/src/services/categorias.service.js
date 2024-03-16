const connection = require('../database/db');

class CategoriaService {
    async createCategorias(nome, descricao) {
        try {
            const query = 'INSERT INTO Categorias (nome, descricao) VALUES (?, ?)'
            const [results] = await connection.promise().query(query, [nome, descricao])
            return { id: results.insertId, nome, descricao }
        } catch (error) {
            throw 'Erro ao criar categoria: ' + error.message
        }
    }

    async exibirTodasCategorias() {
        try {
            const [results] = await connection.promise().query('SELECT * FROM Categorias')
            return results
        } catch (error) {
            throw error
        }
    }

    async exibirCategoriaPeloId(id) {
        try {
            const query = 'select * from Categorias where id = ?'
            const [result] = await connection.promise().query(query, [id])
            return result[0]
        } catch (error) {
            throw error
        }
    }

    async editarCategoria(id, nome, descricao) {
        try {
            const query = 'update Categorias set nome = ?, descricao = ? where id = ?'
            return await connection.promise().query(query, [nome, descricao, id])
        } catch (error) {
            throw error
        }
    }

    async deletarCategoria(id) {
        try {
            const query = 'delete from Categorias where id = ?'
            return await connection.promise().query(query, [id])
        } catch (error) {
            throw error
        }
    }
}

module.exports = CategoriaService;