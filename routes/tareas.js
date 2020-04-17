// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator')

// Crea una tarea api/tareas
router.post('/',
  auth,
  [
    check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
    check('proyecto', 'Es obligatorio').not().isEmpty()

  ],
  tareaController.crearTarea
);

module.exports = router;
