var menu = require('./exercises/menu.json')

function nextLesson(currentId) {
  var menuIds = menu.map(idFromName)
  var index = menuIds.indexOf(currentId)
  if(index === -1) return undefined
  return menuIds[index + 1]
}

function idFromName (id) {
  return id.toLowerCase()
    .replace(/\s\(completed\)/g, '')
    .replace(/\s/g, '_')
    .replace(/[^\w]/gi, '')
    .replace(/_/g, '-')
}

exports.idFromName = idFromName
exports.nextLesson = nextLesson