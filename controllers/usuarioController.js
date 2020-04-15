const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => {

  // Extraer email y password
  const {email, password} = req.body;

  try {
    // Revisar usuario registrado sea unico
    let usuario = await Usuario.findOne({email});

    if (usuario) {
      return res.status(400).json({msg: "Usuario ya existente"});
    }

    // Crea nuevo usuario
    usuario = new Usuario(req.body);

    // Hasear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guarda nuevo usuario
    await usuario.save();

    // Mensaje de confirmación
    res.json({msg: "Usuario creado correctamente"});
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
}