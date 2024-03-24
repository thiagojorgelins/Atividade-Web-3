const { sequelize, DataTypes } = require('../db')
const Produtos = require('./produtos')

const Categoria = sequelize.define('Categoria', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.TEXT
    }
})

Categoria.hasMany(Produtos, { foreignKey: 'categoriaId' })  
module.exports = Categoria