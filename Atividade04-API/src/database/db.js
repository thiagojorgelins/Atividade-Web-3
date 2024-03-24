const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
    dialect:  process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
})
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.')
  })
  .catch(error => {
    console.error('Erro ao sincronizar tabelas:', error)
  })
  
module.exports = {
    sequelize, DataTypes
}