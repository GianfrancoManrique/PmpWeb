
fnCargarFoto();
$(document).ready(function(){
     $('#btnActualizar').on('click',fnActualizar);
	 $('#btnEliminar').on('click',fnEliminar);
})
function fnCargarFoto(){
     var fotoNoticia=$('#hFotoNoticia').val();
    if(fotoNoticia!='null'){
            $('#fotoNoticia').fileinput({
                showUpload: false,
                maxFileCount: 1,
                initialPreviewAsData: true,
                initialPreview: [
                    fotoNoticia
                ],
                initialPreviewConfig: [
                    {caption: 'Noticia.jpg', width: '120px', showDelete: false}
                ]
            });
    }
}
	
function fnEliminar(){
		var minoticia=new Object();
		minoticia.id=$('#txtIdNoticia').val();	
		minoticia.municipio=$('#txtIdMunicipio').val();	
		$.post('/Noticia/Eliminar',{noticia:minoticia},function(data){
			alert('Noticia eliminada.');
			window.location.href = '/Municipio/Noticias/'+minoticia.municipio;
		})
}		
