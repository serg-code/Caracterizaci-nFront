import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'
import store from '../store'

axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000/api`
// axios.defaults.baseURL = `http://sosaludaps.backend.test/api`
Vue.use(VueAxios, axios)

axios.interceptors.response.use(undefined, async (error) => {
  if (error.response.status === 401) {
    store.commit('authModule/SET_LOGOUT')
    store.commit('snackbar/set', {
      color: 'warning',
      message: `Los datos de la sesión han expirado, inicie sesión nuevamente.`,
    })
    await router.replace({ name: 'Login' })
  }
  return Promise.reject(error)
})