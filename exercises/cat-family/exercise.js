var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  try {
    eval(code)
    if (typeof drawCat !== 'function') return cb(new Error('No function called drawCat'))
    cb()
  } catch(e) {
    cb(e)
  }
}

exports.preload = fs.readFileSync(__dirname + '/preload.js', 'utf8')
