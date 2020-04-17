const express = require('express');
const conectarDB = require('./config/db.js');

// Crear el servidor
const app = express();

// Conectar a la db
conectarDB();

// Habilitar express.json
app.use(express.json({extended: true}));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar server
app.listen(PORT, () =>{
  console.log("Servidor funcionando en el puerto "+PORT);
})
