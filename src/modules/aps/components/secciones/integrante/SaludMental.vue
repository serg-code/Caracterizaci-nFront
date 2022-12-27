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
            :respuesta="model.respuestas.depresion"
            :pregunta="preguntasIntegrante.depresion"
        />
        <input-pregunta
            :respuesta="model.respuestas.intento_suicidio"
            :pregunta="preguntasIntegrante.intento_suicidio"
        />
        <input-pregunta
            :respuesta="model.respuestas.esquizofrenia"
            :pregunta="preguntasIntegrante.esquizofrenia"
        />
        <input-pregunta
            :respuesta="model.respuestas.trastorno_afectivo"
            :pregunta="preguntasIntegrante.trastorno_afectivo"
        />
        <input-pregunta
            :respuesta="model.respuestas.bulimia"
            :pregunta="preguntasIntegrante.bulimia"
        />
        <input-pregunta
            :respuesta="model.respuestas.anorexia"
            :pregunta="preguntasIntegrante.anorexia"
        />
        <input-pregunta
            :respuesta="model.respuestas.tratamiento"
            :pregunta="preguntasIntegrante.tratamiento"
        />
        <input-pregunta
            :respuesta="model.respuestas.diagnostico"
            :pregunta="preguntasIntegrante.diagnostico"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_fisica"
            :pregunta="preguntasIntegrante.violencia_fisica"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_psicologica"
            :pregunta="preguntasIntegrante.violencia_psicologica"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_sexual"
            :pregunta="preguntasIntegrante.violencia_sexual"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_institucional"
            :pregunta="preguntasIntegrante.violencia_institucional"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_social"
            :pregunta="preguntasIntegrante.violencia_social"
            sm="6"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_gestacion"
            :pregunta="preguntasIntegrante.violencia_gestacion"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'SaludMental',
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