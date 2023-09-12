const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Usuario = require('../api/models/usuarios.model');
dotenv.config();

const arrayusuarios = [
  {
    username: "Usus1",
    password: "123123",
    correo: "Usus1@gmail.com",
    nombre: "Juan Pérez",
  },
  {
    username: "Charl2",
    password: "456456",
    correo: "Charl2@gmail.com",
    nombre: "María López",
  },
  {
    username: "Macharl3",
    password: "789789",
    correo: "Macharl3@gmail.com",
    nombre: "Carlos Rodríguez",
  },
  {
    username: "Lonu4",
    password: "111111",
    correo: "Lonu4@gmail.com",
    nombre: "Ana Martínez",
  },
  {
    username: "Lovael5",
    password: "222222",
    correo: "Lovael5@gmail.com",
    nombre: "David García",
  },
];

const seedUsuarios = async () => {
  try {
    const DBURL1 = process.env.DBURL;
    await mongoose.connect(DBURL1);

    const allUsuarios = await Usuario.find();
    if (allUsuarios.length > 0) {
      await Usuario.collection.drop();
      console.log("Usuarios borrados");
    }

    for (const usuario of arrayusuarios) {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      usuario.password = hashedPassword;
    }

    const UsuariosMap = arrayusuarios.map((usuario) => new Usuario(usuario));
    await Usuario.insertMany(UsuariosMap);
    console.log("Usuarios insertados");
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      mongoose.disconnect();
    }
};

seedUsuarios();


