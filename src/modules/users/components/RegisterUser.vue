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
            <v-col cols="12">
              <input-text
                  v-model="model.name"
                  label="Nombre"
                  name="Nombre"
                  rules="required"
              />
            </v-col>
            <v-col cols="12">
              <input-text
                  v-model="model.email"
                  label="Correo electrónico"
                  name="Correo electrónico"
                  type="email"
                  rules="required|email"
              />
            </v-col>
            <v-col cols="12">
              <input-select
                  v-model="model.activo"
                  :items="[{text: 'Activo', value: 1}, {text: 'Inactivo', value: 0}]"
                  name="Estado"
                  label="Estado"
                  rules="required"
              />
            </v-col>
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
      activo: null,
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
            .catch(error => this.$store.commit('snackbar/setError', { error }))
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
            .catch(error => this.$store.commit('snackbar/setError', { error }))
            .finally(() => { this.loading = false })
      }
    },
    close() {
      this.dialog = false
    }
  }
}
</script>
