/**
 * TramiteController
 *
 * @description :: Server-side logic for managing Tramites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	fnConsultarTramites:async(req,res)=>{
		try {
			let modulos=await TramiteDB.fnConsultarModulos(req.params.municipio);
 			Tramite.query('SELECT id, modulo,procedimiento,feccreado,fecmodificado from sp_consultartramitesxmunicipio('+req.params.municipio+')',
 	 		function(error,resultado){
				let tramites=resultado?resultado.rows:null;
 				console.log(modulos);console.log(tramites)
 				res.view('Tupa/TramiteListar',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio,
 				modulos:modulos,tramites:tramites});
 		 	})
  		} catch (error) {
  			console.log(error);
		}
	},
    fnAgregar:async(req,res)=>{
		
		try {
			let modulos=await TramiteDB.fnConsultarModulos(req.params.municipio);
			res.view('Tupa/TramiteAgregar',{layout:'../views/Layouts/Layout-4',
			municipio:req.params.municipio,modulos:modulos});
		} catch (error) {
			res.negotiate(error);
		}			
	},		
	fnRegistrar:async(req,res)=>{
		var tramite={municipio:req.body.municipio,nombre:req.body.nombre,modulo:req.body.modulo,
  			area_tramite:req.body.area_tramite,atencion:req.body.atencion,pago:req.body.pago=='true'?true:false,
  			base_legal:req.body.base_legal,notas_procedimiento:req.body.notas_procedimiento,
  			notas_requisitos:req.body.notas_requisitos,autoridad_competente:req.body.autoridad_competente,
		  	instancia_reconsideracion:req.body.instancia_reconsideracion,instancia_apelacion:req.body.instancia_apelacion,
			habilitado:true				
 		};
		 
		if(req.body.requisitos){
 			tramite.requisitos=JSON.parse(req.body.requisitos)
 		}
 		
 		if(req.body.derechosPago){
 			tramite.derechos=JSON.parse(req.body.derechosPago)
  		}

		let tramiteReg=await TramiteDB.fnRegistrar(tramite);
  		if(req.body.flgadjunto=='true'){
  			res.setTimeout(0);
  			req.file('archivo_adjunto').upload({adapter:require('skipper-s3'),bucket:'fotosmunicipios',
 			key:'AKIAIP7R7UMNBUU57EKA',secret:'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'},
 			function whenDone(error,archivo_adjunto){
 				if(error) res.send({tramite:null});
 				if(archivo_adjunto.length==0){
 						res.send({tramite:tramiteReg});
 				}else{
 					Tramite.update({id:tramiteReg.id},{archivo_adjunto:archivo_adjunto[0].extra.Location}).exec((error,tramite)=>{
 						if(error) res.send({tramite:null});
 						console.log(tramite[0]);
 						res.send({tramite:tramite[0]});
 					})
 				}				
 			})
 		}else{
 			console.log(tramiteReg);
  			res.send({tramite:tramiteReg});
  		}

	},
	fnEditar:async(req,res)=>{
		try {
			let tramite=await TramiteDB.fnConsultarTramite({id:req.params.id});
 			let requisitos=await TramiteDB.fnConsultarRequisitos({tramite:req.params.id});
 			let derechos=await TramiteDB.fnConsultarDerechos({tramite:req.params.id});			
 			let modulos=await TramiteDB.fnConsultarModulos(tramite.municipio);
 			res.view('Tupa/TramiteEditar',{layout:'../views/Layouts/Layout-4',tramite:tramite,
 			modulos:modulos,municipio:tramite.municipio,requisitos:requisitos,derechos:derechos});	
 		} catch (error) {
 		  	console.log(error);
 		}			
	},
	fnActualizar:async(req,res)=>{

		var tab=req.body.tab[0];
		var filtroJson={id:req.params.id};
        var camposJson;
		switch(tab){

			case '0':
				camposJson={nombre:req.body.nombre,modulo:req.body.modulo,
  							area_tramite:req.body.area_tramite,atencion:req.body.atencion,
							pago:req.body.pago,habilitado:req.body.habilitado}
  				break;			
			case '1':
				camposJson={base_legal:req.body.base_legal,notas_procedimiento:req.body.notas_procedimiento,
  							notas_requisitos:req.body.notas_requisitos}
				break;
			case '2':
					if(req.body.requisitos){
 						camposJson={requisitos:JSON.parse(req.body.requisitos)}
 					}		
				 break;
			case '3':
					if(req.body.derechosPago){
 						camposJson={derechos:JSON.parse(req.body.derechosPago)}
 					}
				 break;
			case '4':
					camposJson={autoridad_competente:req.body.autoridad_competente,
  					instancia_reconsideracion:req.body.instancia_reconsideracion,
  					instancia_apelacion:req.body.instancia_apelacion}
				 break;
		}
		let tramiteAct=await TramiteDB.fnActualizar(filtroJson,camposJson);
		if(req.body.flgadjunto=='true'){
 			res.setTimeout(0);
 			req.file('archivo_adjunto').upload({adapter:require('skipper-s3'),bucket:'fotosmunicipios',
 			key:'AKIAIP7R7UMNBUU57EKA',secret:'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'},
 			async function whenDone(error,archivo_adjunto){
 				console.log(archivo_adjunto);
 				if(error) res.send({tramite:null});
 				if(archivo_adjunto.length==0){
 						res.send({tramite:tramiteAct});
 				}else{
 					let tramite=await TramiteDB.fnActualizar({id:tramiteAct.id},{archivo_adjunto:archivo_adjunto[0].extra.Location,
 					nombre_archivo:archivo_adjunto[0].filename});
 					console.log(tramite);
 					res.send({tramite:tramite});
 				}				
 			})
 		}else{
 			console.log(tramiteAct);
 			res.send({tramite:tramiteAct});
 		}
	},
	fnEliminar:async(req,res)=>{
		try {
			let tramite=await TramiteDB.fnEliminarTramite(req.body.id);
			let requisitos=await TramiteDB.fnEliminarRequisitos(tramite[0].id);
			let derechosPago=await TramiteDB.fnEliminarDerechos(tramite[0].id);
			res.send({tramite:tramite[0]});
		} catch (error) {
			res.send({tramite:null});
		}
	},
	fnBuscarPanel:(req,res)=>{
		if(req.body.modulo=='0'){
			if(req.body.nombre==''){
				Tramite.find().populate('modulo').exec(function(error,tramites){
					console.log(tramites);
					res.send({tramites:tramites});
				});
			}else{
				Tramite.find({nombre:{contains:req.body.nombre}}).populate('modulo').exec(function(error,tramites){
					console.log(tramites);
					res.send({tramites:tramites});
				});
			}
		}else{
			if(req.body.nombre==''){
				Tramite.find({modulo:req.body.modulo}).populate('modulo').exec(function(error,tramites){
					console.log(tramites);
					res.send({tramites:tramites});
				});
			}else{
				Tramite.find({modulo:req.body.modulo,nombre:{contains:req.body.nombre}}).populate('modulo').exec(function(error,tramites){
					console.log(tramites);
					res.send({tramites:tramites});
				});
			}
		}
	},

	fnListarTramites:async(req,res)=>{
		try {
			let modulos=await TramiteDB.fnConsultarModulos();
			Tramite.query('SELECT id,modulo,procedimiento,pago,atencion from sp_consultartramitesxmunicipio('+req.params.municipio+')',
	 		function(error,resultado){
				let tramites=resultado?resultado.rows:null;
				console.log(modulos);console.log(tramites);
				//Descomentar
				//res.view('Tupa/ListarTramites',{modulos:modulos,tramites:tramites,municipio:req.params.municipio});
				//Comentar
				res.view('Tupa/ListarTramites2',{modulos:modulos,tramites:tramites,municipio:req.params.municipio});
		 	})
		} catch (error) {
			 res.negotiate(error);
		}
		
	},

	fnConsultarTramiteProcedimiento:async(req,res)=>{
		try {
 			//let tramite=await TramiteDB.fnConsultarTramite({id:req.params.id});
			let requisitos=await TramiteDB.fnConsultarRequisitos({tramite:req.params.id});
			console.log(requisitos);
			let derechos=await TramiteDB.fnConsultarDerechos({tramite:req.params.id});
			console.log(derechos);
			let comando='SELECT id,procedimiento,modulo,area_tramite,base_legal,notas_procedimiento,notas_requisitos,';
			comando=comando.concat('archivo_adjunto,nombre_archivo,autoridad_competente,instancia_reconsideracion,instancia_apelacion,');
			comando=comando.concat('pago,atencion from sp_consultartramitexid(',req.params.id,')');
			Tramite.query(comando,(error,resultado)=>{				
				 if(resultado){
					let tramite=resultado.rows[0];
					res.view('Tupa/DetalleProcedimiento.ejs',{tramite:tramite,municipio:tramite.municipio,
					requisitos:requisitos,derechos:derechos});
				 }else{
					res.send('No existe información de trámite.');
				 }								
		 	})

 		
 		} catch (error) {
 		  res.negotiate(error);
 		}		
	},
	fnEliminarDerecho:async(req,res)=>{
 		DerechoPago.destroy({id:req.body.id}).exec(function(error,derecho){
 			if(error) res.send({derecho:null})
 			res.send({derecho:derecho[0]})
 		})
 	},
 	fnEliminarRequisito:async(req,res)=>{
 		Requisito.destroy({id:req.body.id}).exec(function(error,requisito){
 			if(error) res.send({requisito:null})
 			res.send({requisito:requisito[0]})
 		})
  	},
	fnBuscarPortal:async(req,res)=>{
		try {
			//let tramitesRes=TramiteDB.fnBuscarPortal(req.body.municipio,req.body.modulo,req.body.palabras);
			console.log(req.body.modulo);
			console.log(req.body.palabras);
			let palabras=req.body.palabras?"'"+req.body.palabras+"'":"'-'";
			let comando='SELECT id,modulo,procedimiento,pago,atencion from sp_buscartramitesxmunicipio('
            comando=comando.concat(req.body.municipio,',',req.body.modulo,',',palabras,')');

            Tramite.query(comando,function(error,resultado){
                if(resultado){
                    console.log(resultado.rows);
					res.send({tramites:resultado.rows});
                }else{
                   res.send({tramites:null});
                }              
		 	})          
		} catch (error) {
			res.send({tramites:null});
		}
	}
};

