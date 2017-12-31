/**
 * NoticiaController
 *
 * @description :: Server-side logic for managing Noticias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	
	fnConsultarNoticias:(req,res)=>{

    	var pmunicipio=req.params.municipio;
    	var comando='select id,titulo,habilitado,feccreado,fecmodificado from public.sp_consultarnoticiasxmunicipio (';
		comando=comando.concat(pmunicipio,')');

    	Noticia.query(comando,function(error,resultado){

			if(error){ res.negotiate(error)};	
			let noticias=resultado?resultado.rows:null;
			res.view('Noticias/NoticiaListar',{layout:'../views/Layouts/Layout-4',municipio:pmunicipio,noticias:noticias})
		})

	},	
	fnAgregar:function(req,res){
		res.view('Noticias/NoticiaAgregar',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio});
	},

	fnRegistrar:async(req,res)=>{
		try {
			var noticiaJson={titulo:req.body.titulo,resumen:req.body.resumen,relevancia:req.body.relevancia,
			contenido:req.body.contenido,municipio:req.body.municipio,habilitado:req.body.habilitado};
				
			let noticiaReg=await NoticiaDB.fnRegistrar(noticiaJson);
			res.setTimeout(0);
				
			req.file('fotoNoticia').upload({adapter:require('skipper-s3'),bucket:'fotosmunicipios',
			key:'AKIAIP7R7UMNBUU57EKA',secret:'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'},
			(error,foto)=>{
				
				Noticia.update({id:noticiaReg.id},{foto:foto[0].extra.Location}).exec((error,noticia)=>{
					if(error) res.send({noticia:null});
					console.log(noticia[0]);
					res.send({noticia:noticia[0]});
				})

			})
		} catch (error) {
			res.negotiate(error);
		}
		
	},

	fnEditar:(req,res)=>{

		Noticia.findOne({id:req.params.id}).exec(function(error,noticia){
			if(error){res.negotiate(error)}
			res.view('Noticias/NoticiaEditar',{layout:'../views/Layouts/Layout-4',noticia:noticia,municipio:noticia.municipio})
		})	
	},

	fnActualizar1:(req,res)=>{

		var filtro={id:req.params.id}

		var campos={titulo:req.body.titulo,resumen:req.body.resumen,
			contenido:req.body.contenido,relevancia:req.body.relevancia,
			municipio:req.body.municipio,habilitado:req.body.habilitado
		}

		Noticia.update(filtro,campos).exec(function(error,noticia){
			if(error) {res.negotiate(error)}
			console.log(noticia);
			res.send({noticia:noticia[0]});
		})
	},

	fnActualizar2:(req,res)=>{
		
		var filtro={id:req.params.id}
		var campos={titulo:req.body.titulo,resumen:req.body.resumen,
			contenido:req.body.contenido,relevancia:req.body.relevancia,
			municipio:req.body.municipio,habilitado:req.body.habilitado
		}

		Noticia.update(filtro,campos)
		.then(function whenDone(noticia){
				req.file('foto').upload({
				adapter:require('skipper-s3'),
				bucket:'fotosmunicipios',
				key:'AKIAIP7R7UMNBUU57EKA',
				secret:'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'
		},function whenDone(error,archivo){
				if(error) return res.negotiate(error);	

				Noticia.update(filtro,{foto:archivo[0].extra.Location})
				.then(function(noticia){
					console.log(noticia);
					res.send({noticia:noticia[0]});
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
	fnEliminar:(req,res)=>{

		Noticia.destroy({id:req.body.id}).exec(function(error,noticia){
			if(error) {res.send(null)};
			res.send({noticia:noticia});
		})
	},	

	fnConsultar:async (req,res)=>{
		var id=req.params.id;
		
		try{
			let noticia=await NoticiaDB.fnConsultarNoticia(id);
			let noticiasMun=await NoticiaDB.fnConsultarNoticiasMun(noticia.municipio);
			console.log(noticia);
			console.log(noticiasMun);
			res.view('Noticias/Noticia',{noticia:noticia,noticiasMun:noticiasMun});
		}catch(error){
			console.log(error);
		}	
	}

};

