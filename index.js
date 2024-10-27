const express = require('express'); // Import express from node_modules
require('dotenv').config(); // Import dotenv from node_modules, sirve para leer variables de entorno
const cors = require('cors'); // Import cors from node_modules
const { dbConnection } = require('./database/config'); // Import dbConnection from database/config.js


// Crear el servidor de express
const app = express();

//base de datos
dbConnection();

//Cors
app.use(cors()); //Habilita cors

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth')); //too lo que se exporte de './routes/auth' se va a habilitar en '/api/auth'
app.use('/api/events', require('./routes/events')); //too lo que se exporte de './routes/events' se va a habilitar en '/api/events'
//Todo: CRUD: Eventos



//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});