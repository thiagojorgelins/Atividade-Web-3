const express = require('express');
const mysql = require('mysql2')
const app = express()
const bodyParser = require('body-parser')
const port = 3000 || process.env.PORT

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'appmysql'
})

connection.connect((err) => {
  if(err){
    console.error(err.message)
  } else {
    console.log('Conecado no MYSQL')
  }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/users', (req, res)=>{
  const { email, senha } = req.body
  const query = 'INSERT INTO users (email, senha) VALUES (?, ?)'
  connection.query(query, [email, senha], (err, result) => {
    if (err){
      console.error('Erro ao inserir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao inserir regristros'})
    } else {
      console.log('Regristro inserido com sucesso!')
      res.status(201).json({ message: 'Regristro inserido com sucesso'})
    }
  })
})

app.get('/users', (req, res) => {
  const query = 'select * from users'
  connection.query(query, (err, results) => {
    if(err){
      console.error(err.message)
    } else{
      res.status(200).json(results)
    }
  })
})

app.put('/users/:id', (req, res) => {
  const { id } = req.params 
  const { email, senha } = req.body

  const query = 'update users set email = ?, senha = ? where id = ?'
  connection.query(query, [email, senha, id], (err, result) => {
    if(err){
      console.error(err.message)
      res.status(500).json({ error: 'Erro ao atualizar regristro'})
    } else {
      console.log('Regristro atualizado com sucesso!')
      res.status(200).json({ message: 'Registro atualizado com sucesso'})
    }
  })
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  const query = 'delete from users where id = ?'
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err.message)
      res.status(500).json({ error: 'Erro ao excluir registro'})
    } else {
      if(result.affectedRows > 0){
        console.log('Registro excluido com sucesso!')
        res.status(200).json({ message: 'Registro excluído com sucesso'})
      } else {
        console.log('Registro não encontrado.')
        res.status(404).json({ message: 'Registro não encontrado.'})
      }
    }
  })
})
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})