let AuthenticationController = require('../api/controllers/authentication')
let CityController           = require('../api/controllers/city')
let ClientController         = require('../api/controllers/client')
let HotelController          = require('../api/controllers/hotel')
let RoomController           = require('../api/controllers/room')

let isAuthenticated  = require('../api/policies/is-authenticated')
let isAdmin          = require('../api/policies/is-admin')
let isClient         = require('../api/policies/is-client')
let createLogRequest = require('../api/policies/create-log-request')

module.exports = function(app){

	/************************************
	**          AUTHENTICATION         **
	************************************/

	app.post('/api/authentication/login', AuthenticationController.login)
	app.get('/api/authentication/session', [isAuthenticated, createLogRequest], AuthenticationController.session)

	/************************************
	**             CITIES              **
	************************************/

	app.get('/api/cities', [isAuthenticated, isAdmin, createLogRequest], CityController.getCities)
	app.get('/api/cities/:cityId', [isAuthenticated, isAdmin, createLogRequest], CityController.getCityById)
	app.post('/api/cities', [isAuthenticated, isAdmin, createLogRequest], CityController.createCity)
	app.put('/api/cities/:cityId', [isAuthenticated, isAdmin, createLogRequest], CityController.updateCity)
	app.delete('/api/cities/:cityId', [isAuthenticated, isAdmin, createLogRequest], CityController.deleteCity)

	/************************************
	**             CLIENTS             **
	************************************/

	app.get('/api/clients', [isAuthenticated, isAdmin, createLogRequest], ClientController.getClients)
	app.get('/api/clients/:clientId', [isAuthenticated, isAdmin, createLogRequest], ClientController.getClientById)
	app.post('/api/clients', [isAuthenticated, isAdmin, createLogRequest], ClientController.createClient)
	app.put('/api/clients/:clientId', [isAuthenticated, isAdmin, createLogRequest], ClientController.updateClient)
	app.delete('/api/clients/:clientId', [isAuthenticated, isAdmin, createLogRequest], ClientController.deleteClient)

	/************************************
	**              HOTELS             **
	************************************/

	app.get('/api/hotels', [isAuthenticated, isClient, createLogRequest], HotelController.getHotels)
	app.get('/api/hotels/:hotelId', [isAuthenticated, isClient, createLogRequest], HotelController.getHotelById)
	app.post('/api/hotels', [isAuthenticated, isClient, createLogRequest], HotelController.createHotel)
	app.put('/api/hotels/:hotelId', [isAuthenticated, isClient, createLogRequest], HotelController.updateHotel)
	app.delete('/api/hotels/:hotelId', [isAuthenticated, isClient, createLogRequest], HotelController.deleteHotel)

	/************************************
	**              ROOMS              **
	************************************/

	app.get('/api/rooms', [isAuthenticated, isClient, createLogRequest], RoomController.getRooms)
	app.get('/api/rooms/:roomId', [isAuthenticated, isClient, createLogRequest], RoomController.getRoomById)
	app.post('/api/rooms', [isAuthenticated, isClient, createLogRequest], RoomController.createRoom)
	app.put('/api/rooms/:roomId', [isAuthenticated, isClient, createLogRequest], RoomController.updateRoom)
	app.delete('/api/rooms/:roomId', [isAuthenticated, isClient, createLogRequest], RoomController.deleteRoom)

}