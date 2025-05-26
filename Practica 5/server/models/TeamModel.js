import pool  from "../config/db.js";

export const  getTeam = async()=>{
    const [team] = await pool.query('SELECT * FROM equipos')
    return team;
}
export const postTeam = async(nomequipo,pais,directortec,patrocinador)=>{
    const [team] = await pool.query('INSERT INTO equipos(nomequipo,pais,directortec,patrocinador) VALUES (?,?,?,?)',[nomequipo,pais,directortec,patrocinador]);
    return{id:team.insertId,nomequipo,pais,directortec,patrocinador};
}
export const putTeam = async(id,nomequipo,pais,directortec,patrocinador)=>{
    await pool.query('UPDATE equipos SET nomequipo=?,pais=?,directortec=?,patrocinador=? WHERE id_equipo=?',[nomequipo,pais,directortec,patrocinador,id]);
    return {message:'Se ectualizo correctamente'};
}
export const deleteTeam = async(id)=>{
    await pool.query('DELETE FROM equipos WHERE id_equipo=?',[id]);
    return {message:'Se elimino correctamente el equipo'};
}