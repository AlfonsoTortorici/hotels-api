let _ = require('lodash')

let UserModel = require('../models/user')

let controller = {
	login   ,
	session
}

function login(req, res){

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

			loginUser()

		}catch(error){

			console.log('*********************************')
			console.log('ERROR authentication.js > login > 0')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

	function loginUser(){

		try{

			let dataToSend = {
				username : data.front.username.toLowerCase(),
				password : data.front.password
			}

			UserModel
				.login(dataToSend)
				.then(function (result) {

					if( !result.success ){

						data.back.response = {
							success : false,
							error   : result.error
						}

						return end()

					}

					data.back.response = {
						success      : true,
						sessionToken : result.user.get('sessionToken')
					}

					end()
				
				}, function(error){

					data.back.response = {
						success : false,
						error   : error
					}

					end()

				})

		}catch(error){

			console.log('*********************************')
			console.log('ERROR authentication.js > login > 1')
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
			console.log('ERROR authentication.js > login > 2')
			console.log(error)

			data.back.response = {
				success : false,
				error   : error
			}

			end()

		}

	}

}

function session(req, res){

	let data = {
		front   : _.assign(req.body, req.params, req.query),
		back    : {
			response : {}
		},
		session : {
			user : req.user
		}
	}

	data.back.response = {
		success : true,
		session : data.session.user
	}

	end()

	function end(){

		try{

			return res.send( data.back.response )
			
		}catch(error){

			console.log('*********************************')
			console.log('ERROR authentication.js > session > 0')
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
