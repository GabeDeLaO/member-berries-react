# Member Berries.

A module for scaffolding out a React App's Components.

## Installation.

Using npm:
```shell
	$ npm install react-member-berries --save
```

Create your `member.berry` file:
```
	{
		"settings" : {
			"directory" : "./app"
		},
		"components": [
			{
				"name" : "Nav",
				"type" : "pure"
			},
			{
				"name" : "MainComponent",
				"type" : "default",
				"dependencies" : [
					{ "name" : "_", "dependency" : "lodash" },
					{ "name" : "Routes", "dependency" : "react-router" },
					"Layout",
					{ "name" : "{ Nav }", "dependency" : "./Nav", "render" : true },
					{ "name" : "Store", "dependency" : "./stores/MainStore.js" }
				],
				"methods" : ["_onBoundedClick", "_onExit", "_onModalClick"],
				"store" : {
					"param1" : ["Penguin"],
					"param2" : {}
				}
			},
			"Layout",
			"Main",
			"TestScreen",
			"BuildOne"
		],
		"stores": [
			"MainStore"
		],
		"constants" : [
			"App",
			"Fixxly"
		]
	}
```