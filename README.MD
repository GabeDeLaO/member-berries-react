# Member Berries.

A module for scaffolding out a React App's Components.

## Installation.

Using npm:
```shell
	$ npm install react-member-berries --save
```

Create your `member.berry` file (a JSON file with the following keys: settings, components, stores, and constants):
```json
	{
		"settings" : {
			"directory" : "./[directory]"
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

# Sections

Components:
``` json
	...
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