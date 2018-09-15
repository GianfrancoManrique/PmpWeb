//Passport Local
let bcrypt = require('bcrypt');
let passport = require("passport");
let passportLocal = require("passport-local").Strategy;


  passport.serializeUser(function(usuario, done) {
    done(null, usuario);
  });
   
   passport.deserializeUser(function(usuario, done) {

     Usuario.find({id:usuario.id}).populate('municipio').exec(function(err,usuario){
      done(err, usuario);
     });
     
   });

   passport.use(new passportLocal(
    {
      usernameField: "usuario",
      passwordField: "contrasena"
    },
    (usuario, contrasena, done)=>{
      console.log("Usuario: "+usuario);
      console.log("Contraseña: "+contrasena);
      
      Usuario.find({usuario:usuario}, async (err, datos)=>{
        
        if(err) {
          return done(false, null)
        };
  
        if(datos.length>0) {
          bcrypt.compare(contrasena, datos[0].contrasena).then(function(res) {
            res=true;//Comentar
            if (res){
              return done(null, datos[0]);
            }else{
                return done(false, null)
            }
          });
          /*
          let logeado=await bcrypt.compareSync(contrasena,datos[0].contrasena);
            if (logeado){
                return done(null, datos[0]);
            }else{
                return done(false, null)
            }
          */
        } else {
          return done(false, null);
        }
  
      });
  
    }
  ));