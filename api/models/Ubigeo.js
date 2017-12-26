/**
* Municipalidad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
 
  	tableName:"Ubigeo",
	attributes:{	
	  	codigo:{
			 primaryKey:true,
				 type: "string",
				 size:"6",
				 unique: true
		},
		departamento:"string",
		provincia:"string",
		distrito:"string",
		habilitado:"boolean"
	}
	
};

