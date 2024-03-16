const express = require("express")
const categoriasRoutes = require("./routes/categorias.routes")
const produtosRoutes = require('./routes/produtos.routes')
const clientesRoutes = require('./routes/clientes.routes')
const pedidosRoutes = require('./routes/pedidos.routes')
const itensPedidos = require('./routes/itensPedidos.routes')
const router = express.Router()

router.use(categoriasRoutes)
router.use(produtosRoutes)
router.use(clientesRoutes)
router.use(pedidosRoutes)
router.use(itensPedidos)

module.exports = router