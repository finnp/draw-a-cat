function idFromName (id) {
  return id.toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^\w]/gi, '')
}

exports.idFromName = idFromName