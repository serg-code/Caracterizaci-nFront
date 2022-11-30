<template>
  <c-tooltip
    top
    :tooltip="`${count ? `Hay ${count} registro${count === 1 ? '' : 's'}${count > 0 && count <= limitCount ? ' para exportar.' : `, no es posible exportar, se supera el límite de ${limitCount} registros.`}`: 'No hay registros para exportar.' }`"
    :disabled="$vuetify.breakpoint.mdAndUp"
  >
    <v-btn
      v-if="!(!count || (count <= 0 && count > limitCount))"
      dark
      color="green"
      class="ml-2"
      depressed
      :loading="loading"
      @click="downloadExel"
    >
      <v-icon>mdi-file-excel</v-icon>
      {{ $vuetify.breakpoint.mdAndUp ? 'Exportar' : '' }}
    </v-btn>
  </c-tooltip>
</template>

<script>

import store from '@/store'

export default {
  name: 'ExportExcel',
  props: {
    route: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    loading: false,
    limitCount: 50000,
  }),
  methods: {
    downloadExel() {
      this.loading = true
      this.axios({
        url: this.route,
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        if (response.data) {
          const file = new Blob(
            [response.data],
            { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          const fileURL = URL.createObjectURL(file)
          const a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          a.href = fileURL
          a.download = `File${this.moment().format('YYYYMMDDHHmmss')}.xlsx`
          a.click()
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
        store.commit('snackbar/setError', { message: 'Error al exportar los registros.', error })
      })
    },
  },
}
</script>
