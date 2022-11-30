<template>
  <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
      dark
  >
    <v-toolbar-title class="align-center d-flex">
      <div class="title mr-2">SosaludAPS</div>
      <app-menu/>
    </v-toolbar-title>
    <v-spacer />
    <user/>
  </v-app-bar>
</template>

<script>
import User from '@/layouts/default/header/components/User'
import AppMenu from '@/modules/menu/components/AppMenu'
export default {
  name: 'DefaultHeader',
  components: {
    AppMenu,
    User
  }
}
</script>

<style lang="scss">
  .v-application #main-sidebar.theme--dark.white{
    background:#363636!important;
  }
</style>