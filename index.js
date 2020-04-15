const express = require('express');
const conectarDB = require('./config/db.js');

// Crear el servidor
const app = express();

// Conectar a la db
conectarDB();

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Arrancar server
app.listen(PORT, () =>{
  console.log("Servidor funcionando en el puerto "+PORT);
})
