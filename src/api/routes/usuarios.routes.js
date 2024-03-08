const express = require('express');
const {getAllUsuarios, setNewUsuario, updateUsuario, deleteUsuario, Login} = require('../controllers/usuarios.controller');
const router = express.Router();

router.get("/", getAllUsuarios)

router.post("/newUser", setNewUsuario)

router.put("/upUser/:id", updateUsuario)

router.delete("/delUser/:id", deleteUsuario)

router.get("/Login", Login)



module.exports = router;