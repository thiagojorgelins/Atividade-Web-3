const { sequelize, DataTypes } = require('../db')

const Pedido = sequelize.define('Pedido', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

module.exports = Pedido