const express = require('express');
const conectarDB = require('./config/db.js');
const cors = require('cors');

// Crear el servidor
const app = express();

// Conectar a la db
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}));

// Puerto de la app
const port = process.env.port || 4000;

// Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar server
app.listen(port, '0.0.0.0', () =>{
  console.log("Servidor funcionando en el puerto "+port);
})
