var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  var called = false
  ctx.fillRect = function(x,y,width,height) {
    called = true
    if(ctx.fillStyle.toLowerCase() === '#eccbaa') return cb()
    cb(new Error('The color of the rectangle should be #eccbaa'))
  }
  try {
    eval(code)
    if(!called) return cb(new Error('You did not call fillRect'))
  } catch(e) {
    cb(e)
  }
}

exports.preload = 'ctx.fillRect(50,50,200,100)'