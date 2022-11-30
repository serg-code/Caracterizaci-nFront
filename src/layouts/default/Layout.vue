<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view/>
      <Customizer/>
    </v-main>
  </v-app>
</template>

<script>
import store from '@/store'
import Header from './header/Header'
import Customizer from './customizer/Customizer'
export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Customizer
  },
  mounted() {
    if (this.isOnline) {
      store.dispatch('auth/getUser')
      // store.dispatch('firebaseModule/getReloadFirebase')
    }
  }
}
</script>