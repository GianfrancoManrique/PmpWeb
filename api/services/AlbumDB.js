var AlbumDB = {  
    fnCrear:async(albumJson)=>{	
        try{
            let album=await Album.create(albumJson) ;              
            return album;
        }catch(error){
			console.log(error);
		}       
	},
    fnActualizar:async(filtroJson,camposJson)=>{
        try{
            let album=await Album.update(filtroJson,camposJson);              
            return album[0];
        }catch(error){
			console.log(error);
		}    
    },
    fnEliminar:async(filtroJson)=>{
        try{
            let album=await Album.destroy(filtroJson);              
            return album[0];
        }catch(error){
			console.log(error);
		}    
    }
};

module.exports = AlbumDB;  