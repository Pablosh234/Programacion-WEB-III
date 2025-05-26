import * as TeamModel from '../models/TeamModel.js';

export  const ObtenerTeam = async(req,res)=>{
    try{
        const team  = await TeamModel.getTeam();
        res.json(team);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export  const addTeam = async(req,res)=>{
    try{
        const {nomequipo,pais,directortec,patrocinador} = req.body;

        const team  = await TeamModel.postTeam(nomequipo,pais,directortec,patrocinador);
        res.status(200).json(team);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export const refreshTeam = async(req,res)=>{
    try{
        const {id} = req.params;
        const {nomequipo,pais,directortec,patrocinador} = req.body;
        
        const team  = await TeamModel.putTeam(id,nomequipo,pais,directortec,patrocinador);
        res.status(200).json(team);

    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export const deletTeam = async(req,res)=>{
    try{
        const {id} = req.params;
        const team = await TeamModel.deleteTeam(id);
        res.status(200).json(team);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}