var dateFormat = require('dateformat');
 dateFormat.masks.hammerTime = 'dd/mm/yyyy';

var NoticiaDB = {  
    fnConsultarNoticia:async(id)=>{	
        try{
             let noticia=await Noticia.findOne({id:id})        
             noticia.feccreado=dateFormat(noticia.createdAt,'hammerTime');
             noticia.save();
            return noticia;
        }catch(error){
			console.log(error);
		}
       
	},
    fnConsultarNoticiasMun:async(pmunicipio)=>{	
		try{
             let noticiasArray=[];
             let noticias=await Noticia.find({municipio:pmunicipio,limit:4,sort:'createdAt DESC'});
             let municipio=await Municipio.findOne({id:pmunicipio});
             noticias.forEach(function(noticia){
                noticia.distrito=municipio.distrito;
                noticia.feccreado=dateFormat(noticia.createdAt,'hammerTime');
                noticiasArray.push(noticia);
             })
            return noticiasArray;
        }catch(error){
			console.log(error);
		}
    },
    fnRegistrar:async(noticiaJson)=>{
        try {
            let noticia=await Noticia.create(noticiaJson);
            return noticia;
        } catch (error) {
            console.log(error);
        }
    },
    fnActualizar:(filtroJson,camposJson)=>{
         try {
            let noticia=Noticia.update(camposJson).where(filtroJson);
            return noticia;
        } catch (error) {
            console.log(error);
        }
    }
    /*
    fnConsultarUltNoticias:async()=>{
        try {
            let comando='select id,titulo,foto,resumen,distrito,feccreado,fecmodificado from public.consultarNoticias() '     
            let noticias=await Noticia.query(comando);
        } catch (error) {
            console.log(error);
        }
       

    }
    */
};

module.exports = NoticiaDB;  