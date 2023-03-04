<template>
  <div class="mr-1" v-if="tags">
    <c-chip
        v-if="model.fechas && model.fechas.length"
        :title="model.fechas[0] === model.fechas[1] ? moment(model.fechas[0]).format('DD/MM/YYYY') : `Desde ${moment(model.fechas[0]).format('DD/MM/YYYY')} hasta ${moment(model.fechas[1]).format('DD/MM/YYYY')}`"
        subtitle="Fecha de registro"
        @close="model.fechas = []"
    />
    <c-chip
        v-if="model.estado"
        :title="model.estado"
        subtitle="Estado"
        @close="model.estado = null"
    />

    <c-chip
        v-if="showCancelTag"
        title="Borrar Filtros"
        :close="false"
        color="red"
        @click="clearFilter"
    />
  </div>
</template>

<script>
export default {
  name: 'TagsFilters',
  props: {
    tags: {
      type: Object,
      default: null
    }
  },
  computed: {
    showCancelTag(){
      return this.model && (this.model.estado || this.model.fechas?.length)
    },
    model(){
      return this.tags
    }
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
  methods: {
    makeRouteFilter() {
      let string = ''
      if (this.model.fechas.length) string += `filter[fechas]=${this.model.fechas.join(',')}`
      if(this.model.estado) string = `${string}${string ? '&' : ''}filter[estado_registro]=${this.model.estado}`
      this.$store.commit('dataRows/setFiltersRows', { filters: string, name: 'rowsEncuestas' })
    },
    clearFilter(){
      this.model.fechas = []
      this.model.estado = null
      this.$store.commit('dataRows/setFiltersRows', { filters: '', name: 'rowsEncuestas' })
    }
  },
}
</script>