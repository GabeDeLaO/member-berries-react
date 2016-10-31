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
		let componentsList = config.components;
		// Create the directory if it doesn't already exist.
		var createFile = new Promise( function(fulfill, reject){

			if ( !fs.existsSync(dir) ){
				let d = fs.mkdirSync(dir);
				fulfill(d);
			}
		});

		createFile.then( function(res) {
			// Create the files.
			componentsList.map( function(component){
				if( typeof component === "object" ) {
					fs.writeFile(dir+"/"+component.name+".jsx", jsxTemplate(component.name, component.type) , function(err) {
						console.log('error', err);
					});
				} else {
					fs.writeFile(dir+"/"+component+".jsx", jsxTemplate(component, 'defualt') , function(err) {
						console.log('error', err);
					});	
				}	
			});
			
			console.log("Member? Ohhh I member!");
		});

	}

	function jsxTemplate(name, type) {
		//var type = 'default';
		console.log('what came in name', name);
		console.log('what came in type', type);
		let contents = ``;

		switch(type) {
			case "pure":
				contents = pure.call(contents, name);
				break;
			case "other":
				break;
			default:
				contents = es6.call(contents, name);
		} // End case.

		return contents;
	}

	return makeProjectFiles();
})();

const pure = (name) =>
`import React, { Component } from 'react';

export const ${name} = (props) => (
	<div></div>
);`;

const es6 = (name) =>
`import React, { Component } from 'react';

export class ${name} extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render(){
		return(
			<div><div>
		)
	}
};`;