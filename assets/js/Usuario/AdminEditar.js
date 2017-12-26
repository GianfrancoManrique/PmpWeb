$(document).ready(function(){
	fnConfiguraCalendario();
	$('#btnEliminar').click(fnEliminar);
})
function fnConfiguraCalendario(){
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
function fnEliminar(e){
	e.preventDefault();
	$.post('/Usuario/Eliminar',{id:$('#txtId').val()})
	.done(function(data){
		if(data.usuario){
			alert('Éxito en eliminación de administrador.');
			window.location.href='/Municipio/Listar';
		}else{
			alert('Error en eliminación de administrador.')
		}
	})
}