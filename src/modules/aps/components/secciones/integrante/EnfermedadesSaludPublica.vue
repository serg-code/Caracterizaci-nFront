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
            :respuesta="model.respuestas.tuberculosis"
            :pregunta="preguntasIntegrante.tuberculosis"
        />
        <input-pregunta
            :respuesta="model.respuestas.lepra"
            :pregunta="preguntasIntegrante.lepra"
        />
        <input-pregunta
            :respuesta="model.respuestas.chagas"
            :pregunta="preguntasIntegrante.chagas"
        />
        <input-pregunta
            :respuesta="model.respuestas.sifilis"
            :pregunta="preguntasIntegrante.sifilis"
        />
        <input-pregunta
            :respuesta="model.respuestas.dengue"
            :pregunta="preguntasIntegrante.dengue"
        />
        <input-pregunta
            :respuesta="model.respuestas.malaria"
            :pregunta="preguntasIntegrante.malaria"
        />
        <input-pregunta
            :respuesta="model.respuestas.leishmaniasis"
            :pregunta="preguntasIntegrante.leishmaniasis"
        />
        <input-pregunta
            :respuesta="model.respuestas.brucelosis"
            :pregunta="preguntasIntegrante.brucelosis"
        />
        <input-pregunta
            :respuesta="model.respuestas.sika_chicungunya"
            :pregunta="preguntasIntegrante.sika_chicungunya"
        />
        <input-pregunta
            :respuesta="model.respuestas.varicela"
            :pregunta="preguntasIntegrante.varicela"
        />
        <input-pregunta
            :respuesta="model.respuestas.intoxicacion"
            :pregunta="preguntasIntegrante.intoxicacion"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'EnfermedadesSaludPublica',
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