var _ = require('lodash')
var fs = require('fs')

let utils = {
	orderBy,
	generateRandomCode
}

function orderBy(data) {
	
	let keys = []
	let options = []

	if(data.ascending){

		keys.push(data.ascending)

		options.push('asc')

	}

	if(data.descending){

		keys.push(data.descending)

		options.push('desc')

	}

	return _.orderBy(data.array, keys, options)

}

function generateRandomCode (length) {

	var numbers = '0123456789'
	var lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
	var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var character = ''
	var code = ''
	character += numbers
	character += lowercaseLetters
	character += uppercaseLetters

	for(var i=0; i < length; i++){

		code += character.charAt( getRandomNumber(0, character.length) )

	}

	function getRandomNumber(lowerBound,upperBound){ 

		random = Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound

		return random

	}

	return code
}

module.exports = utils