function ExtendableBuiltin (cls) {
  function ExtendableBuiltin (...args) { // eslint-disable-line no-shadow
    Reflect.apply(cls, this, args)
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype)
  Reflect.setPrototypeOf(ExtendableBuiltin, cls)

  return ExtendableBuiltin
}

function createResponse (data, message = null, status = 200) {
  const success = status < 400
  return {
    success,
    data,
    message
  }
}

function parseQueryOptions (query, defs = {}) {
  const options = JSON.parse(JSON.stringify(defs))
  const {
    page = 1,
    page_size = 10
  } = query
  options.page = Number(page)
  options.limit = Number(page_size)
  options.deleted = query.deleted || false
  if (query.sort_by) {
    let sortBy = query.sort_by
    options.sort = {}
    if (Array.isArray(sortBy)) {
      sortBy.forEach((key) => {
        let val = 1
        if (key.indexOf('-') === 0) {
          key = key.replace('-', '')
          val = -1
        }
        options.sort[key] = val
      })
    } else {
      if (sortBy === 'id') {
        sortBy = '_id'
      }
      options.sort[sortBy] = query.sort_in === 'DESC' ? -1 : 1
    }
    console.log(options.sort)
  }
  return options
}

module.exports = {
  ExtendableBuiltin,
  parseQueryOptions
}
