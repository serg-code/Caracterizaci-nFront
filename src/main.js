import Vue from 'vue'
import App from './App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

import vuetify from './plugins/vuetify'
import '@/plugins/vue-offline'
import './plugins/mixin'
import '@/plugins/axios'
import '@/plugins/vee-validate'
import '@/plugins/moment'
import '@/plugins/v-mask'
import '@/plugins/globalComponents'

store.commit('auth/setDefaultAxios')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
