let _ = require('lodash')

let UserModel  = require('../models/user')
let HotelModel = require('../models/hotel')
let RoomModel = require('../models/room')

let controller = {
	getRooms   ,
	getRoomById,
	createRoom ,
	updateRoom ,
	deleteRoom
}

function getRooms(req, res){

	let data = {
		front   : _.assign(req.body, req.params, req.query),
		back    : {
			response : {}
		},
		session : {
			user : req.user
		}
	}

	validateParams()

	function validateParams(){

		try{

			req.body = data.front

			let dataToValidate = {
				limit : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo limit posee un formato incorrecto'
						}
					}
				},
				skip : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo skip posee un formato incorrecto'
						}
					}
				},
				ascending : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo ascending posee un formato incorrecto'
						}
					}
				},
				descending : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo descending posee un formato incorrecto'
						}
					}
				}
			}

			req.checkBody(dataToValidate)

			let error = req.validationErrors()

			if (error){

				data.back.response = {
					success : false,
					error   : error
				}

				return end()

			}

			search()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR room.js > getRooms > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function search(){

		try{

			let dataToSearch = data.front

			dataToSearch.include = ['hotel', 'client']

			if( !data.session.user.get('user').get('admin') ){

				dataToSearch.client = data.session.user.get('user')

			}

			RoomModel
				.getRooms(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					data.back.response = {
						success : true,
						rooms  : result.rooms
					}

					end()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > getRooms > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function end(){

		try{

			return res.send( data.back.response )
			
		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > getRooms > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function getRoomById(req, res){

	let data = {
		front   : _.assign(req.body, req.params, req.query),
		back    : {
			response : {}
		},
		session : {
			user : req.user
		}
	}

	validateParams()

	function validateParams(){

		try{

			req.body = data.front

			let dataToValidate = {
				roomId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo roomId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo roomId posee un formato incorrecto'
						}
					}
				}
			}

			req.checkBody(dataToValidate)

			let error = req.validationErrors()

			if (error){

				data.back.response = {
					success : false,
					error   : error
				}

				return end()

			}

			search()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR room.js > getRoomById > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function search(){

		try{

			let dataToSearch = {
				objectId : data.front.roomId
			}

			dataToSearch.include = ['hotel', 'client']

			if( !data.session.user.get('user').get('admin') ){

				dataToSearch.client = data.session.user.get('user')

			}

			RoomModel
				.getRoomById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					data.back.response = {
						success : true,
						room    : result.room
					}

					end()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > getRoomById > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function end(){

		try{

			return res.send( data.back.response )
			
		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > getRoomById > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function createRoom(req, res){

	let data = {
		front   : _.assign(req.body, req.params, req.query),
		back    : {
			response : {}
		},
		session : {
			user : req.user
		}
	}

	validateParams()

	function validateParams(){

		try{

			req.body = data.front

			let dataToValidate = {
				type : {
					notEmpty : {
						errorMessage : {
							message : 'El campo type es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo type posee un formato incorrecto'
						}
					}
				},
				capacity : {
					notEmpty : {
						errorMessage : {
							message : 'El campo capacity es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo capacity posee un formato incorrecto'
						}
					}
				},
				price : {
					notEmpty : {
						errorMessage : {
							message : 'El campo price es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo price posee un formato incorrecto'
						}
					}
				},
				available : {
					notEmpty : {
						errorMessage : {
							message : 'El campo available es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo available posee un formato incorrecto'
						}
					}
				},
				hotel : {
					notEmpty : {
						errorMessage : {
							message : 'El campo hotel es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo hotel posee un formato incorrecto'
						}
					}
				}
			}

			req.checkBody(dataToValidate)

			let error = req.validationErrors()

			if (error){

				data.back.response = {
					success : false,
					error   : error
				}

				return end()

			}

			search()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR room.js > createRoom > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function search(){

		try{

			let dataToSearch = {
				objectId : data.front.hotel
			}

			dataToSearch.include = ['client']

			if( !data.session.user.get('user').get('admin') ){

				dataToSearch.client = data.session.user.get('user')

			}

			HotelModel
				.getHotelById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					if( !result.hotel ){

						data.back.response = {
							success : false,
							error   : 'No se encontraron registros'
						}

						return end()

					}

					data.back.hotel = result.hotel

					data.back.client = data.back.hotel.get('client')

					createRoom()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > createRoom > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function createRoom(){

		try{

			let dataToCreate = {
				type      : data.front.type,
				capacity  : data.front.capacity,
				price     : data.front.price,
				available : data.front.available,
				client    : data.back.client,
				hotel     : data.back.hotel
			}

			RoomModel
				.createRoom(dataToCreate)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					data.back.response = {
						success : true,
						room    : result.room
					}

					end()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > createRoom > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function end(){

		try{

			return res.send( data.back.response )
			
		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > createRoom > 3')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function updateRoom(req, res){

	let data = {
		front   : _.assign(req.body, req.params, req.query),
		back    : {
			response : {}
		},
		session : {
			user : req.user
		}
	}

	validateParams()

	function validateParams(){

		try{

			req.body = data.front

			let dataToValidate = {
				roomId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo roomId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo roomId posee un formato incorrecto'
						}
					}
				},
				type : {
					notEmpty : {
						errorMessage : {
							message : 'El campo type es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo type posee un formato incorrecto'
						}
					}
				},
				capacity : {
					notEmpty : {
						errorMessage : {
							message : 'El campo capacity es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo capacity posee un formato incorrecto'
						}
					}
				},
				price : {
					notEmpty : {
						errorMessage : {
							message : 'El campo price es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo price posee un formato incorrecto'
						}
					}
				},
				available : {
					notEmpty : {
						errorMessage : {
							message : 'El campo available es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo available posee un formato incorrecto'
						}
					}
				}
			}

			req.checkBody(dataToValidate)

			let error = req.validationErrors()

			if (error){

				data.back.response = {
					success : false,
					error   : error
				}

				return end()

			}

			search()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR room.js > updateRoom > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function search(){

		try{

			let dataToSearch = {
				objectId : data.front.roomId
			}

			dataToSearch.include = ['client']

			if( !data.session.user.get('user').get('admin') ){

				dataToSearch.client = data.session.user.get('user')

			}

			RoomModel
				.getRoomById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					if( !result.room ){

						data.back.response = {
							success : false,
							error   : 'No se encontraron registros'
						}

						return end()

					}

					data.back.room = result.room

					updateRoom()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > updateRoom > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function updateRoom(){

		try{

			let dataToUpdate = {
				type      : data.front.type,
				capacity  : data.front.capacity,
				price     : data.front.price,
				available : data.front.available,
			}

			RoomModel
				.updateRoom(data.back.room, dataToUpdate)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					data.back.response = {
						success    : true,
						hotel : result.room
					}

					end()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > updateRoom > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function end(){

		try{

			return res.send( data.back.response )
			
		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > updateRoom > 3')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function deleteRoom(req, res){

	let data = {
		front   : _.assign(req.body, req.params, req.query),
		back    : {
			response : {}
		},
		session : {
			user : req.user
		}
	}

	validateParams()

	function validateParams(){

		try{

			req.body = data.front

			let dataToValidate = {
				roomId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo roomId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo roomId posee un formato incorrecto'
						}
					}
				}
			}

			req.checkBody(dataToValidate)

			let error = req.validationErrors()

			if (error){

				data.back.response = {
					success : false,
					error   : error
				}

				return end()

			}

			search()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR room.js > deleteRoom > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function search(){

		try{

			let dataToSearch = {
				objectId : data.front.roomId
			}

			if( !data.session.user.get('user').get('admin') ){

				dataToSearch.client = data.session.user.get('user')

			}

			RoomModel
				.getRoomById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					if( !result.room ){

						data.back.response = {
							success : false,
							error   : 'No se encontraron registros'
						}

						return end()

					}

					data.back.room = result.room

					deleteRoom()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > deleteRoom > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function deleteRoom(){

		try{

			RoomModel
				.deleteRoom(data.back.room)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					data.back.response = {
						success : true,
						room    : result.room
					}

					end()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > deleteRoom > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function end(){

		try{

			return res.send( data.back.response )
			
		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > deleteRoom > 3')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

module.exports = controller