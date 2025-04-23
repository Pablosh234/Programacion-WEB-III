import express from 'express';
import rutas from './routes/routes.js';
import cors from 'cors';

const app = express();
const PORT=3001;
app.use(express.json());
app.use(cors({origin:`http://localhost:5173`}))
  

app.use('/api',rutas);
app.listen(PORT,()=>{
    console.log(`Servidor corriendo  en el epuerto: ${PORT} `);
})
