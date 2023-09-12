const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Paciente = require('../api/models/pacientes.model');
dotenv.config();

const arraypacientes = [
  {
    nombre: "Juan Pérez",
    alaclinica: 3,
    habitacion: 301,
    telefono: 5551234567,
    descripcion: "Fractura de pierna izquierda",
  },
  {
    nombre: "María López",
    alaclinica: 2,
    habitacion: 205,
    telefono: 5559876543,
    descripcion: "Gripe común",
  },
  {
    nombre: "Carlos Rodríguez",
    alaclinica: 1,
    habitacion: 106,
    telefono: 5552345678,
    descripcion: "Cirugía de apendicitis",
  },
  {
    nombre: "Ana Martínez",
    alaclinica: 4,
    habitacion: 402,
    telefono: 5558765432,
    descripcion: "Observación postoperatoria",
  },
  {
    nombre: "David García",
    alaclinica: 3,
    habitacion: 303,
    telefono: 5553456789,
    descripcion: "Tratamiento de hipertensión arterial",
  },
];


const DBURL1 = process.env.DBURL
mongoose.connect(DBURL1)
.then(async () => {
const allPacientes = await Paciente.find();
if(allPacientes.length > 0){
    await Paciente.collection.drop()
    console.log("Pacientes borrados")
}
})
.catch((error) => console.log(`error borrando pacientes: ${error}`))
.then(async() => {
    const PacientesMap = arraypacientes.map(paciente => new Paciente(paciente));
    await Paciente.insertMany(PacientesMap);
    console.log("Pacientes insertados")
})
.catch((error) => console.log(`error insertando pacientes: ${error}`))
.finally(()=>mongoose.disconnect());
