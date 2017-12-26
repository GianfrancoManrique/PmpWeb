//Capa de datos Tramite
var TramiteDB = {  
    fnConsultarTramite:async(filtroJson)=>{
        try {
            let tramite=await Tramite.findOne(filtroJson);
            return tramite;
        } catch (error) {
             console.log(error);
        }
    },
    fnConsultarRequisitos:async(filtroJson)=>{
        try {
            let requisitos=await Requisito.find(filtroJson);
            return requisitos;
        } catch (error) {
             console.log(error);
        }
    },
    fnConsultarDerechos:async(filtroJson)=>{
        try {
            let derechos=await DerechoPago.find(filtroJson);
            return derechos;
        } catch (error) {
             console.log(error);
        }
    },
    fnConsultarModulos:async(municipio)=>{
        try {
            let modulos=await Modulo.find({sort:'id ASC'}).where({municipio:municipio},{habilitado:true});                        
            return modulos;
        } catch (error) {
            console.log(error);
        }
    },
    fnConsultarTramites:async(municipio)=>{	
        try{
            let tramites=await Tramite.find({municipio:municipio,habilitado:true});                        
            return tramites;
        }catch(error){
			console.log(error);
		}       
	},
    fnRegistrar:async(tramiteJson)=>{
        try {
            let tramite=await Tramite.create(tramiteJson);
            return tramite;
        } catch (error) {
            console.log(error);
        }
    },
    fnActualizar:async(filtroJson,camposJson)=>{
        try {
            let tramite=await Tramite.update(filtroJson,camposJson);
            return tramite[0];
        } catch (error) {
             console.log(error);
        }
    },
    fnEliminarTramite:async(id)=>{
        try {
            let tramite=await Tramite.destroy({id:id});
            return tramite;
        } catch (error) {
            console.log(error);
        }
    },
    fnEliminarRequisitos:async(tramite)=>{
        try {
            let requisitos=await Requisito.destroy({tramite:tramite});
            return requisitos;
        } catch (error) {
            console.log(error);
        }
    },
     fnEliminarDerechos:async(tramite)=>{
        try {
            let derechosPago=await DerechoPago.destroy({tramite:tramite});
            return derechosPago;
        } catch (error) {
            console.log(error);
        }
    },
    fnBuscarPortal:(municipio,modulo,palabras)=>{
        try {
            let comando='SELECT id,modulo,procedimiento,pago,atencion from BuscarTramites('
            comando=comando.concat(municipio,',',modulo,',',palabras,')');

            Tramite.query(comando,function(error,resultado){
                if(resultado){
                     return resultado.rows
                }else{
                    return null
                }              
		 	})          
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = TramiteDB;  