const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

// Crea una nueva tarea
exports.crearTarea = async(req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()})
  }
  // Extraer proyecto y comprobar si existe
  const {proyecto} = req.body;
  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Revisar si el proyecto actual pretenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send({msg: 'No autorizado'});
    }

    // Crear tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({tarea});

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

// Obtiene las tarear por proyecto
exports.obtenerTareas = async(req, res) => {
  try {
    // Extraer proyecto y comprobar si existe
    const {proyecto} = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Revisar si el proyecto actual pretenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send({msg: 'No autorizado'});
    }

    // Obtener tarea por proyecto
    const tareas = await Tarea.find({proyecto});
    res.json({tareas});

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
// Actualizar tareas
exports.actualizarTareas = async(req,res) => {
  try {
    // Extraer proyecto y comprobar si existe
    const {proyecto, nombre, estado} = req.body;

    // Revisar si la tarea existe
    let tarea = await Tarea.findById({_id: req.params.id});

    if (!tarea) {
      return res.status(404).send({msg: 'No existe tarea'});
    }

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pretenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send({msg: 'No autorizado'});
    }

    // Crear objeto con nueva info
    const nuevaTarea = {};
    if (nombre) nuevaTarea.nombre = nombre;
    if (estado) nuevaTarea.estado = estado;

    // Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
    res.json({tarea});

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
