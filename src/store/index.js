import Vue from 'vue'
import Vuex from 'vuex'
import persist from '@/plugins/vuex-persist'
import snackbar from '@/components/snackbar/store'
import loading from '@/components/loading/store'
import menu from '@/modules/menu/store'
import settings from '@/modules/settings/store'
import dataRows from '@/components/cDataRows/store'
import auth from '@/modules/auth/store'

import aps from '@/modules/aps/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar,
    loading,
    menu,
    settings,
    dataRows,
    auth,
    aps
  },
  plugins: [persist.plugin]
})
