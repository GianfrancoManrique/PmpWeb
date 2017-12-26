/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	fnIngresar:function(req,res){

		var rutaInicio='/';
		var credenciales={
			usuario:req.body.usuario,
			contrasena:req.body.contrasena
		}

		Usuario.findOne(credenciales).populate('municipio')				  
		.then(function(usuario){
			
			if(usuario) {
				let nombres=usuario.nombres?usuario.nombres.toUpperCase():'';
				let apellidos=usuario.apellidos?usuario.apellidos.toUpperCase().substring(0,1):'';
				req.session.user = nombres.concat(' ',apellidos,'.');
				if(usuario.tipo=='SA'){
					rutaInicio='/Municipio/Listar';
				}else{
					req.session.distrito = usuario.municipio.distrito;
					rutaInicio='/General/'+usuario.municipio.id;
				}
			}
			res.redirect(rutaInicio);
		})
		.catch(function(error){			
			res.negotiate(error)			
		})

	},

	fnSalir:(req,res)=>{
		req.session.destroy();
		res.redirect('/');
	},
	
	fnAgregar:async (req,res)=>{
		try {
			let municipio=await Municipio.findOne({id:req.params.id});
			let tiposDoc=await TipoDocumento.find({habilitado:true});			
			res.view('Administradores/AdminRegistrar',{layout:'../views/Layouts/Layout-1',municipio:municipio,tiposDoc:tiposDoc})
		} catch (error) {
			res.negotiate(error);
		}		
	},

	fnRegistrar:async(req,res)=>{
		try {
			let campos={tipodoc:req.body.tipodoc,numdoc:req.body.numdoc,nombres:req.body.nombres,
				apellidos:req.body.apellidos,correo:req.body.correo,tipo:'AM',
				municipio:parseInt(req.body.municipio),cargo:req.body.cargo,
				resolucion:req.body.resolucion,fecresolucion:req.body.fecresolucion,habilitado:true}
			
			let numAdmin=await Usuario.count().where({municipio:campos.municipio,habilitado:true,tipo:campos.tipo})

			if(numAdmin==0){				
				let usuarioN=await Usuario.create(campos);
				let usuario=usuarioN.tipo.concat(usuarioN.id);
				let contrasena=await UsuarioDB.fnGenerarContraseña();
				let usuarioA=await Usuario.update({id:usuarioN.id},{usuario:usuario,contrasena:contrasena});
				res.redirect('/Municipio/Listar');
			}else{
				res.send('Municipio ya cuenta con administrador');
			}
		} catch (error) {
			res.negotiate(error);
		}
	},

	fnEditar:async(req,res)=>{
		
		try {
			let usuario=await Usuario.findOne({id:req.params.id});
			let municipio=await Municipio.findOne({id:usuario.municipio});
			let tiposDoc=await TipoDocumento.find({habilitado:true});
			res.view('Administradores/AdminEditar',{layout:'../views/Layouts/Layout-1',usuario:usuario,
			municipio:municipio,tiposDoc:tiposDoc})
		} catch (error) {
			res.negotiate(error);
		}	
	},

	fnActualizar:async(req,res)=>{

		var filtro={id:req.params.id};

		var campos={tipodoc:req.body.tipodoc,numdoc:req.body.numdoc,nombres:req.body.nombres,
			apellidos:req.body.apellidos,correo:req.body.correo,cargo:req.body.cargo,
			resolucion:req.body.resolucion,fecresolucion:req.body.fecresolucion,
			habilitado:req.body.habilitado=='on'?true:false};

		console.log(campos);
		
		Usuario.update(filtro,campos).exec(function(error,usuario){
			if(error) res.negotiate(error)
			res.redirect('/Municipio/Listar');
		})

	},

	fnEliminar:async(req,res)=>{
		try {
			let usuario=await Usuario.destroy({id:req.body.id})
			res.send({usuario:usuario[0]});
		} catch (error) {
			res.send({usuario:null});
		}
	},
	deshabilitar:function(req,res){
		
		var _id=req.params.id;	
		var _habilitado=0;

		Usuario.update({id:_id},{habilitado:_habilitado})

		.then(function(usuario){

			res.redirect('/Usuario/listar');

		})

		.catch(function(error){

		   res.negotiate(error);

		})

	},
	fnListar:(req,res)=>{

		Usuario.find({municipio:req.params.municipio})
		.then(function(usuarios){
			res.send({usuarios:usuarios});
		})
		.catch(function(error){
 			res.send({usuarios:null});
		})
	},


};

