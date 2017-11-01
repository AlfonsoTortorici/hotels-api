var fs = require('fs')

module.exports = function(req, res, next){

	if( !fs.existsSync('config/logs') ){

		fs.mkdirSync('config/logs')

	}

	let user = req.user.get('user')

	let now = new Date()

	now = now.getTime()

	let text =
		'User Id : '   + user.id    +
		'\nUrl : '     + req.url    +
		'\nMethod : '  + req.method

	fs.writeFile('config/logs/' + user.id + '_' + now + '.txt', text, function(error) {

		if(error) {

			return next()

		}

		next()

	})

}