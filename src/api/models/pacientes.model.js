//Modelo de Pacientes

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pacientesSchema = new Schema(
    {
        nombre: {type: String, required: true},
        alaclinica: {type: Number, required: true},
        habitacion: {type: Number, required: true},
        telefono: {type: Number, required: true},       
        descripcion: {type: String, required: true},        
    },{
        timestamps: true
    }
)

const Paciente = mongoose.model('Pacientes', pacientesSchema);
module.exports = Paciente;