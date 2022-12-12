<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card
      class="text-center"
      :loading="dialogLoading && !fullLoading"
    >
      <v-card-text
        class="d-flex flex-column justify-center align-center"
      >
        <v-avatar
          v-if="action && icon"
          rounded
          :color="avatarColor"
          class="primary--text mt-4 pa-8"
          icon
          size="100"
        >
          <v-icon
              size="100"
            :color="iconColor"
            v-text="icon"
          />
        </v-avatar>
        <h2 class="mb-3">{{ title }}</h2>
        <p class="mb-3 text-h6" v-html="subtitle" />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          :loading="fullLoading ? false : dialogLoading"
          @click="cancel"
        >
          Cancelar
        </v-btn>
        <v-btn
          :color="colorConfirmButton"
          :loading="fullLoading ? false : dialogLoading"
          @click="save"
        >
          {{ textConfirmButton }}
        </v-btn>
      </v-card-actions>
      <global-loading v-if="fullLoading" :value="dialogLoading" absolute />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CConfirm',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fullLoading: {
      type: Boolean,
      default: true,
    },
    textConfirmButton: {
      type: String,
      default: 'Aceptar',
    },
    colorConfirmButton: {
      type: String,
      default: 'primary',
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    textCancelButton: {
      type: String,
      default: 'Cancelar',
    },
    colorCancelButton: {
      type: String,
      default: '',
    },
    dispatch: {
      type: String,
      default: '',
    },
    avatarColor: {
      type: String,
      default: '',
    },
    method: {
      type: String,
      default: 'DELETE',
    },
    payload: {
      type: Object,
      default: null,
    },
    catchMessage: {
      type: String,
      default: '',
    },
    successMessage: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    inStore: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    icon: '',
    iconColor: '',
  }),
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    dialogLoading: {
      get() {
        return this.loading
      },
      set(value) {
        this.$emit('update:loading', value)
      },
    },
  },
  watch: {
    dialog: {
      handler(value) {
        if (value) this.assignIcon()
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      this.dialog = false
    },
    success(value) {
      this.dialogLoading = false
      this.$emit('success', value)
    },
    cancel() {
      this.close()
      this.$emit('cancel')
    },
    assignIcon() {
      switch (this.action) {
        case 'warning':
          this.icon = 'mdi-alert'
          this.iconColor = 'warning'
          break
        case 'info':
          this.icon = 'mdi-information'
          this.iconColor = 'info'
          break
        case 'delete':
          this.icon = 'mdi-trash-can'
          this.iconColor = 'error'
          break
        default:
          this.icon = ''
          this.iconColor = ''
          break
      }
    },
    async save() {
      if (this.dispatch && this.method) {
        this.dialogLoading = true
        if (this.inStore) {
          this.$store.dispatch(this.dispatch, this.payload)
            .then(response => {
              if (response.data) {
                this.success(response.data)
                this.close()
              } else {
                this.success(false)
              }
            })
        } else {
          try {
            const response = await this.axios(
              {
                method: this.method,
                url: this.dispatch,
                data: this.payload,
              },
            )
            this.success(!!response.data)
            this.close()
            this.$store.commit('snackbar/set', { message: this.successMessage })
          } catch (e) {
            this.$store.commit('snackbar/setError', { message: this.catchMessage, e })
            this.success(false)
          }
        }
      } else {
        this.success(true)
      }
    },
  },
}
</script>
