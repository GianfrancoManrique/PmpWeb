$(document).ready(function(){
    $('#btnGuardarRegidor').on('click',fnActualizarRegidor);
	$('#btnEliminarRegidor').on('click',fnEliminarRegidor);
})

function fnActualizarRegidor(e){
   var url=String.empty;
   e.preventDefault();
	
	if($('#txtNomRegidor').val()==''){
		alert('Nombre no válido.');
		return;
	}
	
	if($('#txtApellRegidor').val()==''){
		alert('Apellido no válido.');
		return;
	}
	
	var formData = new FormData();
	formData.append('nombres',$('#txtNomRegidor').val());
	formData.append('apellidos',$('#txtApellRegidor').val());
	formData.append('municipio',$('#txtIdMunicipio').val());
	formData.append('habilitado',$('#cbHabilitado').prop('checked'));

	if($('#fotoRegidor')[0].files[0]==undefined){
		url='/Regidor/Actualizar1/'+$('#txtIdRegidor').val();
		if(document.getElementsByClassName('kv-file-content').length==0){
			alert('No se ha cargado foto del regidor.');
			return;
		}
	}else{
		formData.append('fotoRegidor',$('#fotoRegidor')[0].files[0]);	
		url='/Regidor/Actualizar2/'+$('#txtIdRegidor').val();
	}

	$.ajax({url:url,data: formData,processData: false,contentType: false,type: 'POST',
		success: function(data){
			alert('Regidor actualizado.');
			window.location.href = "/Regidor/Listar/"+$('#txtIdMunicipio').val();		
		}
	});
}

function fnEliminarRegidor(e){
	e.preventDefault();
	
	var municipio=$('#txtIdMunicipio').val();
	var id=$('#txtIdRegidor').val();

	var formData = new FormData();
	$( '#dialog-confirm' ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        'Eiminar': function() {	
			var url='/Regidor/Eliminar/'+id;
			$.ajax({
				url:url,
				data: formData,
				processData: false,
				contentType: false,
				type: 'POST',
				success: function(data){
					$( '#dialog-confirm' ).dialog( "close" );
					alert('Regidor eliminado.');
					window.location.href = "/Regidor/Listar/"+municipio;		
				}
			});		
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
}