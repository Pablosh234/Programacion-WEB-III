import express from 'express';
import cors from 'cors';
import routs from '../server/routes/routes.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/teams',routs);
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`En curso en el puerto http://localhost:${PORT}`)
})