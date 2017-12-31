var AutoridadDB = {  
    fnConsultarAlcalde:async(municipio)=>{	
        try{
            let alcalde=await Autoridad.findOne({municipio:municipio,tipo:'A'});                        
            return alcalde;
        }catch(error){
			console.log(error);
		}       
	},
    fnConsultarRegidores:async(municipio)=>{	
		try{
            let regidores=await Autoridad.find({municipio:municipio,tipo:'R',habilitado:true,sort:'nombres ASC'});
            return regidores;
        }catch(error){
			console.log(error);
		}
    },
    fnConsultarAutoridades:async(filtroJson)=>{
        try {
            let autoridades=await Autoridad.find(filtroJson);
            return autoridades;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = AutoridadDB;  