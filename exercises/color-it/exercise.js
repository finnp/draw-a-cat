var fs = require('fs')
var ctx = require('fake-context2d')
var Color = require('color')

exports.verify = function (code, cb) {
  var called = false
  ctx.fillRect = function(x,y,width,height) {
    called = true
    if(Color(ctx.fillStyle).hexString() === '#ECCBAA') return cb()
    cb(new Error('The color of the rectangle should be \'rgb(236,203,170)\''))
  }
  try {
    eval(code)
    if(!called) return cb(new Error('You did not call fillRect'))
  } catch(e) {
    cb(e)
  }
}

exports.preload = 'ctx.fillRect(50,50,200,100)'