#! /usr/bin/env node
var shell = require("shelljs");
var theDir = __dirname;
var path = require('path');
var thePath = path.join(theDirr, 'index.js');
console.log('The path being used.', thePath);
shell.exec("node "+thePath);