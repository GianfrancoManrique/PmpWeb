$(document).ready(function(){
    var url="";
    var filas;    
    $("#tabsTramite" ).tabs({
  classes: {
    "ui-tabs": "highlight"
  }
});
    $("button[id^='btnElimTramite']").on("click",fnEliminar);
    $("button[id^='btnActualTramite']").on("click",fnActualizarTramite);   
    $('button[id^="btnAgregarRequisito"]').on('click',fnAgregarRequisito);
    $('#btnNDerechoPago').on('click',fnAgregarDerecho);
    //$('button[id^="btnActRequisito"]').on('click',fnActualizarRequisito);
    $('button[id^="btnDelRequisito"]').on('click',fnEliminaRequisito);
    $('button[id^="btnDelDerecho"]').on('click',fnEliminaDerecho);
});

//Actualiza trámite por pestaña.
function fnActualizarTramite(e){
    var requisitos=[];
    var derechosPago=[];
    var button=e.target.id;
	var id=button.substring(16);
    var url='/Tramite/Actualizar/'+id;
    var flgadjunto=false;
       
    var tab=$('#tabsTramite').tabs( 'option', 'active');    
    var tramite;
    switch(tab){
        case 0:   
             $.post(url,{tab:tab,nombre:$('#txtNombre').val(),modulo:$('#listaModulos').val(),
            area_tramite:$('#txtAreaTramite').val(),atencion:$('#txtAtencion').val(),
            pago:$('#cbPago').is(':checked')?true:false,habilitado:$('#cbHabilitado').is(':checked')?true:false},
            function(data){
                alert('Información general actualizada.');
            })
            break;
        case 1:     
            flgadjunto=$('#fAdjunto')[0].files.length>0?true:false;
            if(flgadjunto){              
                var formData = new FormData();
                formData.append('tab',tab);
                formData.append('base_legal',$('#txtBaseLegal').val());
                formData.append('notas_procedimiento',$('#txtNotasProcedimiento').val());
                formData.append('notas_requisitos',$('#txtNotasRequisitos').val());
                formData.append('flgadjunto',flgadjunto);
                formData.append('archivo_adjunto',$('#fAdjunto')[0].files[0]);
                 $.ajax({url: url,data: formData,processData: false,contentType: false, type: 'POST',                   
                    success: function(data){
                        alert('Información adicional actualizada.');                
                    }
                });
            }else{
                $.post(url,{tab:tab,base_legal:$('#txtBaseLegal').val(),notas_procedimiento:$('#txtNotasProcedimiento').val(),
                notas_requisitos:$('#txtNotasRequisitos').val(),flgadjunto:flgadjunto},
                function(data){
                    alert("Información adicional actualizada.");
                })
            }
            
            break;
        case 2:            
            $("#tRequisitos tbody tr").each(function(indice){
                requisitos.push({
                secuencia:$(this).find("td").eq(0).find("input").val(),
                nombre:$(this).find("td").eq(1).find("textarea").val()
                })
            })

            var flginvalido=false;
            requisitos.every(function(requisito){
                if(requisito.secuencia==''||requisito.nombre==''){
                    flginvalido=true
                    return false                   
                }else{                   
                    return true
                }
            }); 

            if(flginvalido){
                alert('Requisitos con valores inválidos.');
            }else{
                $.post(url,{tab:tab,requisitos:JSON.stringify(requisitos)})
                .done(function(data){
                    alert('Información de requisitos actualizada.');
                })   
            }
                   
            break;
        case 3:            
            $("#tDerechosPago tbody tr").each(function(indice){
                derechosPago.push({
                tributo:$(this).find("td").eq(0).find("textarea").val(),
                importe:$(this).find("td").eq(1).find("input").val()
                })
            })

            var flginvDer=false;

            derechosPago.every(function(derecho){
                if(derecho.tributo==''||derecho.importe==''){
                    flginvDer=true
                    return false                   
                }else{                   
                    return true
                }
            }); 

            if(flginvDer){
                alert('Derechos de pago con valores inválidos.');
            }else{
                 $.post(url,{tab:tab,derechosPago:JSON.stringify(derechosPago)})
                .done(function(data){
                    alert('Información de derechos de pago actualizada.');
                })   
            }
            
            break;
        case 4:
           $.post(url,{tab:tab,autoridad_competente:$('#txtAutoridadCompetente').val(),
            instancia_reconsideracion:$('#txtInstanciaReconsidera').val(),
            instancia_apelacion:$('#txtInstanciaApela').val()})
            .done(function(data){
                alert('Información de autoridades actualizada.');
            })           
            break;
    }
}

function fnActualizarRequisito(e){
    e.preventDefault();
    console.log($(this).parent().html());   
}

function fnEliminar(e){
    e.preventDefault();
    var button=e.target.id;
	var id=button.substring(14);
    url='/Tramite/Eliminar';
    $.post(url,{id:id})
    .done(function(data){
         alert('Eliminación de trámite exitoso.');
         if(data.tramite){
            window.location.href='/Tramite/Listar/'+data.tramite.municipio;
        }
    })
}
function fnEliminaRequisito(e){
    e.preventDefault();
    var button=e.target.id;
	var id=button.substring(15);
    $('#trReq'+id).remove()
    /*
    url='/Tramite/Requisito/Eliminar';
    $.post(url,{id:id})
    .done(function(data){
        if(data.requisito){
            $('#trReq'+id).hide()
          alert('Eliminación de requisito exitoso.');
        }
    })
    */
}
function fnEliminaDerecho(e){
    e.preventDefault();
    var button=e.target.id;
	var id=button.substring(13);
     $('#trDer'+id).remove()
    /*
    url='/Tramite/Derecho/Eliminar';
    $.post(url,{id:id})
    .done(function(data){
        if(data.derecho){
          $('#trDer'+id).hide()
          alert('Eliminación de derecho de pago exitoso.');
        }
    })
    */
}
function fnAgregarRequisito(e)
{
    e.preventDefault();
    var tr=document.createElement('tr');
    var td1=document.createElement('td');
    var input=document.createElement('input');
    input.type='number';
    input.min='1';
    input.max='100';
    var td2=document.createElement('td');
    var div1=document.createElement('div');
    div1.className='form-group'
    var div2=document.createElement('div');
    div1.className='col-sm-12'
    var textarea=document.createElement('textarea');
    textarea.className='form-control'
    textarea.rows='6'
    textarea.placeholder='Ingrese la base legal de Procedimiento.'
    var td3=document.createElement('td');
    /*
    var button=document.createElement('button');
    button.className='btn btn-info';
	button.innerHTML='Eliminar';
    button.addEventListener('click',fnEliminaRequisito,false);
    */
    td1.appendChild(input);
    tr.appendChild(td1);
    div2.appendChild(textarea);
    div1.appendChild(div2);
    td2.appendChild(div1);
    tr.appendChild(td2);
    //td3.appendChild(button);
    tr.appendChild(td3);
    $('#tbRequisitos').append(tr);
}
function fnAgregarDerecho(e)
{
        e.preventDefault();		
		var tr=document.createElement('tr');
		var td1=document.createElement('td');
		var td2=document.createElement('td');
		var td3=document.createElement('td');
		var input=document.createElement('input');
		input.type='text';
		input.min='1';
		input.max='100';	
		input.value='0.00';
		var textarea=document.createElement('textarea');
		textarea.rows='1';
		textarea.cols='110';	
		textarea.placeholder='Ingrese detalle';		
		td1.appendChild(textarea);
		td2.appendChild(input);		
		tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
	    $('#tDerechosPago').append(tr);
}