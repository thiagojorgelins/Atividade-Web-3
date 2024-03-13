const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

connection.connect((error) => {
    if (error){
        console.error(error.message)
    } else{
        console.log("Database connect successfully")
    }
        
})

module.exports = connection