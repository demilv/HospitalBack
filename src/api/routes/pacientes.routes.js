const express = require('express');
const {getAllPacientes, getOnePaciente, setNewPaciente, updatePaciente, deletePaciente} = require('../controllers/pacientes.controller');
const router = express.Router();

router.get("/", getAllPacientes)

router.get("/onePaciente/:id", getOnePaciente)

router.post("/newPaciente", setNewPaciente)

router.put("/upPaciente/:id", updatePaciente)

router.delete("/delPaciente/:id", deletePaciente)



module.exports = router;