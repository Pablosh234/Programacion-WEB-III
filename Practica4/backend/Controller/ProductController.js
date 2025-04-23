import * as Videoj from '../model/ProductModel.js'
export const  obtenerVideoj = async(req, res)=>{
    try{
        const productos = await Videoj.obtenerVideojuegos();
        const response = {
            data: productos,
            total: productos.length,
        }
        res.status(200).json(response);
        console.log(req.query);
    }catch(error){
        res.status(500).json({message: 'Error al obtener producto', error:error.message});
    }
}
export const crearVideoj = async(req,res)=>{
    try{
        const {nombre,tipo,aniopubli} =req.body;
        const newVideojuego = await Videoj.agreagarVideojuegos(nombre,tipo,aniopubli);
        res.status(201).json({id:newVideojuego,message:'Videojuego creado'});

    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error al cargar el producto'})
    }
}
export const putvideojuego = async(req,res)=>{
    try{
        const {id} = req.params;
        const buscar = await Videoj.buscarVideojuego(id);
        if(!buscar) return res.status(404).json({message:'Producto no encontrado'});
        const{nombre,tipo,aniopubli} = req.body;
        await Videoj.actualizarVideojuego(id,nombre,tipo,aniopubli);
        res.status(200).json({message:'Videojuego actualizado'});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error ala actualizar el videojuego'});
    }
    
}
export const deleteVideojuego = async(req,res)=>{
    try{
        const {id} = req.params;
        const buscar = await Videoj.buscarVideojuego(id);
        if(!buscar) return res.status(404).json({ message : 'Videojuego no encontrado'});
        await Videoj.elimnarVideojuego(id);
        res.status(200).json({message:'Videojuego eliminado'})
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error ala actualizar el videojuego'});
    }
}