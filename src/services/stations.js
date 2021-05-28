const Stations = require('../models/Stations')
const { parseQueryOptions } = require('../utils/utils')

function queryStations (params) {
  const options = parseQueryOptions(params)
  const query = {}
  return Stations.paginate(query, options).then((result) => {
    result.station = result.docs
    delete result.docs
    return result
  })
}

function getSingleStation (id) {
  return Stations.findById(id)
}

function createStation (userId, data) {
  return Stations.create(userId, data)
}

function updateStation (id, data) {
  return getSingleStatiion(id).then((st) => {
    st.mergeWithData(data)
    return st.save()
  })
}

function deleteStation (id) {
  return getSingleStation(id).then((st) => {
    return st.delete()
  })
}

module.exports = {
  deleteStation,
  updateStation,
  getSingleStation,
  queryStations,
}
