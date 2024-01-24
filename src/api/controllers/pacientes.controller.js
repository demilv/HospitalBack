const Paciente = require("../models/pacientes.model");
const Habitacion = require("../models/habitaciones.model");

//Devuelve los pacientes
const getAllPacientes = async(req, res) =>{
    try{
        const allPacientes = await Paciente.find()
        return res.json(allPacientes)
    }catch(error){
        console.log(error);
    }
};

//Devuelve los pacientes
const getOnePaciente = async(req, res) =>{
    try{
        const {id} = req.params
        const FoundPaciente = await Paciente.findById(id)
        return res.json(FoundPaciente)
    }catch(error){
        console.log(error);
    }
};

//Añadir paciente
const setNewPaciente = async(req, res) => {
    try{
        const newPaciente = new Paciente(req.body);
        const allHabitaciones = await Habitacion.find();       
        const habitacionesNoOcupadas = allHabitaciones.filter(habitacion => !habitacion.ocupada);

        if (habitacionesNoOcupadas.length > 0) {
            const habitacionAleatoria = habitacionesNoOcupadas[Math.floor(Math.random() * habitacionesNoOcupadas.length)];
            newPaciente.habitacion = habitacionAleatoria._id;
            await Habitacion.updateOne({ _id: habitacionAleatoria._id }, { ocupada: true });
        } else {
            console.log('No hay habitaciones disponibles');
        }
            
        const createdPaciente = await newPaciente.save();
        try {
            console.log("Datos recibidos:", req.body); 
        } catch (error) {
            // Manejo de errores...
        }
        return res.status(200).json(createdPaciente);        
        
    }catch(error) {
        return res.status(500).json(error)
    }
}
//Update de paciente
const updatePaciente = async(req, res) =>{
    try{
        const {id} = req.params
        // console.log(id)
        const updatePaciente = new Paciente(req.body)
        updatePaciente._id = id;
        const updateEj = await Paciente.findByIdAndUpdate(id, updatePaciente, {new: true});
        return res.status(200).json(updateEj)
    }catch (error){
        return res.status(500).json(error)

    }
}
//Delete de paciente
const deletePaciente = async(req, res) =>{
    try {
        const {id} = req.params
        const deletePaciente = await Paciente.findByIdAndDelete(id);
        if(!deletePaciente){
            return res.status(404).json({message: "Paciente no encontrado"})
        }
        return res.status(200).json(deletePaciente)
    }catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {getAllPacientes, setNewPaciente, updatePaciente, deletePaciente, getOnePaciente};