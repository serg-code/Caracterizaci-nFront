<template>
  <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="value"
      :color="darkMode ? 'black' : 'white'"
  >
    <v-container fluid>
      <v-row justify="center">
        <v-progress-circular
            :color="`primary${darkMode ? ' lighten-4' : ''}`"
            indeterminate size="64"
        />
      </v-row>
      <v-row
          v-if="loadingText || loadingPercent !== null"
          justify="center"
      >
        <v-col
            v-if="loadingText"
            cols="12"
            class="text-center"
        >
        <span :class="`${darkMode ? 'white' : 'black'}--text`">{{ loadingText }}</span>
        </v-col>
        <v-col
            v-if="loadingPercent"
            cols="12"
            class="text-center"
        >
          <v-progress-linear
              :value="loadingPercent"
              height="22"
          >
            <strong>{{ loadingPercent.toFixed(2) }}%</strong>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GlobalLoading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.6
    }
  },
  computed: {
    ...mapState('loading', ['loadingText', 'loadingPercent']),
  },
  watch: {
    value: {
      handler(val) {
        if (!val) {
          this.$store.commit('loading/setText')
          this.$store.commit('loading/setPercent')
        }
      },
      immediate: true
    }
  }
}
</script>