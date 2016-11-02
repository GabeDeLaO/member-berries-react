# :grapes: Member Berries v0.3.8 :grapes:

A module for scaffolding out your React App's Components &amp; Store files. 
<br>*Inspired by the "Member Berries" of SouthPark.*

## Installation.

Using npm:
```shell
$ npm install react-member-berries --save
```

Usage in Terminal: 
*make sure you've created your `member.berry` file, look below for explanation.*
```shell
$ member-berries 
```
To force a rebuild:
```shell
$ member-berries-rebuild
```

Create your `member.berry` config file (a JSON file with the following keys: settings, components, stores, and constants):
```javascript
{
	"settings" : {
		"directory" : "./app"
	},
	"components": [
		{
			"name" : "Nav",
			"type" : "pure"
		},
		"Layout",
		"TestScreen"
	],
	"stores": [
		"MainStore"
	],
	"constants" : [
		"App"
	]
}
```
This `member.berry` config file would create an **'./app'** directory with the following folder structure:
```
/app/
|
|--- components/
|--- constants/
|--- stores/
|--- utils/
```

## Sections

### Components:
Each component you list can have the following options:
``` javascript
{
	"name" : "", // The Name of the Component
	"type" : "", // default|pure
	"dependencies" : [
		{ "name" : "", "dependency" : "" }, // Dependency with alias.
		"Layout" // Default dependency, no alias
	],
	"methods" : [""], // A list of method names to include in the component.
	"store" : {} // 
}
```

Licensed under [MIT License](LICENSE.txt).