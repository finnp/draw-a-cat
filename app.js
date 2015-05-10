var createMenu = require('browser-menu')
var menuItems = require('./exercises/menu.json')
var util = require('./util')

menu = createMenu({
  width: 29,
  x: 4,
  y: 4,
  bg: '#1F8DD6',
  fg: '#f2f2f2'
})  

menu.reset()

menuItems.forEach(function (item) {
  var id = util.idFromName(item)
  var success = localStorage.getItem(id + '-success')
  if(success) item += ' (COMPLETED)'
  menu.add(item)
})

menu.on('select', function (label) {
  var id = util.idFromName(label)
  window.location.href = 'exercises/' + id
})