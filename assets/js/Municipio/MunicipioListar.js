$(document).ready(function(){	
	fnEliminarDuplicados("#listaDptos1");
	fnEliminarDuplicados("#listaProvs");
	fnEliminarDuplicados("#listaDstos");

	var _url=String.empty;		

	$("#listaDptos1").on("change",fnCargarProvincias);
	$("#listaDptos2").on("change",fnCargarProvincias);
	$("#listaProvs1").on("change",fnCargarDistritos);
	$("#listaProvs2").on("change",fnCargarDistritos);
	$("#btnFiltrar").on("click",fnFiltrar);

	$("a[id^='btnMun']" ).on("click",fnEditarMunicipio);

	$("#btnNuevoMunicipio").on("click",fnAgregarMunicipio);
	$("#btnNuevoAdmin").on("click",fnAgregarAdministrador);

	$("#btnGuardarMunicipio").on("click",fnActualizarMunicipio);
	$("#btnEliminarMunicipio").on("click",fnEliminarMunicipio)

	
})

function fnFiltrar(e){

	e.preventDefault();

	$.post('/Municipio/Filtrar',{ departamento:$("#listaDptos1").val(),provincia:$("#listaProvs1").val(),
	distrito:$("#listaDstos1").val()})
	.done(function(data){
				
	  	$("#tbMunicipios").empty()
	  	for (var i = 0; i < data.municipios.length; i++) {
	  		var tr=document.createElement("tr");	  	
	  		var tdId=document.createElement("td");
	  		var a=document.createElement("a")
	  		a.id="lnkMun"+data.municipios[i].id;
	  		a.innerHTML='#IDMUN'+data.municipios[i].id;			  
	  		a.addEventListener("click",fnEditarMunicipio,false);
	  		var tdDpto=document.createElement("td")
			  tdDpto.innerHTML="MUNICIPIO DE "+data.municipios[i].departamento+"-"+
			  data.municipios[i].provincia+"-"+data.municipios[i].distrito;
			  /*
	  		var tdProv=document.createElement("td")
	  		tdProv.innerHTML=data.municipios[i].provincia;
	  		var tdDsto=document.createElement("td")
			  tdDsto.innerHTML=data.municipios[i].distrito;
			  */
			var tdHabil=document.createElement("td")
			var input=document.createElement("input");
			input.type='checkbox';
			input.disabled='true';
			input.checked=data.municipios[i].habilitado;
			
	  		tdId.appendChild(a);
			tdHabil.appendChild(input);
	  		tr.appendChild(tdId);
	  		tr.appendChild(tdDpto);
	  		//tr.appendChild(tdProv);
	  		//tr.appendChild(tdDsto);
			tr.appendChild(tdHabil);
	  		$("#tbMunicipios").append(tr);
		  }		
		$("lblNumRes").text(data.municipios.length);
	})
}

function fnConsultarProvincias(idListaProv,idListaDsto,departamento){
	
	if(departamento!=""){

		$.get("/Municipio/Provincias/"+departamento,function(resultados){
			fnMostrarProvincias(idListaProv,idListaDsto,resultados);
		})
	}

}

function fnMostrarProvincias(idListaProv,idListaDsto,resultados){

	var listaProv="#"+idListaProv;
	$(listaProv).empty();

	var option_0=document.createElement("option");
		option_0.innerHTML="Elija provincia";
		option_0.value="Elija provincia";
		$(listaProv).append(option_0);

	for(var i=0;i<resultados.length;i++){
		var option=document.createElement("option");
		option.innerHTML=resultados[i].provincia
		option.value=resultados[i].provincia
		$(listaProv).append(option);
	}

	fnEliminarDuplicados(listaProv);
	$(listaProv).val("Elija provincia");
	$(listaProv).prop("disabled",false);

	var listaDsto="#"+idListaDsto;
	$(listaDsto).empty();
	var option_0=document.createElement("option");
		option_0.innerHTML="Elija distrito";
		option_0.value="Elija distrito";
		$(listaDsto).append(option_0);
	$(listaDsto).val("Elija distrito");
	$(listaDsto).prop("disabled",false);
}

function fnConsultarDistritos(id,provincia){
	
	if(provincia!=""){

		$.get("/Municipio/Distritos/"+provincia,function(resultados){
			fnMostrarDistritos(id,resultados);	
		})
	}

}

function fnMostrarDistritos(id,resultados){

	var lista="#"+id;
	$(lista).empty();

	var option_0=document.createElement("option");
		option_0.innerHTML="Elija distrito";
		option_0.value="Elija distrito";
		$(lista).append(option_0);

	for(var i=0;i<resultados.length;i++){
		var option=document.createElement("option");
		option.innerHTML=resultados[i].distrito;
		option.value=resultados[i].distrito;
		$(lista).append(option);
	}

	fnEliminarDuplicados(lista);
	$(lista).val("Elija distrito");
	$(lista).prop("disabled",false);
}

function fnAgregarMunicipio(e){

	e.preventDefault();

	$("#listaDptos2").val("");
	$("#listaDptos2").prop("disabled",false);
	$("#listaProvs2").val("");
	$("#listaProvs2").prop("disabled",true);
	$("#listaDstos2").val("");
	$("#listaDstos2").prop("disabled",true);
	$("#txtComentario").val("");
	$("#lblId").text("");

	fnEliminarDuplicados("#listaDptos2");
	fnEliminarDuplicados("#listaProvs2");
	fnEliminarDuplicados("#listaDstos2");

}

function fnAgregarAdministrador(e){
	
	e.preventDefault();
	var id=$("#lblId").text();
	var departamento=$("#listaDptos2").val();
	var provincia=$("#listaProvs2").val();
	var distrito=$("#listaDstos2").val();

	if(id==""){
		alert("Elija un municipio previamente.");
	}else{
		window.location.href="/Usuario/Agregar/"+id;
	}
	
}

function fnEditarMunicipio(e){

		e.preventDefault();

  		var lnk= e.target.id;
  		var id=lnk.substring(6);
  		var url="/Municipio/Editar/"+id;

		$("#listaDptos2").prop("disabled",true);
		$.get(url,function(data){
			//console.log(data);
			fnEliminarDuplicados("#listaDptos2");
			fnEliminarDuplicados("#listaProvs2");
			fnEliminarDuplicados("#listaDstos2");				

			$("#listaDptos2").prop("disabled",false);

			$("#lblId").text(id);
			$("#listaDptos2").val(data[0].departamento);
			$("#listaProvs2").val(data[0].provincia);
			$("#listaDstos2").val(data[0].distrito);
			$("#txtComentario").val(data[0].comentario);
			$("#cbHabilitado").prop("checked",data[0].habilitado);
			
			fnMostrarAdministradores(id);

		})


}

function fnMostrarAdministradores(id){

		$("#tbAdmins").empty();

		$.get('/Usuario/Listar/'+id,function(data){
			
			if(data.usuarios.length>0)
			{
				for (var i = 0; i<data.usuarios.length; i++) 
				{
					var tr=document.createElement("tr");

					var td1=document.createElement("td");
					var a=document.createElement("a");
					a.id="lnkA"+data.usuarios[i].id;
					a.innerHTML='#IDADMIN'+data.usuarios[i].id;
					a.href="/Usuario/Editar/"+data.usuarios[i].id;

					td1.append(a);
					tr.append(td1);

					var td2=document.createElement("td");
					td2.innerHTML=data.usuarios[i].usuario;

					tr.append(td2);

					var td3=document.createElement("td");
					td3.innerHTML=data.usuarios[i].nombres.toUpperCase()+" "+data.usuarios[i].apellidos.toUpperCase();

					tr.append(td3);

					var td4=document.createElement("td");
					var input=document.createElement("input");
					input.type="checkbox"
					input.checked=data.usuarios[i].habilitado?true:false;
					input.disabled=true;

					td4.append(input);
					tr.append(td4);

					$("#tbAdmins").append(tr);
				}		
			}	
		})
}	

function fnCargarCombosDetalle(){

	var lstdpto=$("#lstDpto").get();
	lstdpto=$.unique(lstdpto);
	console.log(lstdpto);
}

function fnEliminarDuplicados(id){

	var items=[];
	var itemsFiltro=[]

	$(id).children("option").each(function(indice){
		items.push($(this).text());
	})

	$.each(items,function(indice,elemento){
	  if ($.inArray(elemento, itemsFiltro) == -1) {
	  	 itemsFiltro.push(elemento);
	  }
	})

	$(id).empty();

	$.each(itemsFiltro,function(indice,elemento){
		var option=document.createElement("option");
		option.value=elemento;
		option.innerHTML=elemento;
		$(id).append(option);
	})

}

function fnCargarProvincias(e){
		var idListaDpto=e.target.id;//listaDptos1
		var idListaProv="listaProvs"+idListaDpto.substring(10);
		var idListaDsto="listaDstos"+idListaDpto.substring(10);
		var departamento=($(this).val());
		fnConsultarProvincias(idListaProv,idListaDsto,departamento);
}

function fnCargarDistritos(e){
		var idListaProv=e.target.id;//listaDptos1
		var idListaDsto="listaDstos"+idListaProv.substring(10);
		var provincia=($(this).val());
		fnConsultarDistritos(idListaDsto,provincia);
}
function fnActualizarMunicipio(e){

		var departamento=$("#listaDptos2").val();
		var provincia=$("#listaProvs2").val();
		var distrito=$("#listaDstos2").val()

		e.preventDefault();

		if(departamento=="Elija departamento" ||provincia=="Elija provincia"||
		   distrito=="Elija distrito"){
			alert("Municipio no válido.");
		}else{		
		var id=$("#lblId").text();//Registro o actualización.
  		_url=id==""?"/Municipio/Registrar":"/Municipio/Actualizar";
		  alert(departamento);
		  alert(provincia);
		  alert(distrito);
  		var formData=new FormData();
  		formData.append("id",id);
  		formData.append("departamento",departamento);
  		formData.append("provincia",provincia);
  		formData.append("distrito",distrito);
  		formData.append("comentario",$("#txtComentario").val());
		formData.append("habilitado",$("#cbHabilitado").is(":checked")?true:false);

  		 $.ajax({
		      url:_url,
		      data: formData,
		      processData: false,
		      contentType: false,
		      type: 'POST',
		      success: function(data){
					alert(data);
					if(data=="Éxito en registro de municipio."||
					   data=="Éxito en actualización de municipio."){
					   window.location.href="/Municipio/Listar";
					}			
		      }
		 });
		}
}

function fnEliminarMunicipio(e){

	e.preventDefault();
	var departamento=$("#listaDptos2").val();
	var provincia=$("#listaProvs2").val();
	var distrito=$("#listaDstos2").val()
	var id=$("#lblId").text();

	if(id==""){
		alert("Elija un municipio.");	
	}else{		
		var url="/Municipio/Eliminar/<id>";
		$.get(url.replace("<id>",id),function(data){		
			if(data){
				alert("Éxito en eliminación de municipio.");
				window.location.href="/Municipio/Listar";
			}else{
				alert("Error en operación.");
			}
		})
	}
}
