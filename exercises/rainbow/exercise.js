var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  var lastY = undefined
  var end = false
  var count = 0
  ctx.fillRect = function(x,y,width,height) {
    count++
    if(y === lastY) {
      end = true
      ctx.fillRect = function() {}
      return cb(new Error('Each y value should be different from the last one.'))
    }
    lastY = y
    if(count > 5) {
      cb()
      end = true
    }
  }
  eval(code)
  if(!end) cb(new Error('Not enough calls'))
}

exports.preload = fs.readFileSync(__dirname + '/rainbow.js', 'utf8')