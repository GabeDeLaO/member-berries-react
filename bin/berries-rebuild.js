#! /usr/bin/env node
var shell = require("shelljs");
var path = require('path');
var memberBerryIndexFile = path.join(path.dirname(__filename),'/../index.js');
shell.exec("node " + memberBerryIndexFile  + " -- rebuild");