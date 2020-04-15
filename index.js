const express = require('express');

// Crear el servidor
const app = express();

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Arrancar server
app.listen(PORT, () =>{
  console.log("Servidor funcionando en el puerto "+PORT);
})
