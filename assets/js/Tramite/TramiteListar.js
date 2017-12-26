$(document).ready(function(){
	$('#btnCrearTramite').on('click',fnAgregarTramite);
	$("button[id^='btnTramite']").on("click",fnEditarTramite);
	//Buscador de trámites
	$('#btnFiltrar').on('click',fnFiltrarTramites);
})
function fnAgregarTramite(e){
	e.preventDefault();
	var municipio=$('#txtMunicipio').val();
	window.location.href = '/Tramite/Agregar/'+municipio; 
}
function fnEditarTramite(e){
	e.preventDefault();
	var button=e.target.id;
	var id=button.substring(10);
	window.location.href="/Tramite/Editar/"+id;
}
function fnFiltrarTramites(e){

	e.preventDefault();
	$.post('/Tramite/Panel/Buscar',{modulo:$('#listaModulos').val(),nombre:$('#txtNombre').val()},function(data){
		fnMostrarTramites(data.tramites);
	})
}

function fnMostrarTramites(tramites){
	$('#tbTramites').empty();
	tramites.forEach(function(tramite){
		console.log(tramite);
		var tr=document.createElement('tr');
		//tr.className='warning';
		var td1=document.createElement('td');
		td1.innerHTML=tramite.modulo.area;
		var td2=document.createElement('td');
		td2.innerHTML=tramite.nombre;
		var td3=document.createElement('td');
		var createdAt=tramite.createdAt;
		td3.innerHTML=createdAt.toLocaleString();
		var td4=document.createElement('td');
		var updatedAt=tramite.updatedAt
		td4.innerHTML=updatedAt.toLocaleString();
		var td5=document.createElement('td');
		var button=document.createElement('button');
		button.id='btnTramite'+tramite.id;
		button.className='btn btn-primary';
		button.innerHTML='Detalle';
		button.addEventListener('click',fnEditarTramite,false);
		td5.append(button);
		tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tr.append(td4);
		tr.append(td5);
		$('#tbTramites').append(tr);
	})
}