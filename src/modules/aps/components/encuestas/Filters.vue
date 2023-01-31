<template>
  <v-row
      justify="end"
      fill-height
  >
    <v-col
        cols="12"
    >
      <input-date-range
          v-model="model.fechas"
          label="Fecha creación"
          :max="moment().format('YYYY-MM-DD')"
          show-select-periods
      />
    </v-col>
    <v-col
        cols="12"
    >
      <input-select
          v-model="model.estado"
          :items="estados"
          label="Estado"
          no-radio
      />
    </v-col>
  </v-row>
</template>

<script>
import EstadosEncuestas from '@/modules/aps/data/EstadosEncuestas'
export default {
  name: 'FiltersEncuestas',
  data: () => ({
    model: {
      fechas: [],
      estado: null
    },
    string: '',
    estados: EstadosEncuestas
  }),
  computed: {
  },
  watch: {
    model: {
      handler() {
        this.makeRouteFilter()
      },
      immediate: false,
      deep: true,
    },
  },
  created() {
  },
  methods: {
    makeRouteFilter() {
      let string = ''
      if (this.model.fechas.length) string += `filter[fechas]=${this.model.fechas.join(',')}`
      if(this.model.estado) string = `${string}${string ? '&' : ''}filter[estado_registro]=${this.model.estado}`
      this.$store.commit('dataRows/setFiltersRows', { filters: string, name: 'rowsEncuestas' })
    },
  },
}
</script>