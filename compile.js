#!/usr/bin/env node

var browserify = require('browserify')
var fs = require('fs')
var util = require('./util')
var menu = require('./exercises/menu.json')

var entries = [{from: __dirname + '/app.js', to: __dirname + '/bundle.js'}]

menu.forEach(function (item) {
  var id = util.idFromName(item)
  entries.push({
    from: __dirname + '/exercises/' + id + '/index.js',
    to: __dirname + '/exercises/' + id + '/bundle.js'
  })
})

entries.forEach(function (entry) {
  var b = browserify()
  b.transform('brfs')
  b.add(entry.from)
  b.bundle().pipe(fs.createWriteStream(entry.to))
})