var fs = require('fs')
var ctx = require('fake-context2d')

exports.verify = function (code, cb) {
  var called = false
  ctx.fillRect = function(x,y,width,height) {
    called = true
    if(x===50 && x===50 && width === 200 && height === 100) return cb()
    cb(new Error('Call fillRect with (50,50,200,100).'))
  }
  try {
    eval(code)
    if(!called) return cb(new Error('You did not call fillRect'))
  } catch(e) {
    cb(e)
  }
}

exports.preload = fs.readFileSync(__dirname + '/preload.js', 'utf8')