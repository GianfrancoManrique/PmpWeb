//Carga inicio
$(document).ready(function(){

	var _usuario=$("#txtUsuario").val();
	var _contrasena=$("#txtContrasena").val();

	if(typeof(Storage)!=="undefined"){

		localStorage.usuario=_usuario;
		localStorage.contrasena=_contrasena;
	}

})