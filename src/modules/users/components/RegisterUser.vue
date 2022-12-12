<template>
  <v-dialog
      v-model="dialog"
      max-width="560"
      persistent
  >
    <base-card
        :loading.sync="loading"
        full-loading
        action-close
        form-validation
        form-submit
        :text-save-button="model && model.id ? 'Actualizar' : 'Guardar'"
        @close="close"
        @cancel="close"
        @save="valid => save(valid)"
    >
      <template v-if="model">
        <template slot="title">{{ model.id ? 'Edición' : 'Creación' }} de usuario</template>
        <v-card-text class="mt-4">
          <v-row>
          </v-row>
        </v-card-text>
      </template>
    </base-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegisterUser',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  data:() => ({
    loading: false,
    makeModel: {
      id: null,
      activo: 1,
      email: null,
      name: null,
      password: null,
      roles: [],
    },
    model: null,
    roles: []
  }),
  computed:{
    dialog: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.user?.id) {
        this.model = this.makeModel
      } else {
        this.loading = true
        this.axios.get(`usuarios/${this.user.id}`)
            .then(({ data }) => {
              this.model = { ...this.makeModel, ...(data || {}) }
            })
            .catch(e => this.$store.commit('snackbar/setError', { e }))
            .finally(() => { this.loading = false })
      }
    },
    save(valid){
      if (valid) {
        this.loading = true
        const request = this.model.id ? this.axios.put(`usuarios/${this.model.id}`, this.model) : this.axios.post('usuarios', this.model)
        request
            .then(() => {
              this.$store.commit('snackbar/set', { message: `El usuario se ${this.model.id ? 'actualizó' : 'creó'} correctamente.` })
              this.$emit('saved')
              close()
            })
            .catch(e => this.$store.commit('snackbar/setError', { e }))
            .finally(() => { this.loading = false })
      }
    },
    close() {
      this.dialog = false
    }
  }
}
</script>
