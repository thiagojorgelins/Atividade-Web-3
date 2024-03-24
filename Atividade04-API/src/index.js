require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3333

const routes = require('./routes')
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
