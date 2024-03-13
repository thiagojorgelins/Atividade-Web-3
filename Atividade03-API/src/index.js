const express = require('express')
const app = express()
const port = process.env.PORT || 3333
require('dotenv').config()

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
