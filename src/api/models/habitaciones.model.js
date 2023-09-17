//Modelo de Habitaciones

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitacionesSchema = new Schema(
    {
        ala: {type: Number, required: true},
        numero: {type: Number, required: true},
        ocupada: {type: Boolean, required: true}    
    },{
        timestamps: true
    }
)

const Habitacion = mongoose.model('Habitaciones', habitacionesSchema);
module.exports = Habitacion;