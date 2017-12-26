/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/':{controller:'Municipio',action:'fnIndex'},
 
  'POST /Login':{controller:'Usuario',action:'fnIngresar'},
  'GET  /Salir/:id':{controller:'Usuario',action:'fnSalir'},

  //Municipio Controller
  'GET /Municipio/Listar':{controller:'Municipio',action:'fnListar'},  
  'GET /Municipio/Provincias/:departamento':{controller:'Municipio',action:'fnConsultarProvincias'},
  'GET /Municipio/Distritos/:provincia':{controller:'Municipio',action:'fnConsultarDistritos'},
  'POST /Municipio/Registrar':{controller:'Municipio',action:'fnRegistrar'},
  'GET /Municipio/Editar/:id':{controller:'Municipio',action:'fnEditar'},
  'POST /Municipio/Actualizar':{controller:'Municipio',action:'fnActualizar'},
  'GET /Municipio/Eliminar/:id':{controller:'Municipio',action:'fnEliminar'},
  'POST /Municipio/ActualizarGral':{controller:'Municipio',action:'fnActualizarGral'},
  'POST /Municipio/Filtrar':{controller:'Municipio',action:'fnFiltrar'},
  'POST /Buscar':{controller:'Municipio',action:'fnBuscar'},
  'GET /General/:id':{controller:'Municipio',action:'fnConsultarMun'},
  'GET /Usuario/Listar/:municipio':{controller:'Usuario',action:'fnListar'},
  /*'GET /Autoridades/:id':{controller:'Municipio',action:'fnConsultarAutoridades'},*/
  'GET /Alcalde/:municipio':{controller:'Autoridad',action:'fnConsultarAlcalde'},
  'POST /Alcalde/Registrar':{controller:'Autoridad',action:'fnRegistrarAlcalde'},
  'POST /Alcalde/Actualizar1/:id':{controller:'Autoridad',action:'fnActualizarAlcalde1'},
  'POST /Alcalde/Actualizar2/:id':{controller:'Autoridad',action:'fnActualizarAlcalde2'},
  'POST /Alcalde/Eliminar/:municipio':{controller:'Autoridad',action:'fnEliminarAlcalde'},

  'GET /Regidor/Listar/:municipio':{controller:'Autoridad',action:'fnConsultarRegidores'},
  'GET /Regidor/Agregar/:municipio':{controller:'Autoridad',action:'fnAgregarRegidor'},
  'POST /Regidor/Registrar':{controller:'Autoridad',action:'fnRegistrarRegidor'},
  'GET /Regidor/Editar/:id':{controller:'Autoridad',action:'fnConsultarRegidorPorId'},
  'POST /Regidor/Actualizar1/:id':{controller:'Autoridad',action:'fnActualizarRegidor1'},
  'POST /Regidor/Actualizar2/:id':{controller:'Autoridad',action:'fnActualizarRegidor2'},
  'POST /Regidor/Eliminar/:id':{controller:'Autoridad',action:'fnEliminarRegidor'},

  'GET /Modulo/Listar/:municipio':{controller:'Modulo',action:'fnListar'},
  'GET /Modulo/ListarAjax/:municipio':{controller:'Modulo',action:'fnListarAjax'},
  'GET /Modulo/EditarAjax/:id':{controller:'Modulo',action:'fnEditarAjax'},  
  'POST /Modulo/Registrar':{controller:'Modulo',action:'fnRegistrar'},
  'POST /Modulo/Actualizar':{controller:'Modulo',action:'fnActualizar'},
  'POST /Modulo/EliminarAjax':{controller:'Modulo',action:'fnEliminarAjax'},

  'GET  /Tramite/Listar/:municipio':{controller:'Tramite',action:'fnConsultarTramites'},  
  'POST /Tramite/Panel/Buscar':{controller:'Tramite',action:'fnBuscarPanel'},
  'POST /Tramite/Portal/Buscar':{controller:'Tramite',action:'fnBuscarPortal'},
  'GET /Tramite/Agregar/:municipio':{controller:'Tramite',action:'fnAgregar'},
  'POST /Tramite/Registrar':{controller:'Tramite',action:'fnRegistrar'},
  'GET  /Tramite/Editar/:id':{controller:'Tramite',action:'fnEditar'},
  'POST /Tramite/Actualizar/:id':{controller:'Tramite',action:'fnActualizar'},
  'POST  /Tramite/Eliminar':{controller:'Tramite',action:'fnEliminar'},
  'POST  /Tramite/Derecho/Eliminar':{controller:'Tramite',action:'fnEliminarDerecho'},
  'POST  /Tramite/Requisito/Eliminar':{controller:'Tramite',action:'fnEliminarRequisito'},
  //Ver Tramite
  'GET /tramites/buscadordetramitestupa/:municipio':{controller: 'tramite',action: 'fnListarTramites'},
  //ver Detalle Procedimiento
  'GET /tramite/detalleprocedimiento/:id':{controller:'tramite',action:'fnConsultarTramiteProcedimiento'},
  
  //Rutas administrador
  'GET /Noticia/Listar/:municipio':{controller:'Noticia',action:'fnConsultarNoticias'},
  'GET /Noticia/Agregar/:municipio':{controller:'Noticia',action:'fnAgregar'},
  'POST /Noticia/Registrar':{controller:'Noticia',action:'fnRegistrar'},
  'GET  /Noticia/Editar/:id':{controller:'Noticia',action:'fnEditar'},
  'POST /Noticia/Actualizar1/:id':{controller:'Noticia',action:'fnActualizar1'},
  'POST /Noticia/Actualizar2/:id':{controller:'Noticia',action:'fnActualizar2'},
  'POST /Noticia/Eliminar':{controller:'Noticia',action:'fnEliminar'},
  //Rutas usuario
  'GET /Noticias/:id':{controller:'Noticia',action:'fnConsultar'},

  'GET /Perfil/:id':{controller:'Municipio',action:'fnPerfil'},
  'POST /Telefono/Registrar':{controller:'Municipio',action:'fnRegistrarTelefono'},
  'POST /Telefono/Eliminar':{controller:'Municipio',action:'fnEliminarTelefono'},

  'GET /Foto/Listar/:municipio':{controller:'Foto',action:'fnConsultarAlbums'},
  'GET /Foto/Agregar/:municipio':{controller:'Foto',action:'fnAgregar'},
  'POST /Foto/Subir':{controller:'Foto',action:'fnSubir'},
  'POST /Foto/Eliminar':{controller:'Foto',action:'fnEliminar'},
  'GET /Album/Editar/:id':{controller:'Album',action:'fnEditar'},
  'POST /Album/Subir':{controller:'Album',action:'fnSubir'},
  'POST /Album/Actualizar/:id':{controller:'Album',action:'fnActualizar'},
  'POST /Album/Eliminar':{controller:'Album',action:'fnEliminar'},
  'GET /Albums/:municipio':{controller:'Album',action:'fnMostrar'},
  'GET /Album/Fotos/:album':{controller:'Album',action:'fnConsultarFotos'},
   //Rutas Estadísticas 
   'GET  /Estadistica/:municipio':{controller:'Estadistica',action:'fnMostrar'},
   'POST /Estadistica/Consultar/:municipio':{controller:'Estadistica',action:'fnConsultar'},

  'GET  /Usuario/Agregar/:id':{controller:'Usuario',action:'fnAgregar'},
  'POST /Usuario/Registrar':{ controller:'Usuario',action:'fnRegistrar'},
  'GET  /Usuario/Editar/:id':{controller:'Usuario',action:'fnEditar'},
  'POST /Usuario/Actualizar/:id':{controller:'Usuario',action:'fnActualizar'},  
  'POST /Usuario/Eliminar':{controller:'Usuario',action:'fnEliminar'},  
  'GET  /Usuario/Salir':{controller:'Usuario',action:'fnSalir'},

  /*Ruta usuario*/






  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
