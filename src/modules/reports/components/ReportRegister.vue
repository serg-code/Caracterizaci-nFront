<template>
  <v-dialog
      v-model="dialog"
      max-width="920"
      persistent
  >
    <base-card
        form-validation
        show-actions
        show-close-button
        text-save-button="Guardar"
        :loading.sync="loading"
        :title="`${ item && item.id ? `Reporte No. ${item.id}` : `Nuevo Reporte` }`"
        :subtitle="item && item.id ? `Registro ID: ${ item.id }` : ''"
        @close="close"
        @cancel="close"
        @save="val => save(val)"
        class-container="pt-2"
    >
      <v-container v-if="item">
        <v-row
            justify="center"
            align="center"
            dense
        >
          <v-col cols="12">
            <input-text
                v-model="item.nombre"
                label="Nombre"
                rules="required"
                name="nombre"
            />
          </v-col>
          <v-col cols="12">
            <input-text-area
                v-model="item.descripcion"
                label="Descripción"
                name="descripción"
                rules="required"
                rows="1"
            />
          </v-col>
          <v-col cols="12">
            <input-select
                v-model="item.roles"
                label="Roles que visualizan"
                rules="required"
                name="roles que visualizan"
                :items="roles"
                item-text="name"
                item-value="id"
                multiple
            />
          </v-col>
        </v-row>
      </v-container>
    </base-card>
  </v-dialog>
</template>

<script>
import Report from '../models/Report'

export default {
  name: 'ReportRegister',
  data: () => ({
    loading: false,
    dialog: false,
    item: null,
    roles: []
  }),
  methods: {
    save(result) {
      if (result) {
        this.loading = true
        const copy = this.clone(this.item)
        this.axios.put(`reporte/${copy.id}`, copy)
            .then(({data}) => {
              this.$emit('guardado', data)
              this.$store.commit('snackbar/set', {
                color: 'success',
                message: 'El reporte se guardo correctamente.'
              })
              this.close()
            })
            .catch(error => {
              this.loading = false
              this.$store.commit('snackbar/setError', {
                message: 'Error al guardar el reporte.',
                error
              })
            })
      }
    },
    open(idReport = null) {
      if (!this.roles?.length) this.getRoles()
      if (idReport) {
        this.getReport(idReport)
      } else {
        this.item = Report.create()
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.loading = false
        this.item = null
      }, 400)
    },
    getReport(idReport) {
      this.loading = true
      this.axios.get(`reporte/${idReport}`)
          .then(({data}) => {
            data.roles = data?.roles?.length ? data.roles.map(x => x.id) : []
            this.item = data.data
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.$store.commit('snackbar/setError', {
              message: 'Error al recuperar el reporte para edición.',
              error
            })
          })
    },
    getRoles() {
      this.axios.get('roles')
          .then(({data}) => {
            this.roles = data.data[0] || []
          })
          .catch(error => {
            this.$store.commit('snackbar/setError', {
              message: 'Error al solicitar los roles disponibles.',
              error
            })
          })
    }
  }
}
</script>
