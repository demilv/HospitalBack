const express = require('express');
const {getAllRooms, setNewRoom, updateRoom, deleteRoom, wingRoom} = require('../controllers/habitaciones.controller');
const router = express.Router();

router.get("/", getAllRooms)

router.post("/newRoom", setNewRoom)

router.put("/upRoom/:id", updateRoom)

router.delete("/delRoom/:id", deleteRoom)

router.get("/wingRoom/:ala", wingRoom)


module.exports = router;