const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Habitacion = require('../api/models/habitaciones.model');
dotenv.config();

const arrayhabitaciones = [];

for (let ala = 1; ala <= 4; ala++) {  
  for (let numero = 1; numero <= 6; numero++) {    
    const habitacion = {
      ala: ala,
      numero: parseInt(ala + '0' + numero),
      ocupada: false,
    };
    arrayhabitaciones.push(habitacion);
  }
}



const DBURL1 = process.env.DBURL
mongoose.connect(DBURL1)
.then(async () => {
const allHabitaciones = await Habitacion.find();
if(allHabitaciones.length > 0){
    await Habitacion.collection.drop()
    console.log("Habitaciones borrados")
}
})
.catch((error) => console.log(`error borrando habitaciones: ${error}`))
.then(async() => {
    const HabitacionesMap = arrayhabitaciones.map(habitacion => new Habitacion(habitacion));
    await Habitacion.insertMany(HabitacionesMap);
    console.log("Habitaciones insertados")
})
.catch((error) => console.log(`error insertando habitaciones: ${error}`))
.finally(()=>mongoose.disconnect());
