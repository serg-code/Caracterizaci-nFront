<template>
  <v-container>
    <view-title class="mb-4">
      <template v-slot:subtitle>
        {{uuid}}
        <v-chip v-if="model" label :color="model.estado_registro === 'ABIERTO' ? 'warning' : 'success'">{{model.estado_registro}}</v-chip>
      </template>
    </view-title>
    <v-row  v-if="model">
      <v-col cols="12" md="6" xl="4">
        <chart-test
            :puntaje="model.puntaje_obtenido"
            :maximo="model.puntaje_max"
        >
          <template v-slot:title>
            <v-card-title>
              <v-icon class="mr-2">mdi-home</v-icon>
              Riesgo de hogar
            </v-card-title>
            <v-card-subtitle>&nbsp;</v-card-subtitle>
          </template>
        </chart-test>
      </v-col>
      <v-col
          v-for="(integrante, indexIntegrante) in model.integrantes"
          :key="`integrante${indexIntegrante}${integrante.id}`"
          cols="12"
          md="6"
          xl="4"
      >
        <chart-test
            :puntaje="integrante.puntaje_obtenido"
            :maximo="integrante.puntaje_max"
        >
          <template v-slot:title>
            <v-card-title>
              <v-icon class="mr-2">mdi-face-{{integrante.sexo === 'Masculino' ? 'man' : 'woman'}}</v-icon>
              {{ [integrante.tipo_identificacion, integrante.identificacion].filter(x => x).join('') }}
            </v-card-title>
            <v-card-subtitle>
              {{ [integrante.primer_nombre, integrante.segundo_nombre, integrante.primer_apellido, integrante.segundo_apellido].filter(x => x).join(' ') }}
            </v-card-subtitle>
          </template>
        </chart-test>
      </v-col>
    </v-row>
    <global-loading :value="loading" absolute/>
  </v-container>
</template>

<script>
import ChartTest from '@/modules/aps/components/charts/ChartTest'
import APSMixin from '@/modules/aps/mixins/APSMixin'
export default {
  name: 'ResultadoEncuesta',
  mixins:[APSMixin],
  components: {ChartTest},
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data:() => ({
    loading: false,
    model: null
  }),
  created() {
    this.getEncuesta()
  },
  methods: {
    async getEncuesta(){
      this.loading = true
      this.model = await this.encuestaResultGet(this.uuid)
      this.loading = false
    }
  }
}
</script>