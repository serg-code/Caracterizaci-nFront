const state = {
  snackbar: null
}

const mutations = {
  set(state, data = null) {
    if(data) {
      state.snackbar = {
        timeout: data.timeout || 5000,
        message: data.message || '',
        color: data.color || 'success'
      }
    }
    else {
      state.snackbar = null
    }
  },
  setError(state, data) {
    const message = `${data.error?.response?.data?.message}`
    const errors = Object.values(data.error?.response?.data?.errors || {})
    const textErrors = errors.join('<br/>')
    const timeout = (errors.length || 1) * 5000

    state.snackbar = {
      timeout: timeout || 5000,
      message: [message, textErrors].join('<br/>') || '',
      color: data.color || 'error'
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}