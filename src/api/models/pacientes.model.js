//Modelo de Pacientes

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pacientesSchema = new Schema(
    {
        nombre: {type: String, required: true},
        habitacion:[{type: Schema.Types.ObjectId, ref: "habitaciones"}],
        telefono: {type: Number, required: true},       
        descripcion: {type: String, required: true},        
    },{
        timestamps: true
    }
)

const Paciente = mongoose.model('Pacientes', pacientesSchema);
module.exports = Paciente;