let _ = require('lodash')

let CityModel  = require('../models/city')
let UserModel  = require('../models/user')
let HotelModel = require('../models/hotel')

let controller = {
	getHotels   ,
	getHotelById,
	createHotel ,
	updateHotel ,
	deleteHotel
}

function getHotels(req, res){

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
				client : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo client posee un formato incorrecto'
						}
					}
				},
				city : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo city posee un formato incorrecto'
						}
					}
				},
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
			console.log('ERROR hotel.js > getHotels > 0')
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

			dataToSearch.include = ['rooms']

			if( !data.session.user.get('user').get('admin') ){

				dataToSearch.client = data.session.user.get('user')

			}

			HotelModel
				.getHotels(dataToSearch)
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
						hotels  : result.hotels
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
			console.log('ERROR hotel.js > getHotels > 1')
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
			console.log('ERROR hotel.js > getHotels > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function getHotelById(req, res){

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
				hotelId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo hotelId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo hotelId posee un formato incorrecto'
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
			console.log('ERROR hotel.js > getHotelById > 0')
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
				objectId : data.front.hotelId
			}

			dataToSearch.include = ['rooms']

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

					data.back.response = {
						success : true,
						hotel   : result.hotel
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
			console.log('ERROR hotel.js > getHotelById > 1')
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
			console.log('ERROR hotel.js > getHotelById > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function createHotel(req, res){

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
				client : {
					notEmpty : {
						errorMessage : {
							message : 'El campo client es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo client posee un formato incorrecto'
						}
					}
				},
				city : {
					notEmpty : {
						errorMessage : {
							message : 'El campo city es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo city posee un formato incorrecto'
						}
					}
				},
				name : {
					notEmpty : {
						errorMessage : {
							message : 'El campo name es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo name posee un formato incorrecto'
						}
					}
				},
				address : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo address posee un formato incorrecto'
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
			console.log('ERROR hotel.js > createHotel > 0')
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
				objectId : data.front.client
			}

			UserModel
				.getUserById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					if( !result.user ){

						data.back.response = {
							success : false,
							error   : 'No se encontraron registros'
						}

						return end()

					}

					data.back.client = result.user

					searchCity()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > createHotel > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function searchCity(){

		try{

			let dataToSearch = {
				objectId : data.front.city
			}

			CityModel
				.getCityById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					if( !result.city ){

						data.back.response = {
							success : false,
							error   : 'No se encontraron registros'
						}

						return end()

					}

					data.back.city = result.city

					createHotel()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > createHotel > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function createHotel(){

		try{

			let dataToCreate = {
				name    : data.front.name,
				address : data.front.address,
				client  : data.back.client,
				city    : data.back.city
			}

			HotelModel
				.createHotel(dataToCreate)
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
						hotel   : result.hotel
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
			console.log('ERROR hotel.js > createHotel > 2')
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
			console.log('ERROR hotel.js > createHotel > 3')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function updateHotel(req, res){

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
				hotelId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo hotelId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo hotelId posee un formato incorrecto'
						}
					}
				},
				client : {
					notEmpty : {
						errorMessage : {
							message : 'El campo client es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo client posee un formato incorrecto'
						}
					}
				},
				name : {
					notEmpty : {
						errorMessage : {
							message : 'El campo name es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo name posee un formato incorrecto'
						}
					}
				},
				address : {
					optional : true,
					isString : {
						errorMessage : {
							message : 'El campo address posee un formato incorrecto'
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
			console.log('ERROR hotel.js > updateHotel > 0')
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
				objectId : data.front.client
			}

			UserModel
				.getUserById(dataToSearch)
				.then(function(result){

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					if( !result.user ){

						data.back.response = {
							success : false,
							error   : 'No se encontraron registros'
						}

						return end()

					}

					data.back.client = result.user

					getHotel()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > updateHotel > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function getHotel(){

		try{

			let dataToSearch = {
				objectId : data.front.hotelId
			}

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

					updateHotel()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > updateHotel > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function updateHotel(){

		try{

			let dataToUpdate = {
				name    : data.front.name,
				address : data.front.address,
				client  : data.back.client
			}

			!data.back.client ? delete dataToUpdate.client : false

			HotelModel
				.updateHotel(data.back.hotel, dataToUpdate)
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
						hotel : result.hotel
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
			console.log('ERROR hotel.js > updateHotel > 3')
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
			console.log('ERROR hotel.js > updateHotel > 4')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function deleteHotel(req, res){

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
				hotelId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo hotelId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo hotelId posee un formato incorrecto'
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
			console.log('ERROR hotel.js > deleteHotel > 0')
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
				objectId : data.front.hotelId
			}

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

					deleteHotel()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR hotel.js > deleteHotel > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function deleteHotel(){

		try{

			HotelModel
				.deleteHotel(data.back.hotel)
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
						hotel   : result.hotel
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
			console.log('ERROR hotel.js > deleteHotel > 2')
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
			console.log('ERROR hotel.js > deleteHotel > 3')
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