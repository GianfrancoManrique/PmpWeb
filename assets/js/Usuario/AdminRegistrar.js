$('document').ready(function(){
	ConfiguraCalendario();
	//$('#btnRegistrar').on("click",RegistrarAdmin)
})

function ConfiguraCalendario(){
	$.datepicker.regional['es'] = {
	closeText: 'Cerrar',
	prevText: '< Ant',
	nextText: 'Sig >',
	currentText: 'Hoy',
	monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
	dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
	dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
	weekHeader: 'Sm',
	dateFormat: 'dd/mm/yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
	$("#txtFecResol").datepicker();
}
function RegistrarAdmin(e){

	e.preventDefault();

	url="/Usuario/Registrar";

		var tipodoc=$("#lstTipoDoc").val()
		var numdoc=$("#txtNumero").val();
		var nombres=$("#txtNombres").val();
		var apellidos=$("#txtApellidos").val();
		var correo=$("#txtCorreo").val();
		var municipio=$("#txtMunicipio").val();
		var cargo=$("#txtCargo").val();
		var resolucion=$("#txtResolucion").val();
		var fecresolucion=$("#txtFecResol").val();

		$.post(url,
		{tipodoc:tipodoc,numdoc:numdoc,nombres:nombres,apellidos:apellidos,
		 correo:correo,municipio:municipio,cargo:cargo,
		 resolucion:resolucion,fecresolucion:fecresolucion
		},
		function(data){
			alert(data);
			if(data=="Éxito en creación de administrador.")
			{
				window.location.href="/Municipio/Listar";
			}
		})
}

