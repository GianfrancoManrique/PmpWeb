$(document).ready(function(){

	var _url=String.empty;
	
	$('#btnGuardarAlcalde').on('click',fnGuardarAlcalde)

	//Gestion de regidores	
	$('button[id^="btnGuardarRegidor"]').on('click',fnGuardarRegidor);	

})

function fnGuardarAlcalde(e){
	
	e.preventDefault();

	var formData = new FormData();
	formData.append('nombres',$('#txtNomAlcalde').val());
	formData.append('apellidos',$('#txtApellAlcalde').val());
	formData.append('tipo','A');
	formData.append('resena',$('#txtResena').val());
	formData.append('municipio',$('#txtIdMunicipio').val());
	formData.append('habilitado',true);
	
	if($('#txtNomAlcalde').val()==''){
		alert('Nombre de alcalde no válido.');
		return;
	}
		
	if($('#txtApellAlcalde').val()==''){
		alert('Apellido de alcalde no válido.');
		return;
	}
		
	if(document.getElementsByClassName('kv-file-content').length==0){
		alert('No se ha cargado la foto del alcalde.');
		return;
	}else{
		formData.append('fotoAlcalde',$('#fotoAlcalde')[0].files[0]);	
	}

	$.ajax({
		url:'/Alcalde/Registrar',
		data: formData,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
			alert('Alcalde creado.');
			window.location.href = "/Alcalde/"+$('#txtIdMunicipio').val();
			/*
			if(id=='0'){
				window.location.href = "/Autoridades/"+$('#txtIdMunicipio').val(); 
			}else{
				window.location.href = "/Autoridades/"+$('#txtIdMunicipio').val(); 
			}
			*/			  	
		}
	});
}

function fnGuardarRegidor(e){

	var button=e.target.id;
	var id=button.substring(17);
	var _idRegidor=id;
	var _fotoRegidor=$('#fRegidor'+id).val();
	var _nomRegidor=$('#txtNomReg'+id).val();
	var _apellRegidor=$('#txtApellReg'+id).val();
	var _municipio=$('#txtIdMunicipio').val();
	var _habilitado=$('#cbEstadoReg'+id).is(':checked')?1:0;
	var _regidor={}
	
	_url=_idRegidor=='0'?'/regidor/registrar':'/regidor/actualizar/'+_idRegidor;

	var formData = new FormData();
	formData.append('id',_idRegidor);
	formData.append('nombres',_nomRegidor);
	formData.append('apellidos',_apellRegidor);
	formData.append('tipo','R');
	formData.append('municipio',_municipio);
	formData.append('habilitado',_habilitado);
	if($('#fRegidor'+id)[0].files.length>0){
		formData.append('fotoRegidor',$('#fRegidor'+id)[0].files[0]);	
		formData.append('archRegidor',$('#fRegidor'+id)[0].files[0].name);	
		formData.append('flagArchRegidor',1);	
	}else{
		formData.append('flagArchRegidor',0);	
	}
	
	$.ajax({
	  url:_url,
	  data: formData,
	  processData: false,
	  contentType: false,
	  type: 'POST',
	  success: function(data){

	  	if(_idRegidor=='0'){
	  		alert('Regidor con id '+data[0].id+ ' registrado.');
	  	}else{
	  		alert('Información de regidor '+_nomRegidor+' '+_apellRegidor+' actualizada.');
	  	}		
	  	

	  }
	});
}

