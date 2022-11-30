import Vue from 'vue'
// Inputs components

import Loading from '@/components/loading/components/Loading.vue'
import BaseCard from '@/components/BaseCard.vue'
import InputText from '@/components/input/InputText.vue'
import InputPassword from '@/components/input/InputPassword.vue'
import InputSelect from '@/components/input/InputSelect.vue'
import ViewTitle from '@/components/ViewTitle.vue'
import CTooltip from '@/components/CTooltip.vue'
import CRows from '@/components/cDataRows/components/CRows.vue'


Vue.use({
  install (Vue) {
    Vue.component('ViewTitle', ViewTitle)
    Vue.component('BaseCard', BaseCard)
    Vue.component('CTooltip', CTooltip)
    Vue.component('GlobalLoading', Loading)
    Vue.component('InputText', InputText)
    Vue.component('InputPassword', InputPassword)
    Vue.component('InputSelect', InputSelect)
    Vue.component('CRows', CRows)

  }
})
