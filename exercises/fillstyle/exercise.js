exports.verify = function (code, cb) {
  var fillRectCalled = false
  // fake context
  var ctx = {
    fillRect: function () {
      fillRectCalled = true
      if(this.fillStyle !== 'red') return cb(new Error('fillStyle not set to red'))
      cb()
    }
  }
  eval(code)
  if(!fillRectCalled) cb(new Error('fillRect was not called.'))
}