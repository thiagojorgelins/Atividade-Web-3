const express = require("express")
const categoriasRoutes = require("./routes/categorias.routes")
const produtosRoutes = require('./routes/produtos.routes')
const router = express.Router()

router.use(categoriasRoutes)
router.use(produtosRoutes)
module.exports = router