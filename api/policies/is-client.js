var UserModel = require('../models/user');

module.exports = function(req, res, next){

	if( !req.user.get('user').get('admin') && !req.user.get('user').get('client') ){

		var response = {
			success : false,
			error   : {
				description : 'This user dont have permissions for this action'
			}
		}

		return res.send(response)

	}

	next()

}