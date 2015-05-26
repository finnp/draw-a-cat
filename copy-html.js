#!/usr/bin/env node
var fs = require('fs')
var glob = require('glob')

glob('exercises/*', function (err, folders) {
  folders
    .filter(function (file) {
      return file.substr(-4) !== 'json'
    })
    .forEach(function (folder) {
      fs.createReadStream('./exercise.html')
        .pipe(fs.createWriteStream(folder + '/index.html'))
    })
})



