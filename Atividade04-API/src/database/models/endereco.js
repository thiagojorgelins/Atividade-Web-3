const { sequelize, DataTypes } = require('../db')

const Endereco = sequelize.define('Endereco', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    logradouro: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING
    },
    cidade: {
        type: DataTypes.STRING
    },
    complemento: {
        type: DataTypes.TEXT
    },
    numero: {
        type: DataTypes.INTEGER
    },
})

module.exports = Endereco