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
    console.log('data', data.error.response.data)
    const dataError = data?.error?.response?.data || null
    const message = `${dataError?.mensaje || dataError?.message || data?.message || ''}`
    const errors = Object.values(dataError?.data || {})
    const textErrors = errors.join('<br/>')
    const timeout = (errors.length || 1) * 5000

    state.snackbar = {
      timeout: timeout || 5000,
      message: [message ? `<strong>${message}</strong>` : '', textErrors].join('<br/>') || '',
      color: data.color || 'error'
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}