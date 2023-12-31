//Llamadas a paquetes instalados

const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config();
const {connect} = require("./src/utils/database")

//Elementos necesarios para establecer la conexion a la base de datos
const app = express()
const PORT = process.env.PORT || 5000
connect()
app.use(cors())
app.use(express.json())

const routerPacientes = require("./src/api/routes/pacientes.routes")
const routerUsuarios = require("./src/api/routes/usuarios.routes") 
const routerHabitaciones = require("./src/api/routes/habitaciones.routes") 

app.use("/pacientesBase", routerPacientes)
app.use("/usuariosBase", routerUsuarios)
app.use("/habitacionesBase", routerHabitaciones)

app.listen(PORT, ()=>{
    console.log(`Server URL: http://localhost:${PORT}`)
})