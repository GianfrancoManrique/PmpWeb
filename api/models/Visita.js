/**
 * Visita.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'Visita',

  attributes: {
    id:{
			   primaryKey:true,
  			 type: 'integer',
  			 autoIncrement: true,
  			 unique: true
		},  
    grupo:{
       type:'string',
       size:'250',
       defaultsTo:''
    },
    item:{
      type:'string',
      size:'250',
      defaultsTo:''
    },
    municipio:{
      model:'Municipio'
    }
  }
};

