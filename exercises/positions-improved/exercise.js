var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  var done = false
  ctx.translate = function(_x, _y) {
    done = true
    if(_x === x && _y === y) return cb()
    cb(new Error('Use translate with the x and y variables.'))
  }
  try {
    eval(code)
    if(!done) cb(new Error('ctx.translate was not called.'))
  } catch(e) {
    cb(e)
  }

}

exports.preload = fs.readFileSync(__dirname + '/preload.js', 'utf8')
