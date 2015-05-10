#!/usr/bin/env node

var browserify = require('browserify')
var fs = require('fs')
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

entries.forEach(function (entry) {
  var b = browserify()
  b.add(entry.from)
  b.bundle().pipe(fs.createWriteStream(entry.to))
})