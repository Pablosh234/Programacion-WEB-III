import pool from "../config/db.js";

export const obtenerVideojuegos = async()=>{
    const [array1] = await pool.query('SELECT * FROM videojuegos');
    return array1;
}
export const agreagarVideojuegos = async(nombre,tipo,aniopubli)=>{
    const [respuesta] = await pool.query('INSERT INTO videojuegos(nombre,tipo,aniopubli) VALUES(?,?,?)',[nombre,tipo,aniopubli]);
    return respuesta.insertId;
}
export const elimnarVideojuego = async(id) =>{
    await pool.query('DELETE FROM videojuegos WHERE id=?',[id]);
}

export const actualizarVideojuego =  async(id,nombre,tipo,aniopubli)=>{
    await pool.query('UPDATE videojuegos SET nombre=?,tipo=?,aniopubli=? WHERE id=?',[nombre,tipo,aniopubli,id]);
}
export const buscarVideojuego = async(id)=>{
    const [array] =await pool.query('SELECT * FROM videojuegos WHERE id=?',[id]);
    return array[0];
}