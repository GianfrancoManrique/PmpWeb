/**
 * Telefono.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	  tableName:"Telefono",
	  attributes: {
			id:{
		 		primaryKey:true,
		  		type: "integer",
		  		autoIncrement: true,
		  		unique: true  
			},
			numero:{
				type:"string",
				size:"50"
			},
			tipo:{
				model:"TipoTelefono"
			},
			municipio:{
				model:"Municipio"
			},
			habilitado:"boolean"
	  }
};

