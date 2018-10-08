/**
 * MunicipalidadController
 *
 * @description :: Server-side logic for managing Municipalidads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
/*
var moment   = require('moment'),
	       _ = require('lodash');
*/
module.exports = {

	
	fnIndex:async(req,res)=>{
		
		try {
			let municipios=await MunicipioDB.fnConsultarMasBuscados();
			let comando='select id,titulo,foto,resumen,distrito,feccreado,fecmodificado from public.sp_consultarultnoticias() '     
			Noticia.query(comando,function(error,resultado){
				if(error){ res.negotiate(error)}

				let noticias=resultado?resultado.rows:null;
				res.view('Portal/Index',{municipios:municipios,noticias:noticias})

			});		
		} catch (error) {
			res.negotiate(error)
			logger.info("ERROR");
		}
	},
	fnBuscar:function(req,res){
		var palabras=req.body.palabras;
		//Código de buscador
		Municipio
		.find({distrito:{"contains":palabras}})
		.exec(function(error,resultados){
			if(error){ res.negotiate(error)};
			res.view("Portal/Resultados",{resultados:resultados});
		})
	},
	fnPerfil:async(req,res)=>{

		try {
			let municipio=await MunicipioDB.fnConsultarMunicipio(req.params.id);		
			let alcalde=await AutoridadDB.fnConsultarAlcalde(municipio.id);
			let regidores=await AutoridadDB.fnConsultarRegidores(municipio.id);
			await MunicipioDB.fnActualizaBusquedas(req.params.id);
			res.view('Portal/Perfil',{municipio:municipio,alcalde:alcalde,regidores:regidores});
		} catch (error) {
			console.log(error);
		}		
	},
	fnListar:function(req,res){

		var departamentos=[];
		var provincias=[];
		var distritos=[];

		Municipio.find({sort:{departamento:1,provincia:1,distrito:1}})				  
		.then(function(municipios){

		  Ubigeo.find()
		  .then(function(ubigeos){
			
			for(var i=0;i<ubigeos.length;i++) {				
				departamentos.push(ubigeos[i].departamento);
				provincias.push(ubigeos[i].provincia);
				distritos.push(ubigeos[i].distrito);
			};		
			
			res.view("Municipios/MunicipioListar",
			{layout:"../views/Layouts/Layout-1",
			 municipios:municipios,
			 departamentos:departamentos.sort(),		
			 provincias:provincias.sort(),
			 distritos:distritos.sort()	 
			});

		  })
			
		})
		.catch(function(error){			
		  res.negotiate(error)			
		})

	},
		
	fnConsultarProvincias:function(req,res){
		
		var departamento=req.params.departamento;

		Ubigeo.find({select:['provincia'],where:{departamento:departamento}})
		.sort({provincia:1})
		.then(function(ubigeos){
			res.send(ubigeos);
		})
		.catch(function(error){
 			res.send(null);
		})
	},

	ConsultarMunPorDpto:function(req,res){
		
		var _nomDpto=req.params.nomDpto;

		Municipalidad
		.find({departamento:_nomDpto})
		.then(function(municipios){
			res.send(municipios);
		})
		.catch(function(error){
 			res.send(null);
		})
	},

	fnConsultarDistritos:function(req,res){
		
		var provincia=req.params.provincia;

		Ubigeo.find({select:['distrito'],where:{provincia:provincia}})
		.sort({distrito:1})
		.then(function(ubigeos){
			res.send(ubigeos);
		})
		.catch(function(error){
 			res.send(null);
		})
	},

	ConsultarMunPorProv:function(req,res){
		
		var _nomProv=req.params.nomProv;

		Municipalidad
		.find({provincia:_nomProv})
		.then(function(municipios){
			res.send(municipios);
		})
		.catch(function(error){
 			res.send(null);
		})
	},

	ConsultarMunPorDsto:function(req,res){
		
		var _nomDsto=req.params.nomDsto;

		Municipalidad
		.find({distrito:_nomDsto})
		.then(function(municipios){
			res.send(municipios);
		})
		.catch(function(error){
 			res.send(null);
		})
	},

fnConsultarMun:async(req,res)=>{

	try {
		let telefonos=null;
		let tipos=await TipoTelefono.find({select:['id','nombre']}).where({habilitado:true})
		let municipio=await Municipio.findOne({id:req.params.id})
		
		if(municipio){
			let usuario=await Usuario.findOne({municipio:municipio.id});
			//Parametros de sesion
			req.session.distrito = municipio.distrito;
			req.session.usuario=usuario.nombres;

			let comando='SELECT ID,NUMERO,TIPO FROM public.sp_consultartelxmunicipio ('+req.params.id+')';
			Telefono.query(comando,function(error,resultado){	
		
				if(resultado){
					telefonos=resultado.rows;
				}
				res.view('Municipios/MunicipioEditar',{layout:'../views/Layouts/Layout-4',mi_municipio:municipio,municipio:municipio.id,telefonos:telefonos,tipos:tipos});		
			})
		}else{
			return res.redirect('/');
		}
	} catch (error) {
		console.log(error);
	}
},

	fnActualizarGral:function(req,res){

		var filtro={id:req.body.id};
		var campos={
			correo:req.body.correo,
			urlFacebook:req.body.urlFacebook,
			urlTwitter:req.body.urlTwitter,
			urlYoutube:req.body.urlYoutube,
			mision:req.body.mision,
			vision:req.body.vision,
			valores:req.body.valores,
			lema:req.body.lema
		}

		Municipio.update(filtro,campos)
		.then(function(municipio){		
			res.send({mensaje:"Municipio actualizado con éxito."})
		})
		.catch(function(error){
			res.send({mensaje:"Error en actualización."})
		})
		
	},
		
	fnEditar:function(req,res){
	
		var id=req.params.id;
		Municipio
		.find({select:['departamento','provincia','distrito','comentario','habilitado']})
		.populate("usuarios")
		.where({id:id})					  
		.then(function(municipio){					
			res.send(municipio);			
		})
		.catch(function(error){			
		  res.send(null);		
		})	
	},

	fnActualizar:function(req,res){

		var filtro1={departamento:req.body.departamento,provincia:req.body.provincia,
					distrito:req.body.distrito,habilitado:req.body.habilitado}

		var filtro2={id:req.body.id}

		var campos={departamento:req.body.departamento,provincia:req.body.provincia,
				    distrito:req.body.distrito,comentario:req.body.comentario,
					habilitado:req.body.habilitado}

		var mensaje=String.empty;

		Municipio.update(filtro2,campos)
		.then(function(municipio){		
			res.send("Éxito en actualización de municipio.");
		})
		.catch(function(error){
			res.send("Error en actualización de municipio.");
		})				
	},

	fnRegistrar:function(req,res){

		var filtro={departamento:req.body.departamento,provincia:req.body.provincia,
					distrito:req.body.distrito,habilitado:req.body.habilitado}

		var campos={departamento:req.body.departamento,provincia:req.body.provincia,
					distrito:req.body.distrito,comentario:req.body.comentario,
				    habilitado:req.body.habilitado}

		var mensaje=String.empty;

		Municipio.findOne(filtro)
		.then(function(municipio){
			if(municipio!=undefined){
			   res.send("Municipio ya se encuentra registrado.");
			}else{
				Municipio.create(campos)
				.then(function(municipio){				
					res.send("Éxito en registro de municipio.");
				})
				.catch(function(error){
					res.send("Error en registro de municipio.");
				})		
			}
		})

		
		
	},

	fnEliminar:function(req,res){

		var filtro={id:req.params.id};

		Municipio.destroy(filtro)
		.then(function(municipio){
			res.send(municipio);
		})
		.catch(function(error){
 			res.send(null);
		})
	},
		
	fnRegistrarTelefono:function(req,res){

		var campos=JSON.parse(req.body.telefono);

		Telefono
			.create(campos)
			.then(function(telefono){		

				var filtro={id:telefono.tipo};

				TipoTelefono
					.find(filtro)
					.then(function(tipo){

						var telefonoJson={
							id:telefono.id,
							numero:telefono.numero,
							nombre:tipo[0].nombre,
							tipo:telefono.tipo
						}

						res.send(telefonoJson);
					})		
			})
			.catch(function(error){
				res.send(null)
			})	
	},

	fnEliminarTelefono:function(req,res){
		console.log(req.body.telefono);
		var campos=JSON.parse(req.body.telefono);
		Telefono
			.destroy(campos)
			.then(function(telefono){		
				res.send(telefono);	
			})
			.catch(function(error){
				res.send(null)
			})	
	},

	fnFiltrar:async(req,res)=>{
		try {
			let departamento=req.body.departamento=='Elija departamento'?'.':req.body.departamento;
			let provincia=req.body.provincia=='Elija provincia'?'.':req.body.provincia;
			let distrito=req.body.distrito=='Elija distrito'?'.':req.body.distrito;
			let comando="SELECT id,departamento,provincia,distrito,habilitado from sp_buscarmunicipios('"
			comando=comando.concat(departamento,"','",provincia,"','",distrito,"')");
			
			Tramite.query(comando,(error,resultado)=>{
				if(error) res.send({municipios:null})
				let municipios=resultado?resultado.rows:null;
				res.send({municipios:municipios});
			})
		} catch (error) {
			res.send({municipios:null})
		}		
	}
};

