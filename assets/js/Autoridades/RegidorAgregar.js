$(document).ready(function(){

	var _url=String.empty;	
	//$('#btnGuardarRegidor').on('click',fnGuardarRegidor)
})
/*
function fnGuardarRegidor(e){
	
	e.preventDefault();

	var formData = new FormData();
	formData.append('nombres',$('#txtNomRegidor').val());
	formData.append('apellidos',$('#txtApellRegidor').val());
	formData.append('tipo','R');
	formData.append('municipio',$('#txtIdMunicipio').val());
	formData.append('habilitado',true);
	formData.append('fotoRegidor',$('#fotoRegidor')[0].files[0]);	
	console.log($('#fotoRegidor')[0].files[0]);
	if($('#txtNomRegidor').val()==''){
		alert('Nombre no válido.');
	}else if($('#txtApellRegidor').val()==''){
		alert('Apellido no válido.');
	}else if($('#fotoRegidor')[0].files[0].length==0 && id==0){
		alert('Regidor requiere una foto.');
	}else{		
		$.ajax({
			url:'/Regidor/Registrar',
			data: formData,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				alert('Regidor creado.');
				window.location.href = '/Regidor/Listar/'+$('#txtIdMunicipio').val();		  	
			}
		});
	}
}
*/

