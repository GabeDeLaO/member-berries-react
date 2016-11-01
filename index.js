/**
 TODOS:
 1.) Ability to use your own templates.
 2.) Ability to include methods/functions, and tell which should be bound to 'this'.
 3.) Ability to have other component dependencies.
 4.) Ability to have third party dependencies.
 5.) Ability to pass along props to component dependencies.
 6.) Ability to specify layout & navigation using react router.
 7.) Ability to create your Routes.jsx file.
**/

'use strict';
var fs = require('fs');
var fs_extra = require('fs-extra');
var chalk = require('chalk');
var emoji = require('node-emoji');
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
		var rebuild = false;
		var argues = process.argv.slice(2);
		argues.forEach( function( val, index, array ){
			if( val === "rebuild" ) rebuild = true;
		});

		let config = readFile();
		let dir = config.settings.directory;
		let componentsList = config.components;
		// Create the directory if it doesn't already exist.
		var createFile = new Promise( function(fulfill, reject){

			if ( !fs.existsSync(dir) ){
				let d = fs.mkdirSync(dir);
				fulfill(d);
			} else if (rebuild) {
				// Delete the file.
				fs_extra.remove(dir, function(err){
					if( err ) throw err;
					let d = fs.mkdirSync(dir);
					fulfill(d);
				});
			}
		});

		createFile.then( function(res) {
			// Create the files.
			componentsList.map( function(component){
				if( typeof component === "object" ) {
					let meths = null;
					if( component.hasOwnProperty("methods") ){
						meths = component.methods;
					}
					fs.writeFile(dir+"/"+component.name+".jsx", jsxTemplate(component.name, component.type, meths) , function(err) {
						if( err ) throw err;
						console.log( chalk.green('Created file: '), chalk.bgGreen(component.name+'.jsx') + ' ' + chalk.dim(component.type) );
					});
				} else {
					fs.writeFile(dir+"/"+component+".jsx", jsxTemplate(component, 'default') , function(err) {
						if( err ) throw err;
						console.log( chalk.green('Created file: '), chalk.bgGreen(component+'.jsx') );
					});	
				}	
			});
			
			console.log( ' ' + emoji.get(':grapes:') + ' ' + ' Member? Ohhh I member!', chalk.yellow(componentsList.length + ' files. \r\n') );

			if ( rebuild === true ) {
				console.log(chalk.yellow('Directory was rebuilt ') + '\r\n' );
			}

		});

	}

	function jsxTemplate(name, type, methods) {
		
		//console.log('what came in name ' + name , methods);
		if( typeof methods === "undefined") {
			//console.log('No methods array');
			methods = [];
		}
		//console.log('what came in type', type);
		let contents = ``;

		switch(type) {
			case "pure":
				contents = pure.call(contents, name, methods);
				break;
			case "other":
				break;
			default:
				contents = es6.call(contents, name, methods);
		} // End case.

		return contents;
	}

	return makeProjectFiles();
})();

const methodBuilder = (method) => 
`	`+`
	${method}() {

	}`+`\r\n`;

const methodBinder = (method) =>
`		`+`this.${method} = this.${method}.bind(this);`;

const pure = (name) =>
`import React, { Component } from 'react';

export const ${name} = (props) => (
	<div></div>
);`;

const es6 = (name, methods) =>
`import React, { Component } from 'react';

export class ${name} extends React.Component {

	constructor(props) {
		super(props);`+`\r\n`+
		`${ methods.map( (method) => methodBinder(method) ).join('\r\n') }`+`
	}

	componentDidMount() {

	}`+`
	${ methods.map( (method) => methodBuilder(method) ).join('') }
	`+`
	render(){
		return(
			<div><div>
		)
	}
};`;