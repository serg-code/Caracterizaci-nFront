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
        <template slot="title">{{ model.id ? 'Edición' : 'Creación' }} de área territorial</template>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <input-select
                  v-model="model.id_departamento"
                  :items="departamentos"
                  item-text="nombre"
                  item-value="codigo_dane"
                  name="Departamento"
                  label="Departamento"
                  rules="required"
                  @inputObject="val => model.departamentoObj = val"
                  @change="changeDepartamento"
              />
            </v-col>
            <v-col cols="12">
              <input-select
                  v-model="model.id_municipio"
                  :items="municipiosDisponibles"
                  :disabled="!model.id_departamento"
                  item-text="nombre"
                  item-value="codigo_dane"
                  name="Municipio"
                  label="Municipio"
                  rules="required"
                  no-radio
                  @inputObject="val => model.municipioObj = val"
              />
            </v-col>
            <v-col cols="12">
              <input-select
                  v-model="model.tipo"
                  :items="zonas.filter(x => x.value !== 'Rural disperso')"
                  :disabled="!model.id_municipio"
                  name="Tipo"
                  label="Tipo"
                  rules="required"
                  no-radio
              />
            </v-col>
            <v-col cols="12">
              <input-text
                  v-model="model.nombre"
                  label="Nombre"
                  name="Nombre"
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
import {mapState} from 'vuex'
export default {
  name: 'RegistroAreaTerritorial',
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
    loading: false,
    makeModel: {
      id: null,
      id_departamento: null,
      departamentoObj: null,
      id_municipio: null,
      municipioObj: null,
      nombre: null,
      tipo: null,
    },
    model: null,
  }),
  computed:{
    ...mapState('aps',['departamentos', 'municipios', 'zonas']),
    municipiosDisponibles() {
      return (this.model?.id_departamento && this.municipios?.length && this.municipios.filter(x => x.codigo_departamento === this.model.id_departamento)) || []
    },
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
    getItem() {
      if (!this.itemProp?.id) {
        this.model = this.makeModel
      } else {
        this.loading = true
        this.axios.get(`barrio_vereda/${this.itemProp.id}`)
            .then(({ data }) => {
              console.log('lata', data?.data[0])
              if(data?.data[0]) data.data[0].id_departamento = this.municipios?.find(x => x.codigo_dane === data.data[0].id_municipio)?.codigo_departamento || null
              this.model = { ...this.makeModel, ...(data?.data[0] || {}) }
            })
            .catch(error => this.$store.commit('snackbar/setError', { error }))
            .finally(() => { this.loading = false })
      }
    },
    save(valid){
      if (valid) {
        this.loading = true
        const request = this.model.id ? this.axios.put(`barrio_vereda/${this.model.id}`, this.model) : this.axios.post('barrio_vereda', this.model)
        request
            .then(() => {
              this.$store.commit('snackbar/set', { message: `El área territorial se ${this.model.id ? 'actualizó' : 'creó'} correctamente.` })
              this.$emit('saved')
              this.close()
            })
            .catch(error => this.$store.commit('snackbar/setError', { error }))
            .finally(() => { this.loading = false })
      }
    },
    changeDepartamento() {
      this.model.id_municipio = null
    },
    getData(){
      this.getItem()
    },
    close() {
      this.dialog = false
    }
  }
}
</script>
