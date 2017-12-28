$(document).ready(function(){

	var _url=String.empty;
	
	$('#btnGuardarAlcalde').on('click',fnGuardarAlcalde)
	$('#btnEliminarAlcalde').on('click',fnEliminarAlcalde)

})

function fnGuardarAlcalde(e)
{
	var url=String.empty;
	e.preventDefault();
    
	var formData = new FormData();
	formData.append('nombres',$('#txtNomAlcalde').val());
	formData.append('apellidos',$('#txtApellAlcalde').val());
	formData.append('resena',$('#txtResena').val());
	formData.append('municipio',$('#txtIdMunicipio').val());
	formData.append('habilitado',true);

	if($('#fotoAlcalde')[0].files[0]==undefined){
		url='/Alcalde/Actualizar1/'+$('#txtIdAlcalde').val();
		if(document.getElementsByClassName('kv-file-content').length==0){
			alert('No se ha cargado foto del alcalde.');
			return;
		}
	}else{
		formData.append('fotoAlcalde',$('#fotoAlcalde')[0].files[0]);	
		url='/Alcalde/Actualizar2/'+$('#txtIdAlcalde').val();
	}

	if($('#txtNomAlcalde').val()==''){
		alert('Nombre no válido.');
	}else if($('#txtApellAlcalde').val()==''){
		alert('Apellido no válido.');
	}else{		
		$.ajax({
			url:url,
			data: formData,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				alert('Alcalde actualizado.');
				window.location.href = "/Alcalde/"+$('#txtIdMunicipio').val();		
			}
		});
	}
}

function fnEliminarAlcalde(e){
	e.preventDefault();
	
	var municipio=$('#txtIdMunicipio').val();
	var formData = new FormData();
	formData.append('municipio',municipio);
	$( '#dialog-confirm' ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        'Eiminar': function() {	
			var url='/Alcalde/Eliminar/'+municipio;
			$.ajax({
				url:url,
				data: formData,
				processData: false,
				contentType: false,
				type: 'POST',
				success: function(data){
					$( '#dialog-confirm' ).dialog( "close" );
					alert('Alcalde eliminado');
					window.location.href = "/Alcalde/"+municipio;		
				}
			});		
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
}