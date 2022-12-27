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
            :respuesta="model.respuestas.gatos"
            :pregunta="preguntas.gatos"
        />
        <input-pregunta
            :respuesta="model.respuestas.gatos_cuantos"
            :pregunta="preguntas.gatos_cuantos"
        />
        <input-pregunta
            :respuesta="model.respuestas.gatos_vacunados"
            :pregunta="preguntas.gatos_vacunados"
        />
        <input-pregunta
            :respuesta="model.respuestas.perros"
            :pregunta="preguntas.perros"
        />
        <input-pregunta
            :respuesta="model.respuestas.perros_cuantos"
            :pregunta="preguntas.perros_cuantos"
        />
        <input-pregunta
            :respuesta="model.respuestas.perros_vacunados"
            :pregunta="preguntas.perros_vacunados"
        />
        <input-pregunta
            :respuesta="model.respuestas.equinos"
            :pregunta="preguntas.equinos"
        />
        <input-pregunta
            :respuesta="model.respuestas.equinos_cuantos"
            :pregunta="preguntas.equinos_cuantos"
        />
        <input-pregunta
            :respuesta="model.respuestas.equinos_vacunados"
            :pregunta="preguntas.equinos_vacunados"
        />
        <input-pregunta
            :respuesta="model.respuestas.aves"
            :pregunta="preguntas.aves"
        />
        <input-pregunta
            :respuesta="model.respuestas.porcinos"
            :pregunta="preguntas.porcinos"
        />
        <input-pregunta
            :respuesta="model.respuestas.porcinos_cuantos"
            :pregunta="preguntas.porcinos_cuantos"
        />
        <input-pregunta
            :respuesta="model.respuestas.porcinos_vacunados"
            :pregunta="preguntas.porcinos_vacunados"
        />
        <input-pregunta
            :respuesta="model.respuestas.animales_no_rabia"
            :pregunta="preguntas.animales_no_rabia"
        />
        <input-pregunta
            :respuesta="model.respuestas.animales_si_rabia"
            :pregunta="preguntas.animales_si_rabia"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'AnimalesHogar',
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