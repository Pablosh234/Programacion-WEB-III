import express from 'express';
import{ addTeam, deletTeam, ObtenerTeam, refreshTeam } from '../controller/TeamController.js';

const rout = express.Router();

rout.get('/',ObtenerTeam);
rout.post('/',addTeam);
rout.put('/:id',refreshTeam);
rout.delete('/:id',deletTeam);

export default rout;