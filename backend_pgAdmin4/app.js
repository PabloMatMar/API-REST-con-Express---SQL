const express = require('express');
const morgan = require('morgan');
// require('dotenv').config()

// Módulos de Rutas
const entriesApiRoutes = require('./routes/entriesApiRoutes');
const authorsApiRoutes = require('./routes/authorsApiRoutes');

const app = express()
const port = 3000


// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('content', { msj: "This is a API-RES" })
})

//Rutas 
app.use('/api/entries',entriesApiRoutes);// Rutas API entries
app.use('/api/authors',authorsApiRoutes); // Rutas API authors

app.listen(port, () => {
    console.log("Estoy en el puerto 3000")
})