/**
 * DerechoPago.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"DerechoPago",	
  attributes: { 
  	id:{
		primaryKey:true,
		type: "integer",
		autoIncrement: true,
		unique: true  
	},		
  	tramite:{
  		model:"Tramite"
  	},
  	tributo:{
  		type:"string",
  		size:"500"
  	},
  	importe:{
  		type:"float"
  	}
  }
};

