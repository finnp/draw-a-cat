var edit = require('edit')
var defaultcss = require('insert-css')
var on = require('component-delegate').bind
var elementClass = require('element-class')
var oncall = require('oncall')

module.exports = function(opts) {
  if (!opts || !opts.guide) throw new Error('Must specify guide')
  
  var editorDiv = document.querySelector('.editor')
  var guideDiv = document.querySelector('.guide')
  var canvasDiv = document.querySelector('.canvas')
  
  var canvas = document.createElement('canvas')
  canvas.width = canvasDiv.offsetWidth
  canvas.height = canvasDiv.offsetHeight
  canvasDiv.appendChild(canvas)
  
  var actions = {
    "show-bottom": function() {
      elementClass(editorDiv).remove('hidden')
      elementClass(guideDiv).remove('tall')
    },
    "hide-bottom": function() {
      elementClass(editorDiv).add('hidden')
      elementClass(guideDiv).add('tall')
    }
  }
  // instantiate the editor
  var cm = edit({
    container: editorDiv,
    mode: 'javascript',
    value: 'ctx.fillRect(10, 10, 50, 50)',
    autofocus: false
  })


  // autosave for now
  cm.on('change', render)
  render() // onload

  function render() {
    var code = cm.getValue()
    try {
      var canvas = document.querySelector('canvas')
      var ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      var spy = oncall(ctx)
      // pass spy to a checker function
      spy.on('fillRect', function (a,b,c,d) {
        console.log('spy', a, b, c, d)
      })
      eval(code)
    } catch(e) {
      if(!(e instanceof SyntaxError)) console.error(e)
    }
  }
  // save to browser file system?


  
  on(document.body, '.buttons a', 'click', function(e) {
    e.preventDefault()
    var action = e.target.attributes['data-action']
    if (action) {
      if (actions[action.value]) actions[action.value]()
    }
    return false
  })
  

  window.addEventListener('message', onmessage, false)
}


function onerror(err) {
  console.error('Error:', err)
}