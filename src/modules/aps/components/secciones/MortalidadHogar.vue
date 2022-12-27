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
            :respuesta="model.respuestas.fallecido_familiar"
            :pregunta="preguntas.fallecido_familiar"
        />
        <input-pregunta
            :respuesta="model.respuestas.sexo_fallecido"
            :pregunta="preguntas.sexo_fallecido"
        />
        <input-pregunta
            :respuesta="model.respuestas.edad_fallecido"
            :pregunta="preguntas.edad_fallecido"
        />
        <input-pregunta
            :respuesta="model.respuestas.causa_muerte"
            :pregunta="preguntas.causa_muerte"
        />
        <input-pregunta
            :respuesta="model.respuestas.fecha_muerte"
            :pregunta="preguntas.fecha_muerte"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'MortalidadHogar',
  components: {InputPregunta},
  props: {
    seccion: {
      type:Object,
      default: null
    }
  },
  computed: {
    ...mapState('aps',['preguntas']),
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