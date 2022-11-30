<template>
  <v-snackbar
      v-model="show"
      :color="snackbar && snackbar.color"
      :timeout="snackbar && snackbar.timeout"
      multi-line
      rounded
      bottom
  >
    <span v-html="snackbar && snackbar.message" />
    <template v-slot:action="{ attrs }">
      <v-btn
          fab
          small
          depressed
          :color="snackbar && snackbar.color"
          v-bind="attrs"
          @click="show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SnackBar',
  computed: {
    ...mapState('snackbar', ['snackbar']),
    show: {
      get() {
        return !!this.snackbar
      },
      set(value) {
        if (!value) setTimeout(() => { this.$store.commit('snackbar/set') }, 500)
      }
    }
  }
}
</script>