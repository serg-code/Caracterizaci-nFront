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
            :respuesta="model.respuestas.tipo_familia"
            :pregunta="preguntas.tipo_familia"
        />
        <input-pregunta
            :respuesta="model.respuestas.duermen_ninos_ninas_adultos"
            :pregunta="preguntas.duermen_ninos_ninas_adultos"
        />
        <input-pregunta
            :respuesta="model.respuestas.problemas_alcohol"
            :pregunta="preguntas.problemas_alcohol"
        />
        <input-pregunta
            :respuesta="model.respuestas.consume_tranquilizantes"
            :pregunta="preguntas.consume_tranquilizantes"
        />
        <input-pregunta
            :respuesta="model.respuestas.relaciones_cordiales_respetuosas"
            :pregunta="preguntas.relaciones_cordiales_respetuosas"
        />
        <input-pregunta
            :respuesta="model.respuestas.lavar_manos_antes_comer"
            :pregunta="preguntas.lavar_manos_antes_comer"
        />
        <input-pregunta
            :respuesta="model.respuestas.lavar_manos_antes_preparar_alimentos"
            :pregunta="preguntas.lavar_manos_antes_preparar_alimentos"
        />
        <input-pregunta
            :respuesta="model.respuestas.fumigar_vivienda"
            :pregunta="preguntas.fumigar_vivienda"
        />
        <input-pregunta
            :respuesta="model.respuestas.secretaria_fumigado"
            :pregunta="preguntas.secretaria_fumigado"
        />
        <input-pregunta
            :respuesta="model.respuestas.acido_borico_cucarachas"
            :pregunta="preguntas.acido_borico_cucarachas"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'FactoresProtectores',
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