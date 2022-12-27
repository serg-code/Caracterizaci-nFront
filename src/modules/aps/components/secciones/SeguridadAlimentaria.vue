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
            :respuesta="model.respuestas.falto_dinero"
            :pregunta="preguntas.falto_dinero"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_cerdo_res_pollo"
            :pregunta="preguntas.consume_cerdo_res_pollo"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_huevos"
            :pregunta="preguntas.consume_huevos"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_frijol_lentejas"
            :pregunta="preguntas.consume_frijol_lentejas"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_lacteos"
            :pregunta="preguntas.consume_lacteos"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_harinas"
            :pregunta="preguntas.consume_harinas"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_verduras"
            :pregunta="preguntas.consume_verduras"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_frutas_frescas"
            :pregunta="preguntas.consume_frutas_frescas"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_enlatados"
            :pregunta="preguntas.consume_enlatados"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_platano_yuca"
            :pregunta="preguntas.consume_platano_yuca"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_gaseosas"
            :pregunta="preguntas.consume_gaseosas"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'SeguridadAlimentaria',
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