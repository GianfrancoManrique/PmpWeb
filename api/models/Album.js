/**
 * Album.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:"Album",
  attributes: {
    	id:{
        primaryKey:true,
        type: "integer",
        autoIncrement: true,
        unique: true
      }, 
      titulo:{
        type:"String",
        size:"500"
      },     
      fotos:{
         collection:"Foto",via:"album"
      },
      habilitado:'boolean'
  }
};

