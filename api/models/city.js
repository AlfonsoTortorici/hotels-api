let model = {
	getCityById,
	getCities  ,
	createCity ,
	updateCity ,
	deleteCity
}

function getCityById(data){

	let query = new Parse.Query('City')

	query.equalTo('objectId', data.objectId)

	if( data.include ){

		query.include( data.include )

	}

	return query
		.first({ useMasterKey : true })
		.then(function(city){

			return {
				success : true,
				city    : city
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function getCities(data){

	let query = new Parse.Query('City')

	if( data.limit ){

		query.limit( data.limit * 1 )

	}

	if( data.skip ){

		query.skip( data.skip * 1 )
	
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
		.then(function(cities){

			return {
				success : true,
				cities  : cities
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function createCity(data){

	let city = new Parse.Object('City')

	return city
		.save(data)
		.then(function(city){

			return {
				success : true,
				city    : city
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function updateCity(city, data){

	return city
		.save(data, { useMasterKey : true })
		.then(function(city){

			return {
				success : true,
				city    : city
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function deleteCity(city){

	return city
		.destroy({ useMasterKey : true })
		.then(function(city){

			return {
				success : true,
				city    : city
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

module.exports = model