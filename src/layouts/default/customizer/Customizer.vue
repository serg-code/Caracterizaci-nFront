<template>
  <v-navigation-drawer
    style="z-index: 4 !important;"
    :style="`padding-top: ${$vuetify.breakpoint.mdAndUp ? '64' : '56'}px`"
    v-model="customizerDrawer"
    app
    temporary
    clipped
    :right="!$vuetify.rtl"
    src="../../../assets/images/background/sidebarUser.jpg"
    dark
  >
    <global-loading :value="loading"/>
    <v-list-item
        v-if="user"
        two-line
        class="px-3 py-4"
    >
      <v-list-item-avatar
          size="50"
          class="mr-2"
      >
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="white--text">
        <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle class="caption white--text">{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider/>
    <change-password/>
    <v-divider/>
    <div class="px-4 py-4">
      <label class="white--text">Color Primario</label>
      <v-color-picker
        class="pt-2"
        v-model="colorActive"
        mode="hexa"
        :swatches="swatchesPrimary"
        show-swatches
        hide-canvas
        hide-mode-switch
        hide-inputs
        hide-sliders
      />
      <v-switch
          v-model="dark"
          class="mt-4"
          hide-details
          color="primary"
          label="Modo Oscuro"
      />
    </div>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
            block
            color="red"
            @click="logout"
            :disabled="isOffline"
        >
          <v-icon dark class="mr-1">mdi-power-standby</v-icon>
          Cerrar Sesión
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import ChangePassword from '@/modules/auth/components/ChangePassword'
export default {
  name: 'CustomizerDrawer',
  components: {
    ChangePassword
  },
  data: () => ({
    loading: false,
    colorActive: null,
    dark: false
  }),
  computed: {
    customizerDrawer: {
      get () {
        return this.$store.state.settings.customizerDrawer
      },
      set (val) {
        this.$store.commit('settings/setCustomizerDrawer', val)
      }
    }
  },
  watch: {
    dark: {
      handler (dark) {
        this.$store.commit('settings/setThemeMode', dark)
      },
      immediate: false
    },
    colorActive: {
      handler (color) {
        this.$store.commit('settings/setThemeColor', typeof color === 'string' ? color : color.hex)
      },
      immediate: false
    }
  },
  created () {
    this.colorActive = this.primaryColor
    this.dark = this.darkMode
  },
  methods: {
    logout () {
      this.loading = true
      this.$store.dispatch('auth/logout')
        .then(resolve => {
          if (resolve) this.$router.push({ name: 'Login' })
          this.$store.commit('settings/setCustomizerDrawer', false)
          this.loading = false
        })
    }
  }
}
</script>