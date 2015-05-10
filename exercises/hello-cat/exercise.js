var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  try {
    eval(code)
    if(catX === 100 && catY == 100) return cb()
    cb(new Error('Set both catX and catY to 100'))
  } catch(e) {
    cb(e)
  }
}

exports.preload = fs.readFileSync(__dirname + '/nyancat.js', 'utf8')