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
              <input-select
                  v-model="model.tipo_identificacion"
                  :items="tiposIdentificacion"
                  item-text="tipo"
                  item-value="id"
                  name="Tipo identificación"
                  label="Tipo identificación"
                  rules="required"
                  no-radio
              />
            </v-col>
            <v-col cols="12">
              <input-text
                  v-model="model.identificacion"
                  label="Identificación"
                  name="Identificación"
                  rules="required"
                  type="number"
              />
            </v-col>
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
              <input-text
                  v-model="model.telefono"
                  label="Celular"
                  name="Celular"
                  type="tel"
                  rules="required"
              />
            </v-col>
            <v-col cols="12">
              <input-select
                  v-model="model.roles"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  name="Roles"
                  label="Roles"
                  rules="required"
                  multiple
                  chips
                  small-chips
                  deletable-chips
                  no-radio
              />
            </v-col>
            <template v-if="!model.id">
              <v-col cols="12">
                <input-password
                    v-model="model.password"
                    label="Contraseña"
                    rules="required"
                    name="contraseña"
                />
              </v-col>
              <v-col cols="12">
                <input-password
                    v-model="model.passwordConfirmation"
                    label="Confirmación de contraseña"
                    rules="required|confirmed:contraseña"
                    name="Confirmación de contraseña"
                />
              </v-col>
            </template>
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
import TiposIdentificacion from '@/modules/users/data/TiposIdentificacion'
export default {
  name: 'RegisterUser',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userProp: {
      type: Object,
      default: null,
    },
  },
  data:() => ({
    tiposIdentificacion:  TiposIdentificacion,
    loadingRoles: false,
    loading: false,
    makeModel: {
      id: null,
      activo: null,
      email: null,
      name: null,
      password: null,
      passwordConfirmation: null,
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
  watch: {
    dialog:{
      handler(val){
        if(val) this.getData()
      },
      immediate: false
    }
  },
  methods: {
    getData(){
      this.getUser()
      this.getRoles()
    },
    getUser() {
      if (!this.userProp?.id) {
        this.model = this.makeModel
      } else {
        this.loading = true
        this.axios.get(`usuarios/${this.userProp.id}`)
            .then(({ data }) => {
              if(data?.data?.usuario?.roles?.length) data.data.usuario.roles = data.data.usuario.roles.map(x => x.id)
              this.model = { ...this.makeModel, ...(data?.data?.usuario || {}) }
            })
            .catch(error => this.$store.commit('snackbar/setError', { error }))
            .finally(() => { this.loading = false })
      }
    },
    getRoles() {
      this.loadingRoles = true
      this.axios.get('roles')
          .then(({ data }) => {
            this.roles = data?.data[0] || []
          })
          .catch(error => this.$store.commit('snackbar/setError', { error }))
          .finally(() => { this.loadingRoles = false })
    },
    save(valid){
      if (valid) {
        this.loading = true
        const request = this.model.id ? this.axios.put(`usuarios/${this.model.id}`, this.model) : this.axios.post('usuarios', this.model)
        request
            .then(() => {
              this.$store.commit('snackbar/set', { message: `El usuario se ${this.model.id ? 'actualizó' : 'creó'} correctamente.` })
              this.$emit('saved')
              this.close()
            })
            .catch(error => this.$store.commit('snackbar/setError', { error }))
            .finally(() => { this.loading = false })
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.model = null
      }, 400)
    }
  }
}
</script>
