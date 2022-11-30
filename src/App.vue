<template>
  <v-app>
    <router-view/>
    <snack-bar/>
  </v-app>
</template>

<script>

import SnackBar from '@/components/snackbar/components/Snackbar'
export default {
  name: 'App',
  components: {SnackBar},
  watch: {
    darkMode: {
      handler (dark) {
        this.$vuetify.theme.dark = dark
      },
      immediate: true
    },
    primaryColor: {
      handler (color) {
        if (color) {
          this.$vuetify.theme.themes.light.primary = color
          this.$vuetify.theme.themes.dark.primary = color
        }
      },
      immediate: true
    }
  }
}
</script>
