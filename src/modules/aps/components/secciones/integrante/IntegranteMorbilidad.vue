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
            :respuesta="model.respuestas.enfermedad_cronica"
            :pregunta="preguntasIntegrante.enfermedad_cronica"
        />
        <input-pregunta
            :respuesta="model.respuestas.enfermedad_cronica_cual"
            :pregunta="preguntasIntegrante.enfermedad_cronica_cual"
        />
        <input-pregunta
            :respuesta="model.respuestas.controlada"
            :pregunta="preguntasIntegrante.controlada"
        />
        <input-pregunta
            :respuesta="model.respuestas.propiedades_respiratorio"
            :pregunta="preguntasIntegrante.propiedades_respiratorio"
        />
        <input-pregunta
            :respuesta="model.respuestas.propiedades_piel"
            :pregunta="preguntasIntegrante.propiedades_piel"
        />
        <input-pregunta
            :respuesta="model.respuestas.enfermedades_congenitas"
            :pregunta="preguntasIntegrante.enfermedades_congenitas"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'IntegranteMorbilidad',
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