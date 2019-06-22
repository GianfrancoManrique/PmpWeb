var FotoDB = {  
    fnConsultarAlbums:async(municipio)=>{	
        try{
            let albums=await Foto.find({municipio:municipio}).populate()                    
            return albums;
        }catch(error){
			console.log(error);
		}       
	},
    fnCrear:async(fotoJson)=>{	
        try{
            let foto=await Foto.create(fotoJson) ;              
            return foto;
        }catch(error){
			console.log(error);
		}       
	},
    fnCrearFotos:async(fotos,descripcion,municipio,album)=>{
        try{
             fotos.forEach(async(foto)=>{
                let fotoReg=await Foto.create({descripcion:descripcion,municipio:municipio,nombre_archivo:foto.extra.Key.toString(),url:foto.extra.Location.toString(),album:album})
                console.log(fotoReg);
             })
             return true;
        }catch(error){
			return false;
		}      
       
    },
    fnEliminar:async(filtroJson)=>{
        try {
            let foto=await Foto.destroy(filtroJson);
            return foto[0]
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = FotoDB;  