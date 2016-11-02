/**
 TODOS:
 1.) Ability to use your own templates.
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
 * Creates a scaffold of your react components.
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
		let storesList = config.stores;
		let constantsList = config.constants;
		const directories = (dir) => { 
			fs.mkdir(dir+'/components');
			fs.mkdir(dir+'/constants');
			fs.mkdir(dir+'/stores');
			fs.mkdir(dir+'/utils');
		}

		// Create the directory if it doesn't already exist.
		var createFile = new Promise( function(fulfill, reject){

			if ( !fs.existsSync(dir) ){
				let d = fs.mkdir(dir, function(err){
					directories(dir);
					fulfill(d);
				});
			} else if (rebuild) {
				// Delete the file.
				fs_extra.remove(dir, function(err){
					if( err ) throw err;
					let d = fs.mkdir(dir, function(err){
						directories(dir);
						fulfill(d);
					});
				});
			}
		});

		createFile.then( function(res) {
			// Create the files.
			componentsList.map( function(component){
				if( typeof component === "object" ) {
					fs.writeFile(dir+"/components/"+component.name+".jsx", jsxTemplate(component, component.type) , function(err) {
						if( err ) throw err;
						console.log( chalk.green('Created file: '), chalk.bgGreen(component.name+'.jsx') + ' ' + chalk.dim(component.type) );
					});
				} else {
					fs.writeFile(dir+"/components/"+component+".jsx", jsxTemplate(component, 'default') , function(err) {
						if( err ) throw err;
						console.log( chalk.green('Created file: '), chalk.bgGreen(component+'.jsx') );
					});	
				}	
			});
			
			// Create store files.
			storesList.map( function(store){
				fs.writeFile(dir+'/stores/'+store+'.js', '// TODO: '+store+'.js', function(err){
					if( err ) throw err;
					console.log( chalk.green('Created file: '), chalk.bgCyan(store+'.js') );
				});
			});

			// Create constants files.
			constantsList.map( (constant) => {
				fs.writeFile(dir+'/constants/'+constant+'Constants.js', constantTemplate(constant), function(err){
					if( err ) throw err;
					console.log( chalk.green('Created file: '), chalk.bgBlack(constant+'Constants.js') );
				});
			});

			let totalFiles = componentsList.length + storesList.length;
			console.log( ' ' + emoji.get(':grapes:') + ' ' + ' Member? Member when I created', chalk.yellow(totalFiles + ' files. Ohhh I member!\r\n') );

			if ( rebuild === true ) {
				console.log(chalk.yellow('Directory was rebuilt ') + '\r\n' );
			}

		});

	}

	function constantTemplate(constant){
		return `/**** ===== [Example] =====`+
		`\r\nvar keyMirror = require('keymirror');\r\n`+
		`\r\nmodule.exports = keyMirror({`+
			`\r\n\tCONSTANT_NAME : 'CONSTANT_NAME', // Example`+
		`\r\n});`+
		`\r\n****/`;
	}

	function jsxTemplate(component, type) {
		// Defaults.
		let name = component;
		let methods = [];
		let dependencies = [];
		let store = null;

		if ( typeof component === "object" ) {
			name = component.name;
			methods = (component.hasOwnProperty('methods')) ? component.methods: [];
			dependencies = (component.hasOwnProperty('dependencies')) ? component.dependencies: [];
			store = (component.hasOwnProperty('store')) ? component.store: [];
		}
		
		let contents = ``;

		switch(type) {
			case "pure":
				contents = pure.call(contents, name, methods);
				break;
			case "other":
				break;
			default:
				contents = es6.call(contents, name, methods, dependencies, store);
		} // End case.

		return contents;
	}

	return makeProjectFiles();
})();

// Templates.
const methodBuilder = (method) => 
`	`+`
	${method}() {

	}`+`\r\n`;

const methodBinder = (method) =>
`		`+`this.${method} = this.${method}.bind(this);`;

function dependencyBuilder(dependency) {
	if( typeof dependency === "object" ) {
		return	`import ${dependency.name} from '${dependency.dependency}';\r\n`;
	} else {
		return	`import ${dependency} from '${dependency}';\r\n`;
	}	
}

function storeBuilder(name,store) {
	if( store !== null){
		return `function get${name}Store(){`+
		`\r\n\treturn {`+ 
			`\r\n\t\t${name.charAt(0).toLowerCase()}${name.slice(1)}Store : ${ keyBuilder(store) }`+
		`\r\n\t}`+
		`\r\n}\r\n`;
	} else {
		return ``;
	}
}

function keyBuilder(store){
	if( typeof store === "object" ){
		let keys = Object.keys(store);
		return `{`+
			`${ keys.map( (key) => `\r\n\t\t\t\t"${key}" : ${JSON.stringify(store[key])}` ) }`+
		`\r\n\t\t}`;
	}else{

	}
	//return `"${key}" : ${value}`;
}

function dependencyRender(dependency) {
	if( typeof dependency === "object" && dependency.render === true ) {
		let n = dependency.name.replace(/([\{\}'])+/g,'').replace(/(^\s+|\s+$)/g, '');
		return	`<${n} {...this.props}/>`;
	} else {
		return	``;
	}
}


const pure = (name) =>
`import React, { Component } from 'react';

export const ${name} = (props) => (
	<div></div>
);`;

const es6 = (name, methods, dependencies, store) =>
`import React, { Component } from 'react';`+
`${ dependencies.map( (dependency) => dependencyBuilder(dependency) ).join('') }\r\n`+
`${ storeBuilder(name, store) }`
+`
export default class ${name} extends React.Component {

	constructor(props) {
		super(props);`+`\r\n`+
		`\t\tthis.state = get${name}Store();\r\n`+
		`${ methods.map( (method) => methodBinder(method) ).join('\r\n') }`+`
	}

	componentDidMount() {

	}`+`
	${ methods.map( (method) => methodBuilder(method) ).join('') }
	`+
	`render(){
		return(
			<div>\r\n`+`\t\t\t\t${ dependencies.map( (render) => dependencyRender(render) ).join('') }`+`\r\n\t\t\t<div>
		)
	}
};`;