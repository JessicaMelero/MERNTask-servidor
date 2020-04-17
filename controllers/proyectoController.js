const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async(req,res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()})
  }

  try {
    // Crear proyecto
    const proyecto = new Proyecto(req.body);

    // Guardar el creador via jwt
    proyecto.creador = req.usuario.id;

    // Guardamos proyecto
    proyecto.save();
    res.json(proyecto);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req,res) => {
  try {
    const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
    res.json({proyectos});
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
// Actualizar un proyecto
exports.actualizarProyecto = async(req,res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()})
  }

  // Extraer la info del proyecto
  const {nombre} = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    // Revisar el ID
    let proyecto = await Proyecto.findById(req.params.id);
    // Proyecto existe (s/n)
    if (!proyecto) {
      return res.status(404).json({msg: 'Proyecto no encontrado'})
    }
    // Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send({msg: 'No autorizado'});
    }
    // Actualizar
    proyecto = await Proyecto.findOneAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});
    res.json({proyecto});
  } catch (error) {
    console.log(error);
    res.status(500).send({msg:'Error en el servidor'});
  }
}
