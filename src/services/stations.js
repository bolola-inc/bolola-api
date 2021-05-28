import Stations from '../models/Stations'
import { parseQueryOptions } from '../utils/utils'

export function queryStations (params) {
  const options = parseQueryOptions(params)
  const query = {}
  return Stations.paginate(query, options).then((result) => {
    result.station = result.docs
    delete result.docs
    return result
  })
}

export function getSingleStation (id) {
  return Stations.findById(id)
}

export function createStation (userId, data) {
  return Stations.create(userId, data)
}

export function updateStation (id, data) {
  return getSingleStatiion(id).then((st) => {
    st.mergeWithData(data)
    return st.save()
  })
}

export function deleteStation (id) {
  return getSingleStation(id).then((st) => {
    return st.delete()
  })
}
