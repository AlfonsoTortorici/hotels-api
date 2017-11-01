let UserModel = require('../models/user');

module.exports = function(req, res, next){

	let sessionToken = req.headers['x-parse-session-token'];

	if( !sessionToken ){

		let response = {
			success : false,
			error   : {
				description : 'No token found in headers'
			}
		}

		return res.send(response)

	}

	let dataToSearch = {
		sessionToken : sessionToken
	}
	
	UserModel
		.getUserBySessionToken(dataToSearch)
		.then(function(result){

			if( !result.success ){

				let response = {
					success : false,
					error   : result.error
				};

				return res.send(response)

			}

			req.user = result.user

			next();

		},function(error){

			let response = {
				success : false,
				error   : error
			};

			return res.send(response)

		});

}