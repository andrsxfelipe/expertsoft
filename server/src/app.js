import express from 'express';
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js'
// import uploadRoutes from './routes/helpers.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clientes', clientesRoutes);
// app.use('/upload', uploadRoutes);

export default app; 