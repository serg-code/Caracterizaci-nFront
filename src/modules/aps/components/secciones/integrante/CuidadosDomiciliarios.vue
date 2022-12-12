<template>
  <v-card
      v-if="model"
      class="ma-0"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-h6 ma-0">{{ model.descripcion }}</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.cuidados_domiciliarios"
            :pregunta="preguntasIntegrante.cuidados_domiciliarios"
        />
        <input-pregunta
            :respuesta="model.respuestas.diagnostico_principal"
            :pregunta="preguntasIntegrante.diagnostico_principal"
        />
        <input-pregunta
            :respuesta="model.respuestas.causa"
            :pregunta="preguntasIntegrante.causa"
        />
        <input-pregunta
            :respuesta="model.respuestas.fecha_inicio_domiciliario"
            :pregunta="preguntasIntegrante.fecha_inicio_domiciliario"
        />
        <input-pregunta
            :respuesta="model.respuestas.oxigeno_domiciliario"
            :pregunta="preguntasIntegrante.oxigeno_domiciliario"
        />
        <input-pregunta
            :respuesta="model.respuestas.plan_aprobado"
            :pregunta="preguntasIntegrante.plan_aprobado"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'CuidadosDomiciliarios',
  components: {InputPregunta},
  props: {
    seccion: {
      type:Object,
      default: null
    }
  },
  computed: {
    ...mapState('aps',['preguntasIntegrante']),
    model:{
      get() {
        return this.seccion
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>