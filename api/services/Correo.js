let nodemailer = require('nodemailer');

let Correo ={
    //fnEnviarCorreo:async(destinatario,nombres,apellidos)=>{
    fnEnviarCorreo:async(destinatario,nombres,apellidos,usuario,contrasena)=>{
        try {
            let transporter = await nodemailer.createTransport(
                {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {user: 'gmanrique.422@gmail.com',pass: 'uiop1357'}
                }
            );
            let mailOptions = {
                from: 'gmanrique.422@gmail.com', // sender address
                to: destinatario, // list of receivers
                subject: 'Bienvenido a PMP', // Subject line
                text: 'Estimado '+nombres+' '+apellidos+' sus credenciales de acceso son usuario: '+
                usuario+' contraseña: '+contrasena, // plain text body
                html:Plantilla.Plantilla1.replace('[nombres]',nombres)
                                         .replace('[apellidos]',apellidos)
                                         .replace('[usuario]',usuario)
                                         .replace('[contrasena]',contrasena)
            };
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports=Correo;