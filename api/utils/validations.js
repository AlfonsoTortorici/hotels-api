var _ = require('lodash');

var validations = {
	customValidators : {}
};

validations.customValidators.isNumber = function(value){

	var number = value * 1;

	if( _.isNaN(number) ){

		return false;

	}

	return _.isNumber(number);

}

validations.customValidators.isSecure = function(value){

	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	var input = [
		/'.*;/,
		/'.*or/i,
		/'.*and/i,
		/\.\.\//,
		/^\//
	];
	for(var i=0; i<input.length; i++){
		if (value.match(input[i])) {
			return false;
		}
	}
	
	return true;

}

validations.customValidators.isSafeArrayObject = function(value) {

	var toValidate = [];
	_.forEach(value, function(item, index){

		if(_.size(item)){
			_.forEach(item, function(val, key){

				if(_.isEmpty(val))
					toValidate.push(val);

				if(!validations.customValidators.isSecure(val))
				 toValidate.push(val);
			});
		}

	});

	if(toValidate.length)
		return false;

	return true;
}

validations.customValidators.isString = function(value){
	if(value === null)
		return true;
	var str = typeof value;
	return str == 'string' ? true: false;
}

validations.customValidators.isArray = function(value){
	if(value === null)
		return true;
	return Array.isArray(value);
}

validations.customValidators.isCustomDate = function(value, params){

	if( !moment(value, params.format).isValid() ){

		return false

	}

	return true;

}

validations.customValidators.isDate = function(value){
	var userDate = new Date(value);
	if(isNaN(userDate))
		return false
	return true;
}

validations.customValidators.isValidDate = function(value, format){
	//optional field
	if(value === null)
		return true;
	//validate string
	if(typeof value !== "string")
		return false;
	//year month day hour(24 hour format) minutes seconds
	if(format === "yyyy-mm-dd hh:mm:ss")
		return moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid();
	//year month day
	else if(format == "yyyy-mm-dd")
		return moment(value, 'YYYY-MM-DD', true).isValid();
	//hour(24 hour format) minutes
	else if(format == "hh:mm")
		return moment(value, 'HH:mm', true).isValid();
	//return
	return false;
}

validations.customValidators.isMonthsDate = function(value, format){
	//optional field
	if(value === null)
		return true;
	//validate string
	if(typeof value !== "string")
		return false;
	//
	//replace spaces
	var months = value.replace(' ', '');
	//months array
	months = months.split(',');
	//
	var validate = [];
	_.forEach(months, function(item){
		//year month day
		if(format === "YYYY-MM-DD")
			validate.push(moment(item, 'YYYY-MM-DD', true).isValid());
		//year month
		else if(format == "YYYY-MM")
			validate.push(moment(item, 'YYYY-MM', true).isValid());
	});
	var invalid = _.find(validate, function(data){
		return data === false
	});
	if(invalid === false)
		return false;
	else
		return true;
}

validations.customValidators.same = function(value, options){

	if(_.isArray(value) && _.isArray(options)){
		var difference = _.difference(value, options);
		if(!difference.length)
			return true;
	}

	if(_.isArray(options) && _.isString(value)){
		for(var i = 0; i < options.length; i++){
			if(_.indexOf(options, value) !== -1)
				return true;
		}
	}

	else if (_.isString(value)){
		if(value.match(options)){
			return true;
		}
	}

	return false;
}

validations.customValidators.isObject = function(value){

	return _.isPlainObject(value);

}

validations.customValidators.gte = function(value, num){

	return value >= num;

}

validations.customValidators.isSafeText  = function(value){
	var regex = new RegExp("^[a-zA-Z0-9 _.-]+$");
	if(value === null)    return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isValidFbPost  = function(value){
	var regex = new RegExp("^[0-9]+_[0-9]+$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isValidCharacters  = function(value){
	// characters: ¡!()
	var regex = new RegExp("^[/(/)/!/¡ a-zA-Z0-9 ,.-]+$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isValidColor  = function(value){
	var regex = new RegExp("^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isValidTwitterUsername  = function(value){
	// characters: _
	var regex = new RegExp("^[a-zA-Z0-9 _]+$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isCreditCard  = function(value){
	var regex = new RegExp("^((4\d{3})|(5[1-5]\d{2})|(6011)|(7\d{3}))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isIp  = function(value){
	var regex = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isUrl  = function(value){
	var regex = new RegExp("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:)|(www))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:]])?$");
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	return value.match(regex) ? true: false;
}

validations.customValidators.isAge = function(value) {
	var regex = new RegExp('^(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-5])$');
	if(value === null)
		return true;

	return regex.test(value) ? true: false;
}

validations.customValidators.isUriData = function(value){
	var regex = new RegExp(/^\s*data:([a-z]+\/[a-z0-9\-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
	if(value === null)
		return true;
	return regex.test(value) ? true: false;
}

validations.customValidators.isValidPostId  = function(value){
	// characters:
	var regex = new RegExp("[0-9]._[0-9]");
	console.log(regex);
	if(value === null)
		return true;
	if(typeof value != "string")
		return false;
	var a = value.match(regex) ? true: false;
	console.log(a);
	return value.match(regex) ? true: false;
}

validations.customValidators.isLatitude = function(value){
	var regex = new RegExp("^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$");
	return regex.test(value);
}

validations.customValidators.isLongitude = function(value){
	var regex = new RegExp("^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$");
	return regex.test(value);
}

validations.customValidators.isValidTwitterPaging  = function(value){
	// paginate: 0-9
	if (value){
		var paginate = Math.round(1000/20);
		var regex = new RegExp("^[0-9]+$");
		if (!value.match(regex) ? true: false)return false;
		value = parseInt(value);
		if (value>0 && value<=paginate)
			return true;
		else
			return false;
	}else{
		return false;
	}
}

validations.customValidators.isValidName = function(value){
	var regex = new RegExp(/^[a-zA-Z ñáéíóú']+(\s?[a-zA-Z ñáéíóú'])*$/);
	return regex.test(value);
}

module.exports = validations;
