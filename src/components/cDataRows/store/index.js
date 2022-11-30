import DataRow from '../models/DataRow'

const state = {
  dataRows: [],
}

const getters = {
  myDataRow: state => name => state.dataRows.find(x => x.name === name),
}

const actions = {}

const mutations = {
  setReloadRows(state, name) {
    const data = state.dataRows.find(x => x.name === name)
    if (data?.changes) data.changes++
  },
  setDataRowsHeaders(state, IDataRow) {
    const data = state.dataRows.find(x => x.name === IDataRow.name)
    if (data) {
      data.headers = IDataRow.headers
      data.version = IDataRow.version
    } else state.dataRows.push(DataRow.create(IDataRow))
  },
  setFiltersRows(state, payload) {
    const data = state.dataRows.find(x => x.name === payload.name)
    if (data) data.filters = payload.filters
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
