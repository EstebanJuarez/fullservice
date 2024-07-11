// Importar el módulo express de forma ES6
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { login } from './controllers/authController.js';
import routeProducto from './routes/productosRoutes.js';
import roleRoute from "./routes/roleRoutes.js"
import routeServicio from './routes/serviciosRoutes.js';
//  import routeUser from './routes/userRoutes.js';



const app = express();
const PORT = 5004; // Puerto en el que se ejecutará el servidor



app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    console.log('Tamaño de la solicitud:', req.headers['content-length']);
    next();
});

app.use('/productos', routeProducto);
app.use('/servicios', routeServicio);
app.use('/role', roleRoute)
app.post('/login', login);
// app.use('/user', routeUser);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});