const Usuario = require("../models/usuarios.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Devuelve los usuarios
const getAllUsuarios = async(req, res) =>{
    try{
        const allUsuarios = await Usuario.find()
        return res.json(allUsuarios)
    }catch(error){
        console.log(error);
    }
};

//Añadir usuario
const setNewUsuario = async(req, res) => {
    try{
        const newUsuario = new Usuario(req.body);
        const createdUsuario = await newUsuario.save();
        try {
            console.log("Datos recibidos:", req.body); // Agrega esta línea para verificar los datos recibidos
            // Resto del código para guardar el usuario...
        } catch (error) {
            // Manejo de errores...
        }
        return res.status(200).json(createdUsuario);        
        
    }catch(error) {
        return res.status(500).json(error)
    }
}
//Update de usuario
const updateUsuario = async(req, res) =>{
    try{
        const {id} = req.params
        // console.log(id)
        const updateUsuario = new Usuario(req.body)
        updateUsuario._id = id;
        updateUsuario.password = req.body.password;
        if (updateUsuario.password) {
            // Si la contraseña se envía en la solicitud, encriptarla antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(updateUsuario.password, 10);
            updateUsuario.password = hashedPassword
        }
        const updateUser = await Usuario.findByIdAndUpdate(id, updateUsuario, {new: true});
        return res.status(200).json(updateUser)
    }catch (error){
        return res.status(500).json(error)

    }
}
//Delete de usuario
const deleteUsuario = async(req, res) =>{
    try {
        const {id} = req.params
        const deleteUser = await Usuario.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({message: "Usuario no encontrado"})
        }
        return res.status(200).json(deleteUser)
    }catch (error) {
        return res.status(500).json(error)
    }
}

//Comprobacion de los datos del login
const Login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Usuario.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ userId: user._id }, 'logueado', { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = {getAllUsuarios, setNewUsuario, updateUsuario, deleteUsuario, Login};