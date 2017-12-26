/**
 * FotoController
 *
 * @description :: Server-side logic for managing Fotoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	fnAgregar:(req,res)=>{
		res.view('Fotos/FotoAgregar',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio})
	},
	fnAgregar2:(req,res)=>{
		res.view('Fotos/FotoAgregar2',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio})
	},
	fnConsultarAlbums:async (req,res)=>{
		try {			
			let comando='SELECT id,titulo,habilitado,feccreado,fecmodificado from sp_consultaralbumsxmunicipio('
            comando=comando.concat(req.params.municipio,')');

            Foto.query(comando,(error,resultado)=>{
				let albums=resultado.rows?resultado.rows:null;
				res.view('Fotos/FotoListar',{layout:'../views/Layouts/Layout-4',municipio:req.params.municipio,albums:albums})         
		 	})          
		} catch (error) {
			console.log(error);
		}
	},

	Listar:function(req,res){

		var aws = require('aws-sdk');	
		aws.config.loadFromPath('./config.json');
		var s3 = new aws.S3();
		
		//s3.createBucket({Bucket: "gmv20170104"}, function(error,data){});

		var params={
			Bucket: "fotosmunicipios",
			Key:"mimunicipio/",
		 	Body:"Hola mundo"
		};

		/*
		s3.putObject(params,function(error,data2){
			if(error){
				console.log(error)
			}else{
				console.log(data2);
			}
		});		
		*/

		var params2={
			Bucket: "fotosmunicipios",
			Prefix: 'mimunicipio/',
		};


		s3.listObjects(params2,function(error,data){	

			if(error){
				console.log(error);
			}else{
				console.log(data);
			}

		})
	},
	fnSubir:(req,res)=>{
		console.log('Hola');
	},
	fnEliminar:async(req,res)=>{
		try {
			let  foto=await FotoDB.fnEliminar({id:req.body.id});
			res.send({foto:foto});
		} catch (error) {
			res.send({foto:null});
		}
	}
};

