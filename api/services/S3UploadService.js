let AWS = require('aws-sdk');
var fs = require('fs');

let upload_file = (file_path, file_key, callback)=> {
  AWS.config.loadFromPath('./config.json');
  //let s3 = new AWS.S3({apiVersion: '2006-03-01'});
  let s3 = new AWS.S3();
  fs.readFile(file_path, function (err, data) {
    var params = {
      //Key: sails.config.s3_config.base_key+'/'+file_key,
      //Key: 'fotos/'+file_key,
      Key:file_key,
      Body: data,
      Bucket : 'fotosmunicipios'
    };
    s3.upload(params,function (error, result) {
        console.log(result);
      return callback(error, result);
    });
  });
}

module.exports = {
  upload_file : upload_file
}