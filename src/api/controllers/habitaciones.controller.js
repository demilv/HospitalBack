const Room = require("../models/habitaciones.model");

//Devuelve los habitaciones
const getAllRooms = async(req, res) =>{
    try{
        const allRooms = await Room.find()
        return res.json(allRooms)
    }catch(error){
        console.log(error);
    }
};

//Añadir habitacion
const setNewRoom = async(req, res) => {
    try{
        const newRoom = new Room(req.body);
        const createdRoom = await newRoom.save();
        try {
            console.log("Datos recibidos:", req.body); // Agrega esta línea para verificar los datos recibidos
            // Resto del código para guardar el room...
        } catch (error) {
            // Manejo de errores...
        }
        return res.status(200).json(createdRoom);        
        
    }catch(error) {
        return res.status(500).json(error)
    }
}
//Update de habitacion
const updateRoom = async(req, res) =>{
    try{
        const {id} = req.params
        // console.log(id)
        const updateRoom = new Room(req.body)
        updateRoom._id = id;
        const updateEj = await Room.findByIdAndUpdate(id, updateRoom, {new: true});
        return res.status(200).json(updateEj)
    }catch (error){
        return res.status(500).json(error)

    }
}
//Delete de habitacion
const deleteRoom = async(req, res) =>{
    try {
        const {id} = req.params
        const deleteRoom = await Room.findByIdAndDelete(id);
        if(!deleteRoom){
            return res.status(404).json({message: "Habitacion no encontrada"})
        }
        return res.status(200).json(deleteRoom)
    }catch (error) {
        return res.status(500).json(error)
    }
}

//Pedir habitacion de un ala
const wingRoom = async (req, res) => {
    try {
        const { ala } = req.params;
        const wingRooms = await Room.find({ ala: ala }).sort({numero: 1});
        return res.status(200).json(wingRooms);
    } catch (error) {       
        return res.status(500).json(error);
    }
}


module.exports = {getAllRooms, setNewRoom, updateRoom, deleteRoom, wingRoom};