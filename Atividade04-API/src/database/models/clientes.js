const { sequelize, DataTypes } = require('../db')
const Endereco = require('./endereco')
const Pedido = require('./pedidos')

const Cliente = sequelize.define('Cliente', {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
})

Cliente.hasOne(Endereco, {
  foreignKey: 'clienteId',
})
Cliente.hasMany(Pedido, {
  foreignKey: 'clienteId',
})

module.exports = Cliente