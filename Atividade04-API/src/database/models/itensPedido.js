const { sequelize, DataTypes } = require("../db");
const Pedido = require("./pedidos");

const ItensPedido = sequelize.define("ItensPedido", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})

ItensPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' })
module.exports = ItensPedido;
