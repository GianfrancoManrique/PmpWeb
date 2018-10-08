/**
 * AlbumController
 *
 * @description :: Server-side logic for managing Albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

var moment   = require('moment'),
	       _ = require('lodash');
module.exports = {
    fnMostrar:async (req,res)=>{
        try {
            let municipio=await Municipio.findOne({id:req.params.municipio});
            let comando='SELECT id,titulo,habilitado,foto from sp_consultaralbumsxmunicipio('
            comando=comando.concat(req.params.municipio,')');

            Album.query(comando,(error,resultado)=>{
				let albums=resultado.rows?resultado.rows:null;
				res.view('Portal/Albums',{albums:albums,municipio:municipio});         
		 	})     
          
        } catch (error) {
            res.negotiate(error);
        }
    },
    fnConsultarFotos:async(req,res)=>{
        try {
            let album=await Album.findOne({id:req.params.album});
            let fotos=await Foto.find({album:req.params.album});      
            res.view('Portal/Fotos',{fotos:fotos,album:album});             
        } catch (error) {
            res.negotiate(error);
        }
    },
    fnEditar:function(req,res){

        var id=req.params.id;
        var fotos=[];
        Album
        .findOne({select:['id','titulo']})
        .populate('fotos')
        .where({id:id})					  
        .then(function(album){		
            album.fotos.forEach((foto)=>{
                 fotos.push(foto.url);
            })            
            res.view('Fotos/AlbumEditar',{layout:'../views/Layouts/Layout-4',municipio:album.fotos[0].municipio,album:album,fotos:fotos});			
        })
        .catch(function(error){			
            res.negotiate(error);		
        })	
    },
    fnSubir:async(req,res)=>{
    
        try {			          
            //Carga de fotos
            req.file('fotos').upload(async (err, uploadedFiles)=> {
            var fotos = [];
            //Creacion de album
            let titulo="SIN TITULO";
            if(req.body.tipo==="album"){
                titulo=req.body.descripcion;
            }
            
            let albumReg=await Album.create({titulo:titulo,habilitado:true});
            //Creacion de fotos
            let descripcion='';
            if(req.body.tipo==="album"){
                descripcion=req.body.tipo;
            }
            let municipio=req.body.municipio;
            async.each(uploadedFiles,
                (uploadedFile, callback) =>{
                    //console.log(uploadedFile);       
                    let ext=uploadedFile.filename.split('.').pop();
                    S3UploadService.upload_file(uploadedFile.fd,Date.now().toString()+"."+ext,(error, fileS3)=> {
                        fotos.push(fileS3);
                        //Foto.create({descripcion:descripcion,municipio:req.body.municipio,
                        //url:fileS3.Location,album:albumReg.id}).exec();
                        callback(error, fileS3);
                    });
                }
                , async (error)=> {
                if (error) {
                    console.log(error);
                } else {
                    let resultado=await FotoDB.fnCrearFotos(fotos,descripcion,municipio,albumReg.id); 
                    if(resultado){
                         res.redirect('/Foto/Listar/'+req.body.municipio);     
                    }                  
                }
                });
           });
        } catch (error) {
            console.log(error);
        }
    },
    fnActualizar:async(req,res)=>{
        try {
            //Album
            let album=await AlbumDB.fnActualizar({id:req.params.id},{titulo:req.body.descripcion});
            //Fotos
              let fotos = [];
              req.file('fotos').upload(async (err, uploadedFiles)=> {
                if(uploadedFiles.length==0){
                    res.redirect('/Foto/Listar/'+req.body.municipio);    
                }else{
                    async.each(uploadedFiles,(uploadedFile, callback) =>{     
                        S3UploadService.upload_file(uploadedFile.fd,uploadedFile.filename,(error, fileS3)=> {
                            fotos.push(fileS3);
                            callback(error, fileS3);
                        });
                    },
                    async (error)=> {
                        if (error) {console.log(error)};

                        let resultado=await FotoDB.fnCrearFotos(fotos,req.body.descripcion,
                        req.body.municipio,req.params.id); 
                        if(resultado){
                            res.redirect('/Foto/Listar/'+req.body.municipio);     
                        }                  

                    });
                }
              })
            //res.send({album:album});
        } catch (error) {
            console.log(error);
        }
    },
    fnEliminar:async(req,res)=>{
      	try {
			let album=await AlbumDB.fnEliminar({id:req.body.id});
			let fotos=await FotoDB.fnEliminar({album:album.id});
			res.send({album:album});
		} catch (error) {
			res.send({tramite:null});
		}
    }
};

