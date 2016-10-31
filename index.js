'use strict';
var fs = require('fs');

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = (function(){
	function readFile(){
		let obj = fs.readFileSync('member.berry', 'utf8');
		return JSON.parse(obj);
	}

	function makeProjectFiles(){
		let config = readFile();
		let dir = config.settings.directory;
		// Create the directory if it doesn't already exist.
		var createFile = new Promise( function(fulfill, reject){

			if ( !fs.existsSync(dir) ){
				let d = fs.mkdirSync(dir);
				fulfill(d);
			}
		});

		createFile.then( function(res) {
			console.log(res);
		});

	}

	return makeProjectFiles();
})();