let Contraseña ={
    fnGenerar:async()=>{
        try {
            let contraseña='';
            let min=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; 
            let simbolo =['?','¿','!','¡','.',',','´','*','+','-','_']; 
            let veces=8;
            for (var i = 0; i < veces; i++) { 
                num = Math.floor((Math.random() * 10) + 1); 
                contraseña = contraseña + num; 
            } 
            return contraseña;
        } catch (error) {
            console.log(error);
        }
    }
};
  
module.exports = {
    Contraseña : Contraseña
}