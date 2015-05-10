var fs = require('fs')

exports.verify = function (code, cb) {
  cb()
}

exports.preload = fs.readFileSync(__dirname + '/nyancat.js', 'utf8')