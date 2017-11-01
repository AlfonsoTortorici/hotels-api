let _ = require('lodash')

var UserModel  = require('../api/models/user')
let HotelModel = require('../api/models/hotel')
let RoomModel  = require('../api/models/room')

function init () {

	try{

		UserModel
			.getUsers({})
			.then((result) => {

				if( !result.success || result.users.length > 0 ){

					return

				}

				createAdmin()

			}, (error) => {

				console.log('Ocurrió un error al intentar crear el administrador')
				console.log(error)

				return

			})


	}catch(error){

		console.log('Ocurrió un error al intentar crear el administrador')
		console.log(error)

		return

	}

}

function createAdmin () {

	try{

		let dataToCreate = {
			username  : 'admin',
			email     : 'admin@gmail.com',
			password  : '12345678',
			admin     : true
		}

		UserModel
			.createUser(dataToCreate)
			.then((result) => {

				if( !result.success ){

					console.log('Ocurrió un error al intentar crear el administrador')

					console.log(result)

					return

				}

				console.log('Administrador creado')
				console.log('username: admin')
				console.log('password: 12345678')

			}, (error) => {

				console.log('Ocurrió un error al intentar crear el administrador')
				console.log(error)

				return

			})

	}catch(error){

		console.log('Ocurrió un error al intentar crear el administrador')
		console.log(error)

		return

	}

}

Parse.Cloud.beforeDelete('_User', (request, response) => {

	if( !request.object.get('client') ){

		return response.success()

	}

	let promises = []

	let dataToSearch = {
		client : request.object
	}

	let hotelPromise = HotelModel
		.getHotels(dataToSearch)
		.then((result) => {

			if( !result.success ){

				return response.error('Error ' + result.error)

			}

			let hotels = result.hotels

			if( hotels.length == 0 ){

				return

			}

			let deleteHotelsPromises = _.map(hotels, function (hotel) {

				return HotelModel
					.deleteHotel(hotel)

			})

			return Parse.Promise.when(deleteHotelsPromises)

		})

	promises.push(hotelPromise)

	return Parse
		.Promise
		.when(promises)
		.then( () => {

			response.success()

		}, (error) => {

			response.error('Error ' + error.code + ': ' + error.message)

		})

})

Parse.Cloud.beforeDelete('Hotel', (request, response) => {

	let promises = []

	let dataToSearch = {
		hotel : request.object
	}

	let roomPromise = RoomModel
		.getRooms(dataToSearch)
		.then((result) => {

			if( !result.success ){

				return response.error('Error ' + result.error)

			}

			let rooms = result.rooms

			if( rooms.length == 0 ){

				return

			}

			let deleteRoomsPromises = _.map(rooms, function (room) {

				return RoomModel
					.deleteRoom(room)

			})

			return Parse.Promise.when(deleteRoomsPromises)

		})

	promises.push(roomPromise)

	return Parse
		.Promise
		.when(promises)
		.then( () => {

			response.success()

		}, (error) => {

			response.error('Error ' + error.code + ': ' + error.message)

		})

})

return init()