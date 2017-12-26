/**
* Municipalidad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
 
  tableName:'Municipio',

	attributes:{
		id:{
			   primaryKey:true,
  			 type: 'integer',
  			 autoIncrement: true,
  			 unique: true
		},  	  
    url:{type:'string',defaultsTo:''},
    departamento:{type:'string',defaultsTo:''},
    provincia:{type:'string',defaultsTo:''},
    distrito:{type:'string',defaultsTo:''},
    comentario:{type:'string',defaultsTo:''},
    correo:{
      type:'string',
      size:'250',
      defaultsTo:''
    },
    urlFacebook:{
      type:'string',
      size:'250',
      defaultsTo:''
    },
    urlTwitter:{
      type:'string',
      size:'250',
      defaultsTo:''
    },
    urlYoutube:{
      type:'string',
      size:'250',
      defaultsTo:''
    },
    mision:{type:'text',defaultsTo:''},
    vision:{type:'text',defaultsTo:''},
    valores:{type:'text',defaultsTo:''},
    habilitado:'boolean',
    telefonos:{
      collection:'Telefono', via:'municipio'
    },
    usuarios:{
        collection:'Usuario', via:'municipio'       
    },
    autoridades:{
       collection:'Autoridad',via:'municipio'
    },
    modulos:{
       collection:'Modulo',via:'municipio'
    },
    noticias:{
      collection:'Noticia',via:'municipio'
    },
    fotos:{
      collection:'Foto',via:'municipio'
    },
    visitas:{
      collection:'Visita',via:'municipio'
    },
    lema:{type:'String',size:300,defaultsTo:''}
	}
	
};

