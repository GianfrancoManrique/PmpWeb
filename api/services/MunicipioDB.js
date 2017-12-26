var MunicipioDB = {  
    fnConsultarMasBuscados:async()=>{
        try {
            //let municipios=await Municipio.find({habilitado:true,limit:5,sort:'numbusquedas DESC'});                        
            let municipios=await Municipio.find({habilitado:true,limit:5}); 
            return municipios;
        } catch (error) {
            console.log(error);
        }
    },
    fnConsultarMunicipio:async(id)=>{	
        try{
            let municipio=await Municipio.findOne({id:id});                        
            return municipio;
        }catch(error){
			console.log(error);
		}       
	},
    fnActualizaBusquedas:async(municipio)=>{
         try{
            let visita=await Visita.create({municipio:municipio});                         
            return visita;
        }catch(error){
			console.log(error);
		}       
    },
    fnConsultarVisitas:async(municipio)=>{
        try {
            
        } catch (error) {                                                                                                     
            
        }
    }
};

module.exports = MunicipioDB;  