import { Router } from "express";
import { obtenerVideoj,crearVideoj, putvideojuego, deleteVideojuego } from "../Controller/ProductController.js";


const router = Router();
router.get('/videoj',obtenerVideoj);
router.post('/videoj',crearVideoj);
router.put('/videoj/:id',putvideojuego);
router.delete('/videoj/:id',deleteVideojuego);

export default router;

