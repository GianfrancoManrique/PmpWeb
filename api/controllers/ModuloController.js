/**
 * ModuloController
 *
 * @description :: Server-side logic for managing Moduloes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Logger = require('le_node');
var log = new Logger({
  token:'ed019d1b-4a92-429a-8260-76b7f31f3a71'
});

module.exports = {
	
	fnRegistrar:function(req,res){
		var campos={
			area:req.body.area,
			comentario:req.body.comentario,
			habilitado:req.body.habilitado=="true"?1:0,
			municipio:req.body.municipio
		}

		console.log(campos);
		Modulo
			.create(campos)
			.then(function(modulo){		
				console.log(modulo);		
				res.send(modulo);
			})
			.catch(function(error){
				console.log(error);	
				res.send(null);
			})
	},
	fnActualizar:function(req,res){
		var filtro={
			id:req.body.id
		}
		var campos={
			area:req.body.area,
			comentario:req.body.comentario,
			habilitado:req.body.habilitado=="true"?1:0,
			municipio:req.body.municipio
		}

		Modulo
			.update(filtro,campos)
			.then(function(modulo){	
				console.log(modulo);	
				res.send(modulo);
			})
			.catch(function(error){
				console.log(error);	
				res.send(null);
			})
	},
	fnListar:(req,res)=>{
		Modulo.find().sort("id ASC").where({municipio:req.params.municipio}).exec(function(error,modulos){
			if(error) res.negotiate(error);
			res.view('Tupa/ModuloListar',{layout:'../views/Layouts/Layout-4',modulos:modulos,municipio:req.params.municipio});
		})			
	},
	fnListarAjax:(req,res)=>{
		Modulo.find().sort("id ASC").where({municipio:req.params.municipio}).exec(function(error,modulos){
			if(error) res.send(null);
			res.send(modulos);
		})
	},
	fnEditarAjax:(req,res)=>{
		Modulo.findOne({id:req.params.id}).exec(function(error,modulo){
			if(error) res.send(null);
			console.log(modulo);
			res.send({modulo:modulo});
		})
	},
	fnEliminarAjax:(req,res)=>{
		Modulo.destroy({id:req.body.id}).exec(function(error,modulo){
			if(error) res.send(null);
			console.log(modulo);
			res.send({modulo:modulo});
		})
	}
};

