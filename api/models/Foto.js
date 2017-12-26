/**
 * Foto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"Foto",
  attributes: {
      id:{
        primaryKey:true,
        type: "integer",
        autoIncrement: true,
        unique: true
      }, 
      nombre_archivo:'text',
      descripcion:{
        type:"String",
        size:"500"
      },
      municipio:{
        model:"Municipio"
      },
      url:"text",      
      album:{
        model:"Album"
      }
  }
};

