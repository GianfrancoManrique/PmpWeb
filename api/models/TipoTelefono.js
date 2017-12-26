/**
 * TipoTelefono.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	  tableName:"TipoTelefono",
	  attributes: {
  		id:{
     		primaryKey:true,
    		type: "string",
    		size: "2",
    		unique: true
		},
		nombre:{
			type:"string",
			size:"100"
		},
		habilitado:"boolean"
  	  }
};

