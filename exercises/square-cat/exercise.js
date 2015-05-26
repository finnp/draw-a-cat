var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  var count = 0
  ctx.fillRect = function(x,y,width,height) {
    count++
    lastY = y
    if(count ===  5) cb()
  }
  try {
    eval(code)
    if(count < 5) cb(new Error('Did you forget about the tail? Use at least 5 rectangles!'))
  } catch(e) {
    cb(e)
  }

}

exports.preload = fs.readFileSync(__dirname + '/preload.js', 'utf8')