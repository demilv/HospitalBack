const express = require('express');
const {getAllRooms, setNewRoom, updateRoom, deleteRoom} = require('../controllers/rooms.controller');
const router = express.Router();

router.get("/", getAllRooms)

router.post("/newRoom", setNewRoom)

router.put("/upRoom/:id", updateRoom)

router.delete("/delRoom/:id", deleteRoom)



module.exports = router;