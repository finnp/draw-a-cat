var edit = require('edit')
var defaultcss = require('insert-css')
var on = require('component-delegate').bind
var elementClass = require('element-class')
var createMenu = require('browser-menu')
var xhr = require('xhr')
var marked = require('marked')
var util = require('./util')

module.exports = function (opts) {
  var exercise = opts.exercise
  var id = window.location.pathname.split('/')[2]

  var editorDiv = document.querySelector('.editor')
  var guideDiv = document.querySelector('.guide')
  var canvasDiv = document.querySelector('.canvas')
  var buttonsDiv = document.querySelector('.buttons')
  var feedbackSpan = document.querySelector('.feedback')
      
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
    },
    "hideall": function () {
      elementClass(editorDiv).add('hidden')
      elementClass(guideDiv).add('hidden')
      elementClass(canvasDiv).add('hidden')
      elementClass(buttonsDiv).add('hidden')
    },
    "showall": function () {
      elementClass(editorDiv).remove('hidden')
      elementClass(guideDiv).remove('hidden')
      elementClass(canvasDiv).remove('hidden')
      elementClass(buttonsDiv).remove('hidden')
    },
    "verify": function () {
      verify()
    }
  }
    
  // instantiate the editor
  var cm = edit({
    container: editorDiv,
    mode: 'javascript',
    autofocus: false
  })
  
  xhr({
    uri: 'problem.md'
  }, function (err, resp, body) {
    if(err) console.error(err)
    guideDiv.innerHTML = marked(body)
  })
  cm.setValue(localStorage.getItem(id) || exercise.preload || cm.getValue())
    
  // esc to menu  
  window.addEventListener('keydown', function (e) {
    if (e.metaKey) return
    if(e.keyCode === 27) location.href = '/'
  }, false)

  // autosave for now
  cm.on('change', oneditorchange)
  oneditorchange() // onload

  function oneditorchange() {
    var code = cm.getValue()

    // save to localstorage
    localStorage.setItem(id, code)
    
    // render
    try {
      var canvas = document.querySelector('canvas')
      // reset canvas
      canvas.width = canvas.width
      var ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      eval(code)
    } catch(e) {
      if(!(e instanceof SyntaxError)) console.error(e)
    }
  }
    
  function verify() {
    var code = cm.getValue()
    exercise.verify(code, function (e) {
      feedbackSpan.innerText = e ? e.message : 'Success'
      if(!e) localStorage.setItem(id + '-success', 'true')
    })

  }

    
    on(document.body, 'a.button', 'click', function(e) {
      e.preventDefault()
      var action = e.target.attributes['data-action']
      if (action) {
        if (actions[action.value]) actions[action.value]()
      }
      return false
    })
    

    window.addEventListener('message', onmessage, false)


  function onerror(err) {
    console.error('Error:', err)
  }
  
}