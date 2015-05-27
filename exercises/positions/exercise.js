var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  var done = false
  ctx.fillRect = function(_x,_y,width,height) {
    if(!done) {
      done = true
      if(y === _y) {
        return cb()
      } else {
        return cb(new Error('It does not seem like you are using the y value.'))
      }
    }
      
  }
  try {
    eval(code)
    if(!done) cb(new Error('ctx.fillRect was not called.'))
  } catch(e) {
    cb(e)
  }

}

exports.preload = fs.readFileSync(__dirname + '/preload.js', 'utf8')