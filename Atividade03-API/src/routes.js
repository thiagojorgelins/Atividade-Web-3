const express = require("express")
const categoriaRoutes = require("./routes/categorias.routes")

const router = express.Router()

router.use(categoriaRoutes)

module.exports = router