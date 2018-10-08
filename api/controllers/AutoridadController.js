/**
 * AutoridadController
 *
 * @description :: Server-side logic for managing Autoridads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	fnConsultarAlcalde:(req,res)=>{
		var municipio=req.params.municipio
		Autoridad.findOne({municipio:municipio,tipo:'A'}).exec(function(error,resultado){
			if(error) res.negotiate(error);
			if(resultado){
			   res.view('Autoridades/AlcaldeEditar',{layout:'../views/Layouts/Layout-4',alcalde:resultado,municipio:municipio});
			}else{
			   res.view('Autoridades/AlcaldeAgregar',{layout:'../views/Layouts/Layout-4',municipio:municipio});
			}
			
		})
	},
	fnConsultarRegidores:(req,res)=>{
		var municipio=req.params.municipio

		Autoridad.find({municipio:municipio,tipo:'R'}).exec(function(error,resultado){
			if(error) res.negotiate(error);
			res.view('Autoridades/RegidorListar',{layout:'../views/Layouts/Layout-4',regidores:resultado,municipio:municipio});
		})
	},
	fnConsultarRegidorPorId:async(req,res)=>{		
		try {
			let autoridades=await AutoridadDB.fnConsultarAutoridades({id:req.params.id,tipo:'R'});
			res.view('Autoridades/RegidorEditar',{layout:'../views/Layouts/Layout-4',regidor:autoridades[0],municipio:autoridades[0].municipio});
		} catch (error) {
			console.log(error);
		}		
	},
	fnRegistrarAlcalde:function(req,res){
		
		var alcalde={
			nombres:req.body.nombres,
			apellidos:req.body.apellidos,
			tipo:req.body.tipo,
			resena:req.body.resena,
			municipio:req.body.municipio,
			habilitado:req.body.habilitado			
		}

		//var archivo='autoridades'+'/'+req.file('fotoAlcalde')._files[0].stream.filename;

		Autoridad
		.create(alcalde)
		.then(function whenDone(_autoridad){
				req.file('fotoAlcalde').upload({
				adapter:require('skipper-s3'),
				bucket:'fotosmunicipios',
				key:'AKIAIP7R7UMNBUU57EKA',
				secret:'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'//,
				//saveAs:archivo
			},function whenDone(error,archivo){

				if(error) return res.negotiate(error);	

				Autoridad
				.update({id:_autoridad.id},{foto:archivo[0].extra.Location})
				.then(function(miautoridad){
					res.send(miautoridad);
				})
				.catch(function(error){
 					res.send(null);
				})
			});

		})
		.catch(function(error){
 			res.send(null);
		})
	},

	fnActualizarAlcalde1:(req,res)=>{

		var filtro={id:req.params.id}
		var campos={nombres:req.body.nombres,apellidos:req.body.apellidos,			
			resena:req.body.resena,municipio:req.body.municipio,habilitado:req.body.habilitado			
		}

		Autoridad.update(filtro,campos).exec(function(error,alcalde){
			if(error) res.negotiate(error);
			res.send(alcalde);
		})
	},
	fnActualizarAlcalde2:(req,res)=>{
		
		var filtro={id:req.params.id}
		var campos={nombres:req.body.nombres,apellidos:req.body.apellidos,			
			resena:req.body.resena,municipio:req.body.municipio,habilitado:req.body.habilitado			
		}

		Autoridad.update(filtro,campos)
		.then(function whenDone(alcalde){
				req.file('fotoAlcalde').upload({
				adapter:require('skipper-s3'),
				bucket:'fotosmunicipios',
				key:'AKIAIP7R7UMNBUU57EKA',
				secret:'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'
		},function whenDone(error,archivo){
				if(error) return res.negotiate(error);	

				Autoridad.update(filtro,{foto:archivo[0].extra.Location})
				.then(function(alcalde){
					res.send(alcalde);
				})
				.catch(function(error){
 					res.send(null);
				})
			});

		})
		.catch(function(error){
 			res.send(null);
		})						
	},

	fnEliminarAlcalde:(req,res)=>{
		
		var filtro={municipio:req.body.municipio}
		Autoridad.destroy(filtro).exec(function(error,alcalde){
			if(error) return res.negotiate(error);	
			res.send(alcalde);
		})
	},
	fnAgregarRegidor:(req,res)=>{
		var municipio=req.params.municipio;
		res.view('Autoridades/RegidorAgregar',{layout:'../views/Layouts/Layout-4',municipio:municipio});
	},
	fnRegistrarRegidor:(req,res)=>{

		try {

			let regidor={nombres:req.body.nombres,
						apellidos:req.body.apellidos,
						tipo:'R',
						municipio:req.body.municipio,
						habilitado:req.body.habilitado=='on'?1:0}

			Autoridad.create(regidor)
			.then(function whenDone(regidor){
				req.file('fotoRegidor').upload({
				adapter:require('skipper-s3'),
				bucket:'fotosmunicipios',
				key:'AKIAIP7R7UMNBUU57EKA',
				secret:'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'
			},function whenDone(error,archivo){

				if(error) return res.negotiate(error);	

				Autoridad.update({id:regidor.id},{foto:archivo[0].extra.Location})
				.then(function(regidor){
					res.redirect('/Regidor/Listar/'+req.body.municipio);
				})
				.catch(function(error){
						res.negotiate(error);
				})
			});
			})
			.catch(function(error){
				res.negotiate(error);
			})

			/*
			if(req.file('fotoRegidor')._readableState.length==0){
				let autoridad=await Autoridad.create(regidor);
				res.redirect('/Regidor/Listar/'+req.body.municipio);
			}else{
			
			}
			*/
		} catch (error) {
			res.negotiate(error);
		}
		
	},

	fnActualizarRegidor1:(req,res)=>{

		var filtro={id:req.params.id}
		var campos={nombres:req.body.nombres,apellidos:req.body.apellidos,			
			municipio:req.body.municipio,habilitado:req.body.habilitado			
		}

		Autoridad.update(filtro,campos).exec(function(error,regidor){
			if(error) res.negotiate(error);
			res.send(regidor);
		})
	},
	fnActualizarRegidor2:(req,res)=>{
		
		var filtro={id:req.params.id}
		var campos={nombres:req.body.nombres,apellidos:req.body.apellidos,			
			municipio:req.body.municipio,habilitado:req.body.habilitado			
		}

		Autoridad.update(filtro,campos)
		.then(function whenDone(regidor){
				req.file('fotoRegidor').upload({
				adapter:require('skipper-s3'),
				bucket:'fotosmunicipios',
				key:'AKIAIP7R7UMNBUU57EKA',
				secret:'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'
		},function whenDone(error,archivo){
				if(error) return res.negotiate(error);	

				Autoridad.update(filtro,{foto:archivo[0].extra.Location})
				.then(function(regidor){
					res.send(regidor);
				})
				.catch(function(error){
 					res.send(null);
				})
			});

		})
		.catch(function(error){
 			res.send(null);
		})						
	},

	fnEliminarRegidor:(req,res)=>{
		
		var filtro={id:req.params.id}
		Autoridad.destroy(filtro).exec(function(error,regidor){
			if(error) return res.negotiate(error);	
			res.send(regidor);
		})
	},

};

