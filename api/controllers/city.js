let _ = require('lodash')

let CityModel = require('../models/city')

let controller = {
	getCities  ,
	getCityById,
	createCity ,
	updateCity ,
	deleteCity
}

function getCities(req, res){

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
			console.log('ERROR city.js > getCities > 0')
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

			CityModel
				.getCities(dataToSearch)
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
						cities  : result.cities
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
			console.log('ERROR city.js > getCities > 1')
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
			console.log('ERROR city.js > getCities > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function getCityById(req, res){

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
				cityId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo cityId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo cityId posee un formato incorrecto'
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
			console.log('ERROR city.js > getCityById > 0')
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
				objectId : data.front.cityId
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

					data.back.response = {
						success : true,
						city    : result.city
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
			console.log('ERROR city.js > getCityById > 1')
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
			console.log('ERROR city.js > getCityById > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function createCity(req, res){

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

			createCity()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR city.js > createCity > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function createCity(){

		try{

			let dataToCreate = {
				name : data.front.name
			}

			CityModel
				.createCity(dataToCreate)
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
						city    : result.city
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
			console.log('ERROR city.js > createCity > 1')
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
			console.log('ERROR city.js > createCity > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function updateCity(req, res){

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
				cityId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo cityId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo cityId posee un formato incorrecto'
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

			getCity()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR city.js > updateCity > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function getCity(){

		try{

			let dataToSearch = {
				objectId : data.front.cityId
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

					update()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR city.js > updateCity > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function update(){

		try{

			let dataToUpdate = {
				name : data.front.name
			}

			CityModel
				.updateCity(data.back.city, dataToUpdate)
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
						city    : result.city
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
			console.log('ERROR city.js > updateCity > 2')
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
			console.log('ERROR city.js > updateCity > 3')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function deleteCity(req, res){

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
				cityId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo cityId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo cityId posee un formato incorrecto'
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

			searchCity()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR city.js > deleteCity > 0')
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
				objectId : data.front.cityId
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

					deleteCity()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR city.js > deleteCity > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function deleteCity(){

		try{

			CityModel
				.deleteCity(data.back.city)
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
						city    : result.city
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
			console.log('ERROR city.js > deleteCity > 2')
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
			console.log('ERROR city.js > deleteCity > 3')
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