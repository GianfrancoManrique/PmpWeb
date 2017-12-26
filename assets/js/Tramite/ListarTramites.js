$(document).ready(function(){
     $('#lupa').click(fnBuscar);  
})

function fnBuscar(e){
   var modulo=$('#modulos').val();
   //let palabras=$('#palabras').val()==""?'\'.\'':'\''+$('#palabras').val()+'\'';
   var palabras=$('#palabras').val();
   var municipio=$('#municipio').val();
   e.preventDefault();
	$.post('/Tramite/Portal/Buscar',{municipio:municipio,modulo:modulo,palabras:palabras})
    .done(function(data){
        if(data.tramites){
            fnMostrarTramites(data.tramites);
        }		
	})
}  

function fnMostrarTramites(tramites){
	$('#tbTramitesPortal').empty();
	tramites.forEach(function(tramite){
		console.log(tramite);
		var tr=document.createElement('tr');
		var td1=document.createElement('td');
		td1.innerHTML=tramite.modulo;
		var td2=document.createElement('td');
		td2.innerHTML=tramite.procedimiento;
		var td3=document.createElement('td');
		td3.innerHTML=tramite.pago;
		var td4=document.createElement('td');
		td4.innerHTML=tramite.atencion;
		var td5=document.createElement('td');
        var a=document.createElement('a');
        a.href='/tramite/detalleprocedimiento/'+tramite.id;
        a.className='ajax-popup-link'
        //a.addEventListener('click',fnEditarTramite,false);
        var i=document.createElement('i');
        i.className='fa fa-file-text-o';
        //i.'aria-hidden'=true;  
        tr.appendChild(td1);   
        tr.appendChild(td2);    
        tr.appendChild(td3);
        tr.appendChild(td4);
		a.appendChild(i);
        td5.appendChild(a);
        tr.appendChild(td5);
		$('#tbTramitesPortal').append(tr);
	})
}