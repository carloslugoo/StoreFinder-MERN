const express = require('express');
const mongoose = require('mongoose'); // Agrega mongoose para la conexión a la base de datos
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000; // Puerto de escucha
// Importa tus controladores de tiendas desde la carpeta .controllers
const storeControllers = require('./server/controllers/stores.Controllers');
// Middleware para el análisis del cuerpo de las solicitudes
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // URL de tu aplicación React
  }));
// Usa tus rutas de tiendas (controladores)
app.use('/stores', storeControllers);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// Ruta para verificar la conexión a la base de datos
app.get('/check-db-connection', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({ isConnected });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});