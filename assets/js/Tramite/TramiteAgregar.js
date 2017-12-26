
$(document).ready(function(){

   $( '#tabsTramite' ).tabs();
   /*Configuracion de tabs
   $( '#tabsTramite' ).tabs( 'disable', '#tab-información' )
   $( '#tabsTramite' ).tabs( 'disable', '#tab-requisitos' )
   */
	var filas=0;
	var filasDer=0;
	$('#btnNRequisito').click(GenerarFila);
	$('#btnNDerechoPago').click(GenerarFilaDerPago);
	$('#btnGuardar').on('click',fnGuardar);

	//Zona de funciones
	function GenerarFila(e){  
		e.preventDefault();
		filas=filas+1; 
		var _tr=document.createElement('tr');
		_tr.id='tr'+filas;
		_tr.className='active';
		var _td1=document.createElement('td');
		var _td2=document.createElement('td');
		var _td3=document.createElement('td');
		var _input=document.createElement('input');
		_input.type='number';
		_input.min='1';
		_input.max='100';
		_input.id='numTramite'+filas;
		_input.value=filas;
		var _textarea=document.createElement('textarea');
		_textarea.id='txtRequisito'+filas;  
		_textarea.className='form-control';
		_textarea.rows='3';
		var _link=document.createElement('a');
		_link.id='lnkDel'+filas;
		_link.innerHTML='Eliminar'; 	
		_link.className='btn btn-danger';
		_link.onclick=function(e){		
			filas-=1; 
			var _trDel='#tr'+e.target.id.substring(6);
			$(_trDel).remove();
		}		
		//_textarea.oninput=GenerarFila;  	
		_td1.appendChild(_input);
		_td2.appendChild(_textarea);
		_td3.appendChild(_link);
		_tr.appendChild(_td1);
	_tr.appendChild(_td2);
	_tr.appendChild(_td3);

	$('#tRequisitos').append(_tr);
		
	}

	function GenerarFilaDerPago(e){  

		e.preventDefault();//
		filasDer=filasDer+1; 
		var _tr=document.createElement('tr');
		_tr.id='trDer'+filasDer;
		var _td1=document.createElement('td');
		var _td2=document.createElement('td');
		var _td3=document.createElement('td');
		var _input=document.createElement('input');
		_input.type='text';
		_input.min='1';
		_input.max='100';
		_input.id='txtImporte'+filasDer;
		_input.value='0.00';
		var _textarea=document.createElement('textarea');
		_textarea.rows='1';
		_textarea.cols='110';
		_textarea.id='txtTributo'+filasDer;  
		_textarea.placeholder='Ingrese detalle';
		var _link=document.createElement('a');
		_link.id='lnkDel'+filasDer;
		_link.innerHTML='Eliminar'; 	
		_link.className='btn btn-danger';
		_link.onclick=function(e){		
			var _trDel='#trDer'+e.target.id.substring(6);
			$(_trDel).remove();
		}		
		//_textarea.oninput=GenerarFila;  	
		_td1.appendChild(_textarea);
		_td2.appendChild(_input);
		_td3.appendChild(_link);
		_tr.appendChild(_td1);
	_tr.appendChild(_td2);
	_tr.appendChild(_td3);

	$('#tDerechosPago').append(_tr);
		
	}

	function fnGuardar(){  			  		
		
		var requisitos=[];
		var derechosPago=[];
		var formData = new FormData();

		formData.append('nombre',$('#txtNombre').val());
		formData.append('modulo',$('#listaModulos').val());
		formData.append('area_tramite',$('#txtAreaTramite').val());
		formData.append('atencion',$('#txtAtencion').val());
    	formData.append('pago',$('#cbPago').val()=='on'?true:false);

		formData.append('base_legal',$('#txtBaseLegal').val());
		formData.append('notas_procedimiento',$('#txtNotasProcedimiento').val());
		formData.append('notas_requisitos',$('#txtNotasRequisitos').val());
		formData.append('municipio',$('#txtMunicipio').val());
		formData.append('autoridad_competente',$('#txtAutoridadCompetente').val());
		formData.append('instancia_reconsideracion',$('#txtInstanciaReconsidera').val());
		formData.append('instancia_apelacion',$('#txtInstanciaApela').val());

		$('#tRequisitos tbody tr').each(function(indice){
			requisitos.push({
				secuencia:$(this).find('td').eq(0).find('input').val(),
			  	nombre:$(this).find('td').eq(1).find('textarea').val()
			})
		})
		if(requisitos.length>0){//Se manda sólo si hay registros
			formData.append('requisitos',JSON.stringify(requisitos));
		}
    	
		$('#tDerechosPago tbody tr').each(function(indice){
			derechosPago.push({
				tributo:$(this).find('td').eq(0).find('textarea').val(),
			    importe:$(this).find('td').eq(1).find('input').val()
			})

		})
		if(derechosPago.length>0){//Se manda sólo si hay registros
		 	formData.append('derechosPago',JSON.stringify(derechosPago));
		}	
	
		if($('#archivo_adjunto')[0].files.length>0){
			formData.append('flgadjunto',true);  
			formData.append('archivo_adjunto',$('#archivo_adjunto')[0].files[0]);  
		}

		if($('#txtNombre').val()==''){
            alert('Nombre de trámite no válido.');
        }else if($('#listaModulos').val()=='0'){
            alert('Elija un módulo válido.');       
        }else{		
    		$.ajax({url:'/Tramite/Registrar',data: formData,processData: false,contentType: false,type: 'POST'})
			.done(function(data){
				if(data.tramite){
					alert('Trámite creado');
					window.location.href='/Tramite/Listar/'+data.tramite.municipio;
				}
			})
		}
	}
})