/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:"Usuario",

	 attributes:{
	
  	id:{
	   		primaryKey:true,
  			type: "integer",
  			autoIncrement: true,
  			unique: true        
		},
    numdoc:{
      type:"string",
      size:"20"
    },
    nombres:{
      type:"string",
      size:"100"
    },
    apellidos:{
      type:"string",
      size:"150"
    },
    correo:"email",
		usuario:{
      type:"string",
      size:"11"
    },
    contrasena:{
      type:"string",
      size:"8"
    },		
  	tipo:{  	
    	type:"string",
  		size:"2"
  	},
    cargo:{
      type:"string",
  		size:"300"
    },
    resolucion:{
      type:"string",
  		size:"300"
    },
    fecresolucion:{
      type:"string",
  		size:"10"
    },
  	municipio:{  	
    	model:"Municipio"  	
    },
    tipodoc:{
      model:"TipoDocumento"
    },
  	habilitado:"boolean"
	}
};

