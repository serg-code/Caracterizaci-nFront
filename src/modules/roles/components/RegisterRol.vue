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
        <template slot="title">{{ model.id ? 'Edición' : 'Creación' }} de rol</template>
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
              <input-select
                  v-model="model.permisos"
                  :items="permisos"
                  :loading="loadingPermisos"
                  item-text="name"
                  item-value="id"
                  name="Permisos"
                  label="Permisos"
                  rules="required"
                  multiple
                  chips
                  small-chips
                  deletable-chips
                  no-radio
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
  name: 'RegisterRol',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    itemProp: {
      type: Object,
      default: null,
    },
  },
  data:() => ({
    loadingPermisos: false,
    loading: false,
    makeModel: {
      id: null,
      name: null,
      permisos: [],
    },
    model: null,
    permisos: []
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
      this.getItem()
      this.getPermisos()
    },
    getItem() {
      if (!this.itemProp?.id) {
        this.model = this.makeModel
      } else {
        this.loading = true
        this.axios.get(`roles/${this.itemProp.id}`)
            .then(({ data }) => {
              if(data?.data?.rol?.permisos?.length) data.data.rol.permisos = data.data.rol.permisos.map(x => x.id)
              this.model = { ...this.makeModel, ...(data?.data?.rol || {}) }
            })
            .catch(error => this.$store.commit('snackbar/setError', { error }))
            .finally(() => { this.loading = false })
      }
    },
    getPermisos() {
      this.loadingPermisos = true
      this.axios.get('permisos')
          .then(({ data }) => {
            this.permisos = data?.data?.permisos || []
          })
          .catch(error => this.$store.commit('snackbar/setError', { error }))
          .finally(() => { this.loadingPermisos = false })
    },
    save(valid){
      if (valid) {
        this.loading = true
        const request = this.model.id ? this.axios.put(`roles/${this.model.id}`, this.model) : this.axios.post('roles', this.model)
        request
            .then(() => {
              this.$store.commit('snackbar/set', { message: `El rol se ${this.model.id ? 'actualizó' : 'creó'} correctamente.` })
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
