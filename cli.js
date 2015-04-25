#!/usr/bin/env node
var wzrd = require('wzrd')
var open = require('open')

wzrd.http({entries: [{from: 'app.js', to: 'bundle.js'}]}).listen(8080)
open('http://localhost:8080')