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
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()

  ],
  tareaController.crearTarea
);

// Obtener tareas de proyecto
router.get('/',
  auth,
  tareaController.obtenerTareas
)

// Actualizar tareas de proyecto
router.put('/:id',
  auth,
  tareaController.actualizarTareas
)

module.exports = router;
