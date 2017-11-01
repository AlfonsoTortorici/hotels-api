let model = {
	getHotelById,
	getHotels   ,
	createHotel ,
	updateHotel ,
	deleteHotel
}

function getHotelById(data){

	let query = new Parse.Query('Hotel')

	query.equalTo('objectId', data.objectId)

	if( data.client ){

		query.equalTo('client', data.client)

	}

	return query
		.first({ useMasterKey : true })
		.then(function(hotel){

			return {
				success : true,
				hotel   : hotel
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function getHotels(data){

	let query = new Parse.Query('Hotel')

	if( data.limit ){

		query.limit( data.limit * 1 )

	}

	if( data.skip ){

		query.skip( data.skip * 1 )
	
	}
	
	if( data.client ){

		query.equalTo('client', data.client)

	}

	if( data.city ){

		query.equalTo('city', data.city)

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

	return query
		.find({ useMasterKey : true })
		.then(function(hotels){

			return {
				success : true,
				hotels  : hotels
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function createHotel(data){

	let hotel = new Parse.Object('Hotel')

	return hotel
		.save(data)
		.then(function(hotel){

			return {
				success : true,
				hotel   : hotel
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function updateHotel(hotel, data){

	return hotel
		.save(data, { useMasterKey : true })
		.then(function(hotel){

			return {
				success : true,
				hotel   : hotel
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function deleteHotel(hotel){

	return hotel
		.destroy()
		.then(function(hotel){

			return {
				success : true,
				hotel   : hotel
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

module.exports = model