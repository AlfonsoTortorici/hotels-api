let model = {
	getRoomById,
	getRooms   ,
	createRoom ,
	updateRoom ,
	deleteRoom       
}

function getRoomById(data){

	let query = new Parse.Query('Room')

	query.equalTo('objectId', data.objectId)

	if( data.client ){

		query.equalTo('client', data.client)

	}

	return query
		.first({ useMasterKey : true })
		.then(function(room){

			return {
				success : true,
				room    : room
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function getRooms(data){

	let query = new Parse.Query('Room')

	query.limit( data.limit * 1 )

	query.skip( data.skip * 1 )

	if( data.client ){

		query.equalTo('client', data.client)

	}

	if( data.hotel ){

		query.equalTo('hotel', data.hotel)

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
		.then(function(rooms){

			return {
				success : true,
				rooms  : rooms
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function createRoom(data){

	let room = new Parse.Object('Room')

	return room
		.save(data)
		.then(function(room){

			return {
				success : true,
				room   : room
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function updateRoom(room, data){

	return room
		.save(data, { useMasterKey : true })
		.then(function(room){

			return {
				success : true,
				room   : room
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

function deleteRoom(room){

	return room
		.destroy({ useMasterKey : true })
		.then(function(room){

			return {
				success : true,
				room   : room
			}

		},function(error){

			return {
				success : false,
				error   : error
			}

		})

}

module.exports = model