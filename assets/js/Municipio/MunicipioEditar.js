$(document).ready(function(){
	
	var _html='';
	var url='';

	$('#btnAgregarTel').on('click',fnAgregarTelefono);

	$('#btnGuardarMunicipio').on('click',fnGuardarMunicipio);
	$('#btnGuardarRedes').on('click',fnGuardarMunicipio);

	$('a[id^="lnkTel"').on('click',fnEliminarTelefono);

})
function fnGuardarMunicipio(e){
		e.preventDefault();
		
		var formData=new FormData()
		formData.append('id',$('#txtId').val());	
		formData.append('correo',$('#txtCorreo').val());
		formData.append('urlFacebook',$('#txtFacebook').val());
		formData.append('urlTwitter',$('#txtTwitter').val());
		formData.append('urlYoutube',$('#txtYoutube').val());
		formData.append('mision',$('#txtMision').val());
		formData.append('vision',$('#txtVision').val());
		formData.append('valores',$('#txtValores').val());
		formData.append('lema',$('#txtLema').val());

		var _url='/Municipio/ActualizarGral';

		 $.ajax({
		      url:_url,
		      data: formData,
		      processData: false,
		      contentType: false,
		      type: 'POST',
		      success: function(data){
		         alert(data.mensaje);
				 window.location.href='/General/'+$('#txtId').val();
		      }
		 });
}

function fnAgregarTelefono(e){
		
		e.preventDefault();

		var telefono=new Object();
		telefono.tipo=$('#listaItemsTel').val();
		telefono.numero=$('#txtNumTel').val();
		telefono.municipio=$('#txtId').val();
		telefono.habilitado=1;

		if(telefono.tipo=='-'||telefono.numero==''){
			alert('Se requiere ingresar todos los parámetros.');
		}else{
			var formDataTel=new FormData();
			formDataTel.append('telefono',JSON.stringify(telefono));
			var url='/Telefono/Registrar';
			 $.ajax({
		      url:url,
		      data: formDataTel,
		      processData: false,
		      contentType: false,
		      type: 'POST',
		      success: function(data){
		         //MostrarTelefono(data);
		         var tr=document.createElement('tr');
		         var td1=document.createElement('td');
		         td1.innerHTML=data.tipo;
		         var td2=document.createElement('td');
		         td2.innerHTML=data.nombre;
		         var td3=document.createElement('td');
		         td3.innerHTML=data.numero;
		         var td4=document.createElement('td');
		         var a=document.createElement('a')
		         a.id='lnkTel'+data.id;
		         a.innerHTML='Eliminar';
		         td4.appendChild(a);
		         tr.appendChild(td2);
		         tr.appendChild(td3);
		         tr.appendChild(td4);
		         $('#tbTelefonos').append(tr);
				 $('#txtNumTel').val('');
				 $('#listaItemsTel').val('');
		      }
		 	});	
		}	
}

function fnEliminarTelefono(e){

	var id=e.target.id;
	id=id.substring(6);

	var telefono={id:id};

	var formDataTel=new FormData();
	formDataTel.append('telefono',JSON.stringify(telefono));

	$.ajax({
		      url:'/Telefono/Eliminar',
		      data: formDataTel,
		      processData: false,
		      contentType: false,
		      type: 'POST',
		      success: function(data){		     
		       	alert('Teléfono '+data[0].numero+' eliminado.');
				$('#tr'+id).remove();
		      }
	});	
}

function fnMostrarTelefono(telefono){
		var tr=document.createElement('tr');
		tr.id='trTel'+telefono.id;
		tr.className='info';

		var td1=document.createElement('td');
		td1.innerHTML=telefono.tipo;
		tr.append(td1);

		var td2=document.createElement('td');
		td2.innerHTML=telefono.numero;
		tr.append(td2);

		var td3=document.createElement('td');
		td3.innerHTML=$('#txtNumTel').val();
		tr.append(td3);

		var td4=document.createElement('td');

		var button=document.createElement('button');
		button.id='btnEliminar'+fila;
		button.innerHTML='Eliminar';
		button.addEventListener('click',EliminarTelefono,false);
		td4.append(button);
		tr.append(td4);

		$('#tbTelefonos').append(tr);
}