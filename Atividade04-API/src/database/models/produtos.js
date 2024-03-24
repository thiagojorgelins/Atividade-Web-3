const { sequelize, DataTypes } = require('../db')
const ItensPedido = require('./itensPedido')

const Produtos = sequelize.define('Produto', {
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
})

Produtos.hasMany(ItensPedido, { foreignKey: 'produtoId' })
module.exports = Produtos