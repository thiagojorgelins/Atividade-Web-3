const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3333
const routes = require('./routes')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.get("/", (req, res) => {
    res.send("Página inicial")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
