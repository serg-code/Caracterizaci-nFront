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
            :respuesta="model.respuestas.consumo_huevos_crudos"
            :pregunta="preguntas.consumo_huevos_crudos"
        />
        <input-pregunta
            :respuesta="model.respuestas.alimentos_perecederos"
            :pregunta="preguntas.alimentos_perecederos"
        />
        <input-pregunta
            :respuesta="model.respuestas.hierve_leche"
            :pregunta="preguntas.hierve_leche"
        />
        <input-pregunta
            :respuesta="model.respuestas.lavar_frutas_verduras"
            :pregunta="preguntas.lavar_frutas_verduras"
        />
        <input-pregunta
            :respuesta="model.respuestas.alimentos_crudos_separados_cocidos"
            :pregunta="preguntas.alimentos_crudos_separados_cocidos"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'HabitosConsumo',
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