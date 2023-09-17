const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Paciente = require('../api/models/pacientes.model');
const Habitacion = require('../api/models/habitaciones.model');
dotenv.config();

const arraypacientes = [
  {
    nombre: "Juan Pérez",
    telefono: 5551234567,
    descripcion: "Fractura de pierna izquierda",
  },
  {
    nombre: "María López",
    telefono: 5559876543,
    descripcion: "Gripe común",
  },
  {
    nombre: "Carlos Rodríguez",
    telefono: 5552345678,
    descripcion: "Cirugía de apendicitis",
  },
  {
    nombre: "Ana Martínez",
    telefono: 5558765432,
    descripcion: "Observación postoperatoria",
  },
  {
    nombre: "David García",
    telefono: 5553456789,
    descripcion: "Tratamiento de hipertensión arterial",
  },
];


const DBURL1 = process.env.DBURL;

mongoose.connect(DBURL1)
  .then(async () => {
    const habitacionesDisponibles = await Habitacion.find();
    if (habitacionesDisponibles.length > 0) {
      await Paciente.collection.drop();
      console.log("Pacientes borrados");

      const pacientesConHabitacion = [];
      const habitacionesAsignadas = new Set();

      while (habitacionesDisponibles.length > 0) {
        const randomIndex = Math.floor(Math.random() * habitacionesDisponibles.length);
        const habitacionAsignada = habitacionesDisponibles.splice(randomIndex, 1)[0];

        if (!habitacionesAsignadas.has(habitacionAsignada._id)) {
          const paciente = arraypacientes.shift();
          if (paciente) {
            paciente.habitacion = habitacionAsignada._id;
            pacientesConHabitacion.push(paciente);
            habitacionesAsignadas.add(habitacionAsignada._id);

            await Habitacion.findByIdAndUpdate(habitacionAsignada._id, { ocupada: true });
          }
        }
      }

      await Paciente.insertMany(pacientesConHabitacion);
      console.log("Pacientes insertados");
    } else {
      console.error("No hay habitaciones disponibles para asignar a pacientes.");
    }
  })
  .catch((error) => console.log(`Error conectando a la base de datos: ${error}`))
  .finally(() => mongoose.disconnect());



