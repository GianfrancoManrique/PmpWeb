/**
 * Tramite.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"Tramite",	
  attributes: {
  	id:{
		primaryKey:true,
		type: "integer",
		autoIncrement: true,
		unique: true  
	},	
	nombre:{
		type:"string",
		size:"500"
	},
	modulo:{
		model:"Modulo"
	},
	area_tramite:{
		type:"string",
		size:"300"
	},
	atencion:{
		type:"string",
		size:"300"
	},
	pago:'boolean',
	base_legal:{
		type:"string",
		size:"500"
	},
	notas_procedimiento:{
		type:"string",
		size:"500"
	},
	notas_requisitos:{
		type:"string",
		size:"500"
	},
	archivo_adjunto:{
		type:"string",
		size:"500"
	},
	nombre_archivo:{
		type:"string",
		size:"300"
	},
	municipio:{
		model:"Municipio"
	},
	requisitos:{
		collection:"Requisito",
		via:"tramite"
	},
	derechos:{
		collection:"DerechoPago",
		via:"tramite"
	},	
	autoridad_competente:{
		type:"string",
		size:"500"
	},
	instancia_reconsideracion:{
		type:"string",
		size:"500"
	},
	instancia_apelacion:{
		type:"string",
		size:"500"
	},
	habilitado:"boolean"
  }
};

