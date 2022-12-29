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
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.lepra"
            :pregunta="preguntasIntegrante.lepra"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.chagas"
            :pregunta="preguntasIntegrante.chagas"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.sifilis"
            :pregunta="preguntasIntegrante.sifilis"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.dengue"
            :pregunta="preguntasIntegrante.dengue"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.malaria"
            :pregunta="preguntasIntegrante.malaria"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.leishmaniasis"
            :pregunta="preguntasIntegrante.leishmaniasis"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.brucelosis"
            :pregunta="preguntasIntegrante.brucelosis"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.sika_chicungunya"
            :pregunta="preguntasIntegrante.sika_chicungunya"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.varicela"
            :pregunta="preguntasIntegrante.varicela"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.intoxicacion"
            :pregunta="preguntasIntegrante.intoxicacion"
            sm="6"
            md="4"
            xl="3"
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