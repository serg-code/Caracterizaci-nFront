// state
const state = {
  loadingText: null,
  loadingPercent: null
}

// getters
const getters = {
  loadingText: state => {
    return state.loadingText
  },
  loadingPercent: state => {
    return state.loadingPercent
  }
}

// mutations
const mutations = {
  setText (state, text = null) {
    state.loadingText = text
  },
  setPercent (state, percent = null) {
    state.loadingPercent = percent
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
