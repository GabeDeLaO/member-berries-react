# Member Berries.

A module for scaffolding out a React App's Components.

## Installation.

Using npm:
```shell
	$ npm install react-member-berries --save
```

Create your `member.berry` file:
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

# Options

Components:
``` json
	...
	{
		"name" : "",
		"type" : "default|pure",
		"dependencies" : [
			{ "name" : "", "dependency" : "" },
			"Layout"
		],
		"methods" : [""],
		"store" : {
			"param1" : ["Penguin"],
			"param2" : {}
		}
	}
```