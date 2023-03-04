<template>
  <v-container>
    <view-title />
    <v-row>
      <v-col cols="12">
        <v-card tile flat>
          <v-card-text>
            <v-row>
              <v-col
                  cols="12"
                  md="6"
                  offset-md="3"
              >
                <v-text-field
                    v-model="search"
                    placeholder="Buscar"
                    filled
                    solo
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    @input="searchReports"
                    clearable
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text
              v-if="!reportsFiltered.length"
              class="text-center body-1 grey--text"
          >
            No hay reportes para mostrar
          </v-card-text>
          <v-list
              v-else
              two-line
              class="py-0"
          >
            <template v-for="(report, indexReport) in reportsFiltered">
              <v-hover
                  v-slot:default="{ hover }"
                  :key="`reporte${indexReport}`"
              >
                <v-list-item @click="selectReport(report)">
                  <v-list-item-avatar color="primary" class="my-1 align-self-center white--text">{{ report.id }}</v-list-item-avatar>
                  <v-list-item-content class="pa-0">
                    <v-list-item-title><h5 class="mb-0 text-truncate">{{ report.nombre }}</h5></v-list-item-title>
                    <p class="grey--text fs-12 fw-normal ma-0">{{ report.descripcion }}</p>
                    <v-list-item-subtitle class="green--text" v-if="report.variables && !report.variables.length">
                      <v-icon color="green">mdi-arrow-down-bold-circle-outline</v-icon>
                      Descarga directa
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="hover && permisos.editar">
                    <v-btn
                        icon
                        color="warning"
                        @click.stop="editItem(report)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <report-generator
        ref="reportGenerator"
        @loading="val => loading = val"
    />
    <report-register
        ref="itemRegister"
        @guardado="getReports"
    />
    <global-loading :value="loading" absolute/>
  </v-container>
</template>

<script>
import store from '@/store'
import debounce from 'lodash/debounce'
const ReportRegister = () => import('@/modules/reports/components/ReportRegister')
const ReportGenerator = () => import('@/modules/reports/components/ReportGenerator')

export default {
  name: 'ReportsIndex',
  components: {
    ReportRegister,
    ReportGenerator
  },
  data: () => ({
    search: '',
    loading: false,
    reportsFull: [],
    reportsFiltered: []
  }),
  computed: {
    permisos() {
      return store.getters['auth/permissionsByModule']('reporte')
    }
  },
  created() {
    this.getReports()
  },
  methods: {
    searchReports: debounce(function () {
      this.reportsFiltered = this.search
          ? this.reportsFull.filter(x => (x.id === parseInt(this.search) || x?.nombre?.toLowerCase().search(this.search.toLowerCase()) > -1) || (x.descripcion.toLowerCase().search(this.search.toLowerCase()) > -1))
          : this.clone(this.reportsFull)
    }, 200),
    editItem(report) {
      this.$refs.itemRegister.open(report.id)
    },
    selectReport(report) {
      const copyReport = this.clone(report)
      copyReport.variables?.map(x => {
        x.value = null
      })
      this.$refs.reportGenerator.open(copyReport)
    },
    getReports() {
      this.loading = true
      this.axios.get('reporte')
          .then(({data}) => {
            this.reportsFull = data.data
            this.reportsFiltered = this.clone(this.reportsFull)
          })
          .catch(error => this.$store.commit('snackbar/setError', { error }))
          .finally(() => { this.loading = false })
    }
  }
}
</script>