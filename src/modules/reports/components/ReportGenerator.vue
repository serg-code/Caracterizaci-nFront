<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="720px"
  >
    <base-card
        v-if="report"
        form-validation
        :show-actions="!!(report && report.variables && report.variables.length)"
        show-close-button
        text-save-button="Descargar"
        :icon="report.id"
        :loading.sync="loading"
        @close="close"
        @cancel="close"
        @save="val => download(val)"
    >
      <template slot="title">{{ report.nombre }}</template>
      <v-container fluid>
        <v-alert
            border="left"
            colored-border
            type="info"
            class="ma-0"
        >
          {{ report.descripcion }}
        </v-alert>
        <v-row
            justify="center"
            align="center"
            dense
        >
          <v-col cols="12">
            <v-subheader class="subtitle-1 font-weight-bold">Parámetros del Reporte</v-subheader>
          </v-col>
          <template v-for="(variable, indexVariable) in report.variables">
            <v-col
                cols="12"
                sm="12"
                md="6"
                :key="`variable${indexVariable}`"
            >
              <input-text
                  v-if="variable.tipo === 'text'"
                  v-model="variable.value"
                  :label="variable.label"
              />
              <input-text
                  v-if="variable.tipo === 'number'"
                  v-model.number="variable.value"
                  :name="variable.label"
                  :label="variable.label"
                  type="number"
                  rules="min_value:0"
                  :min="0"
                  :step="0.1"
                  :vid="`input${variable.tipo}${indexVariable}`"
              />
              <input-date
                  v-if="variable.tipo === 'date'"
                  v-model="variable.value"
                  :label="variable.label"
                  :max="moment().format('YYYY-MM-DD')"
              />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </base-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReportGenerator',
  data: () => ({
    dialog: false,
    loading: false,
    report: null
  }),
  methods: {
    download(result) {
      if (result) {
        this.directDownload()
      }
    },
    directDownload() {
      this.$emit('loading', true)
      this.loading = true
      let url = `reporte/descarga/${this.report?.id}`
      if (this.report.variables?.length) {
        url = `${url}?${this.report.variables.map(x => `${x.ref}=${x.value}`).join('&')}`
      }
      this.axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
      })
          .then((response) => {
            if (response.status === 204) {
              this.$store.commit('snackbar/set', {
                color: 'info',
                message: 'El reporte no contiene registros para exportar.'
              })
            } else {
              const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))
              window.open(url, '_blank')
            }
            this.close()
          })
          .catch(error => {
            this.$emit('loading', false)
            this.loading = false
            this.$store.commit('snackbar/setError', { message: 'Error al descargar el reporte.', error })
          })
    },
    close() {
      this.$emit('loading', false)
      this.dialog = false
      this.loading = false
      setTimeout(() => {
        this.report = null
      }, 500)
    },
    open(report) {
      this.report = report
      if (report.variables && report.variables.length) {
        this.dialog = true
      } else {
        this.directDownload()
      }
    }
  }
}
</script>