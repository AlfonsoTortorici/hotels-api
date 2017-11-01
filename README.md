Previos requerimientos

	* Tener una versión actualizada de node js instalada
	* Tener git instalado

Para levantar la aplicación es necesario abrir la terminal y ejecutar:

	* git clone
	* cd folder_name
	* npm install
	* npm start ó node index

La aplicación levantará por defecto en el puerto 1350 (Puedes cambiar el puerto en el archivo config/env.json)

Descripción de la API

/************************************
**          AUTHENTICATION         **
************************************/

	* Método : post
	* URL    : /api/authentication/login
	* Parámetros : {
		username : Nombre de usuario,
		password : Clave de usuario,
	}
	* Headers    : {
		X-Parse-Application-Id : 'app'
	}
	
	* Método     : get
	* URL        : /api/authentication/session
	* Políticas  : [isAuthenticated, createLogRequest]
	* Parámetros : {

	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}


/************************************
**             CITIES              **
************************************/

	* Método     : get
	* URL        : /api/cities
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		limit      : Límite de registros,
		skip       : Salto de registros,
		ascending  : nombre de campo para ordenamiento ascendente,
		descending : nombre de campo para ordenamiento descendente
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : get
	* URL        : /api/cities/:cityId
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		cityId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : post
	* URL        : /api/cities
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		name : Nombre de la ciudad
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : put
	* URL        : /api/cities/:cityId
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		cityId : Id del elemento para la búsqueda,
		name   : Nombre de la ciudad
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : delete
	* URL        : /api/cities/:cityId
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		cityId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}


/************************************
**             CLIENTS             **
************************************/

	* Método     : get
	* URL        : /api/clients
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		limit      : Límite de registros,
		skip       : Salto de registros,
		ascending  : nombre de campo para ordenamiento ascendente,
		descending : nombre de campo para ordenamiento descendente
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : get
	* URL        : /api/clients/:clientId
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		clientId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : post
	* URL        : /api/clients
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		firstname : Nombres del cliente,
		lastname  : Apellidos del cliente,
		email     : Correo electrónico del cliente,
		username  : Usuario del cliente,
		password  : Contraseña del cliente
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : put
	* URL        : /api/clients/:clientId
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		clientId : Id del elemento para la búsqueda,
		firstname : Nombres del cliente,
		lastname  : Apellidos del cliente,
		email     : Correo electrónico del cliente,
		username  : Usuario del cliente,
		password  : Contraseña del cliente
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : delete
	* URL        : /api/clients/:clientId
	* Políticas  : [isAuthenticated, isAdmin, createLogRequest]
	* Parámetros : {
		clientId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}


/************************************
**              HOTELS             **
************************************/

	* Método     : get
	* URL        : /api/hotels
	* Políticas  : [isAuthenticated, isClient, createLogRequest]
	* Parámetros : {
		limit      : Límite de registros,
		skip       : Salto de registros,
		ascending  : nombre de campo para ordenamiento ascendente,
		descending : nombre de campo para ordenamiento descendente,
		client     : Id del elemento para la búsqueda,
		city       : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : get
	* URL        : /api/hotels/:hotelId
	* Políticas  : [isAuthenticated, isClient, createLogRequest]
	* Parámetros : {
		hotelId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : post
	* URL        : /api/hotels
	* Políticas  : [isAuthenticated, isClient, createLogRequest]
	* Parámetros : {
		name    : Nombre del hotel,
		address : Dirección del hotel,
		client  : Id del elemento para el guardado,
		city    : Id del elemento para el guardado
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : put
	* URL        : /api/hotels/:hotelId
	* Políticas  : [isAuthenticated, isClient, createLogRequest]
	* Parámetros : {
		hotelId : Id del elemento para la búsqueda,
		name    : Nombre del hotel,
		address : Dirección del hotel
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : delete
	* URL        : /api/hotels/:hotelId
	* Políticas  : [isAuthenticated, isClient, createLogRequest]
	* Parámetros : {
		hotelId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}


/************************************
**              ROOMS              **
************************************/

	* Método     : get
	* URL        : /api/rooms
	* Políticas  : [isAuthenticated, isClient]
	* Parámetros : {
		limit      : Límite de registros,
		skip       : Salto de registros,
		ascending  : nombre de campo para ordenamiento ascendente,
		descending : nombre de campo para ordenamiento descendente
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : get
	* URL        : /api/rooms/:roomId
	* Políticas  : [isAuthenticated, isClient]
	* Parámetros : {
		roomId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : post
	* URL        : /api/rooms
	* Políticas  : [isAuthenticated, isClient]
	* Parámetros : {
		type      : Tipo de habitación,
		capacity  : Capacidad permitida,
		price     : Precio,
		available : Disponibilidad numérica de la habitación,
		hotel     : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : put
	* URL        : /api/rooms/:roomId
	* Políticas  : [isAuthenticated, isClient]
	* Parámetros : {
		roomId    : Id del elemento para la búsqueda,
		type      : Tipo de habitación,
		capacity  : Capacidad permitida,
		price     : Precio,
		available : Disponibilidad numérica de la habitación
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}
	
	* Método     : delete
	* URL        : /api/rooms/:roomId
	* Políticas  : [isAuthenticated, isClient]
	* Parámetros : {
		roomId : Id del elemento para la búsqueda
	}
	* Headers    : {
		X-Parse-Application-Id : 'app',
		x-parse-session-token : SESSION_TOKEN
	}

IMPORTANTE

	* Lo más probable es que se utilice una herramienta como Postman para realizar las respectivas pruebas, por lo que el modo en como se envía la data para los métodos POST y PUT debe ser x-www-form-urlencoded para que el servidor pueda reconocer la data.

	* El SESSION_TOKEN es enviado una vez se halla iniciado sesión

	* Los logs por cada petición serán guardados en config/logs