/**
 * Modulo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  tableName:"Modulo",
  attributes: {
  	id:{
		primaryKey:true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
	},  	
	area:{
		type:"string",
    	size:"250"
	},
	comentario:{
		type:"string",
		size:"300"
	},
	habilitado:"boolean",
	municipio:{
		model:"Municipio"
	},
	tramites:{
		collection:"Tramite",
      	via:"modulo"
	}
  }
};

