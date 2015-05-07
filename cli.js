#!/usr/bin/env node
var wzrd = require('wzrd')
var open = require('open')

var util = require('./util')
var menu = require('./exercises/menu.json')
var entries = [{from: 'app.js', to: 'bundle.js'}]
menu.forEach(function (item) {
  var id = util.idFromName(item)
  entries.push({
    from: 'exercises/' + id + '/index.js',
    to: 'exercises/' + id + '/bundle.js'
  })
})

wzrd.http({
  entries: entries
}).listen(8080)
open('http://localhost:8080')