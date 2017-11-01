let _ = require('lodash')

let UserModel = require('../models/user')

let controller = {
	getClients   ,
	getClientById,
	createClient ,
	updateClient ,
	deleteClient
}

function getClients(req, res){

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
			console.log('ERROR client.js > getClients > 0')
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

			dataToSearch.client = true

			UserModel
				.getUsers(dataToSearch)
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
						clients : result.users
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
			console.log('ERROR client.js > getClients > 1')
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
			console.log('ERROR client.js > getClients > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function getClientById(req, res){

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
				clientId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo clientId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo clientId posee un formato incorrecto'
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
			console.log('ERROR client.js > getClientById > 0')
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
				objectId : data.front.clientId
			}

			dataToSearch.client = true

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

					data.back.response = {
						success : true,
						client  : result.user
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
			console.log('ERROR client.js > getClientById > 1')
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
			console.log('ERROR client.js > getClientById > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function createClient(req, res){

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
				firstname : {
					notEmpty : {
						errorMessage : {
							message : 'El campo firstname es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo firstname posee un formato incorrecto'
						}
					}
				},
				lastname : {
					notEmpty : {
						errorMessage : {
							message : 'El campo lastname es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo lastname posee un formato incorrecto'
						}
					}
				},
				email : {
					notEmpty : {
						errorMessage : {
							message : 'El campo email es obligatorio'
						}
					},
					isEmail : {
						errorMessage : {
							message : 'El campo email posee un formato incorrecto'
						}
					}
				},
				username : {
					notEmpty : {
						errorMessage : {
							message : 'El campo username es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo username posee un formato incorrecto'
						}
					}
				},
				password : {
					notEmpty : {
						errorMessage : {
							message : 'El campo password es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo password posee un formato incorrecto'
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

			createUser()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR client.js > createClient > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function createUser(){

		try{

			let dataToCreate = {
				firstname : data.front.firstname,
				lastname  : data.front.lastname,
				fullname  : data.front.firstname + ' ' + data.front.lastname,
				email     : data.front.email,
				username  : data.front.username,
				password  : data.front.password,
				client    : true
			}

			UserModel
				.createUser(dataToCreate)
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
						client  : result.user
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
			console.log('ERROR client.js > createClient > 1')
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
			console.log('ERROR client.js > createClient > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function updateClient(req, res){

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
				clientId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo clientId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo clientId posee un formato incorrecto'
						}
					}
				},
				firstname : {
					notEmpty : {
						errorMessage : {
							message : 'El campo firstname es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo firstname posee un formato incorrecto'
						}
					}
				},
				lastname : {
					notEmpty : {
						errorMessage : {
							message : 'El campo lastname es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo lastname posee un formato incorrecto'
						}
					}
				},
				email : {
					notEmpty : {
						errorMessage : {
							message : 'El campo email es obligatorio'
						}
					},
					isEmail : {
						errorMessage : {
							message : 'El campo email posee un formato incorrecto'
						}
					}
				},
				username : {
					notEmpty : {
						errorMessage : {
							message : 'El campo username es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo username posee un formato incorrecto'
						}
					}
				},
				password : {
					notEmpty : {
						errorMessage : {
							message : 'El campo password es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo password posee un formato incorrecto'
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

			getClient()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR client.js > updateClient > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function getClient(){

		try{

			let dataToSearch = {
				objectId : data.front.clientId
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
			console.log('ERROR client.js > updateClient > 1')
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
				firstname     : data.front.firstname,
				lastname      : data.front.lastname,
				fullname      : data.front.firstname + ' ' + data.front.lastname,
				email         : data.front.email,
				username      : data.front.username,
				password      : data.front.password
			}

			UserModel
				.updateUser(data.back.client, dataToUpdate)
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
						client  : result.user
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
			console.log('ERROR client.js > updateClient > 2')
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
			console.log('ERROR client.js > updateClient > 3')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function deleteClient(req, res){

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
				clientId : {
					notEmpty : {
						errorMessage : {
							message : 'El campo clientId es obligatorio'
						}
					},
					isString : {
						errorMessage : {
							message : 'El campo clientId posee un formato incorrecto'
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

			searchUser()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR client.js > deleteClient > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function searchUser(){

		try{

			let dataToSearch = {
				objectId : data.front.clientId
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

					deleteUser()

				},function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR client.js > deleteClient > 1')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function deleteUser(){

		try{

			UserModel
				.deleteUser(data.back.client)
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
						client  : result.user
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
			console.log('ERROR client.js > deleteClient > 2')
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
			console.log('ERROR client.js > deleteClient > 3')
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