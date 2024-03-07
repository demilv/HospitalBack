//Modelo de Usuarioss

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const usuariosSchema = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        correo: {type: String, required: true},
        nombre: {type: String, required: true},  
    },{
        timestamps: true
    }
)

usuariosSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Usuario = mongoose.model('Usuarios', usuariosSchema);
module.exports = Usuario;