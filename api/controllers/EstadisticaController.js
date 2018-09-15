/**
 * EstadisticaController
 *
 * @description :: Server-side logic for managing Estadisticas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	fnMostrar:(req,res)=>{
        try {
            let año=new Date().getFullYear();
            let comando='SELECT mes,numvisitas from sp_consultarvisitasxmunicipio(';
            comando=comando.concat(req.params.municipio,',',año,')');
            Visita.query(comando,function(error,resultado){ 	
                let data=resultado?resultado.rows:[];
 				res.view('Estadisticas/Estadistica',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio,data:data,año:año});
 		 	})           
        } catch (error) {
            console.log(error);
        }        
    },
    fnConsultar:(req,res)=>{
        try {
            let año=parseInt(req.body.año);
            let comando='SELECT mes,numvisitas from sp_consultarvisitasxmunicipio(';
            comando=comando.concat(req.params.municipio,',',año,')');
            Visita.query(comando,function(error,resultado){ 	
                let data=resultado?resultado.rows:[];
                 console.log(data);
 				res.view('Estadisticas/Estadistica',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio,data:data,año:año});
 		 	})           
        } catch (error) {
            console.log(error);
        }        
    },
};

