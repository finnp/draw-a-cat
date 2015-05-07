function idFromName (id) {
  return id.toLowerCase()
    .replace(/\s\(completed\)/g, '')
    .replace(/\s/g, '_')
    .replace(/[^\w]/gi, '')
}

exports.idFromName = idFromName