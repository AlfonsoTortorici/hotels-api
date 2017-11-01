let express          = require('express')
let ParseServer      = require('parse-server').ParseServer
let path             = require('path')
let bodyParser       = require('body-parser')
let expressValidator = require('express-validator')

let customValidations = require('./api/utils/validations.js')

let routes = require('./config/routes')
let config = require('./config/env')

let parseServerConfig = {
	databaseURI : config.parse.databaseURI,
	cloud       : __dirname + config.parse.cloud,
	appId       : config.parse.appId,
	masterKey   : config.parse.masterKey,
	serverURL   : config.parse.serverURL + config.server.port
}

let api = new ParseServer(parseServerConfig)

let app = express()

let mountPath = ''

app.use(mountPath, api)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(expressValidator(customValidations))

routes(app)

app.listen(config.server.port, function() {

	console.log('Parse server corriendo en: ' + config.parse.serverURL + config.server.port)

})