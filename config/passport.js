//Passport Local
let passport = require("passport");
let passportLocal = require("passport-local").Strategy;


  passport.serializeUser(function(usuario, done) {
    done(null, usuario);
  });
   
   passport.deserializeUser(function(usuario, done) {
     done(null, usuario);
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
          console.log(datos[0]);
          let bcrypt = require('bcrypt');
          bcrypt.compare(contrasena,datos[0].contrasena,(err,res)=>{
            if (res){
                return done(null, datos[0]);
            }else{
                return done(false, null)
            }
          });

        } else {
          return done(false, null);
        }
  
      });
  
    }
  ));