/**
 * Autoridad.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"Autoridad",
  attributes: {
  	id:{
	    primaryKey:true,
  		type: "integer",
  		autoIncrement: true,
  		unique: true
	},  	
	nombres:{
      type:"string",
      size:"100",
			defaultsTo:''
    },
    apellidos:{
      type:"string",
      size:"150",
			defaultsTo:''
    },
    foto:{
      type:"text",
			defaultsTo:''
    },
    tipo:{  	
    	type:"string",
  		size:"1",
			defaultsTo:''
  	},
  	resena:{
  		type:"text",
			defaultsTo:''
  	},  	 
  	municipio:{  	
    	model:"Municipio"  	
    },
  	habilitado:"boolean"
  }
};

