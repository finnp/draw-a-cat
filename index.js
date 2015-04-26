var edit = require('edit')
var defaultcss = require('insert-css')
var on = require('component-delegate').bind
var elementClass = require('element-class')
var oncall = require('oncall')
var createMenu = require('browser-menu')
var xhr = require('xhr')
var marked = require('marked')
var menuItems = require('./exercises/menu.json')
var util = require('./util.js')

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
    },
    "hideall": function () {
      elementClass(editorDiv).add('hidden')
      elementClass(guideDiv).add('hidden')
      elementClass(canvasDiv).add('hidden')
    },
    "showall": function () {
      elementClass(editorDiv).remove('hidden')
      elementClass(guideDiv).remove('hidden')
      elementClass(canvasDiv).remove('hidden')
    }
  }
  
  // instantiate the editor
  var cm = edit({
    container: editorDiv,
    mode: 'javascript',
    value: 'ctx.fillRect(10, 10, 50, 50)',
    autofocus: false
  })
  
  actions.hideall()
  
    var menu = createMenu({
      width: 29,
      x: 4,
      y: 4,
      bg: '#1F8DD6',
      fg: '#f2f2f2'
    })
    menu.on('select', function (label) {
      actions.showall()
      document.querySelector('#exercise').innerText = label
      var id = util.idFromName(label)
      cm.setValue(localStorage.getItem(id) || cm.getValue())
      xhr({
        uri: 'exercises/' + id + '/problem.md'
      }, function (err, resp, body) {
        if(err) console.error(err)
        guideDiv.innerHTML = marked(body)
      })
      menu.close()
    })
    menu.reset()
    menuItems.forEach(function (item) {
      menu.add(item)
    })

  // autosave for now
  cm.on('change', oneditorchange)
  oneditorchange() // onload

  function oneditorchange() {
    var code = cm.getValue()

    // save to localstorage
    var id = util.idFromName(document.querySelector('#exercise').innerText)
    localStorage.setItem(id, code)
    
    // render
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