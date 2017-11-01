let model = {
	getUserById           ,
	getUserBySessionToken ,
	getUsers              ,
	createUser            ,
	updateUser            ,
	deleteUser            ,
	login
}

function getUserById(data){

	let query = new Parse.Query('User')

	query.equalTo('objectId', data.objectId)

	if( data.client ){

		query.equalTo('client', data.client)

	}

	if( data.admin ){

		query.equalTo('admin', data.admin)

	}

	if( data.include ){

		query.include( data.include )

	}

	return query
		.first({ useMasterKey : true })
		.then(function(user){

			return {
				success : true,
				user    : user
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function getUserBySessionToken(data){

	let query = new Parse.Query(Parse.Session)

	query.equalTo('sessionToken', data.sessionToken)
	query.include('user')

	return query
		.first({ useMasterKey : true })
		.then(function(user){

			return {
				success : true,
				user    : user
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function getUsers(data){

	let query = new Parse.Query('User')

	if( data.limit ){

		query.limit( data.limit * 1 )

	}

	if( data.skip ){

		query.skip( data.skip * 1 )
	
	}

	if( data.client ){

		query.equalTo('client', data.client)

	}

	if( data.admin ){

		query.equalTo('admin', data.admin)

	}

	if( data.ascending ){

		query.ascending( data.ascending )

	}

	if( data.descending ){

		if( data.ascending){

			query.addDescending( data.descending )
		
		}else{

			query.descending( data.descending )

		}

	}

	if( data.include ){

		query.include( data.include )

	}

	return query
		.find({ useMasterKey : true })
		.then(function(users){

			return {
				success : true,
				users   : users
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function createUser(data){

	let user = new Parse.User()

	return user
		.signUp(data)
		.then(function(user){

			return {
				success : true,
				user    : user
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function updateUser(user, data){

	return user
		.save(data, { useMasterKey : true })
		.then(function(user){

			return {
				success : true,
				user    : user
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function deleteUser(user){

	return user
		.destroy({ useMasterKey : true })
		.then(function(user){

			return {
				success : true,
				user    : user
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function login(data){

	return Parse
		.User
		.logIn(data.username, data.password)
		.then(function (user) {

			return {
				success : true,
				user    : user
			}
		
		}, function(error){

			return {
				success : false,
				error   : error
			}

		})

}

module.exports = model