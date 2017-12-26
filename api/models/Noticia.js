/**
 * Noticia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	  tableName:"Noticia",
	  attributes: {
	  	id:{
		  primaryKey:true,
	  	  type: "integer",
	  	  autoIncrement: true,
	  	  unique: true
	   }, 
	   titulo:{
	     type:"string",
	     size:"500"
	   },
	   resumen:{
		type:"string",
		size:"300"
	   },
	   foto:"text",
	   contenido:{
	   	 type:"text"
	   },
	   relevancia:"integer",
	   habilitado:{
	   	 type:"boolean"
	   },
	   municipio:{
		 model:"Municipio"
	   }
	}
};

