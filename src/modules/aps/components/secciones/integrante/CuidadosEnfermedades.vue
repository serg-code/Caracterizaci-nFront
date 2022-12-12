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
            :respuesta="model.respuestas.cancer"
            :pregunta="preguntasIntegrante.cancer"
        />
        <input-pregunta
            :respuesta="model.respuestas.artritis_remautidea"
            :pregunta="preguntasIntegrante.artritis_remautidea"
        />
        <input-pregunta
            :respuesta="model.respuestas.vih_sida"
            :pregunta="preguntasIntegrante.vih_sida"
        />
        <input-pregunta
            :respuesta="model.respuestas.hemofilia"
            :pregunta="preguntasIntegrante.hemofilia"
        />
        <input-pregunta
            :respuesta="model.respuestas.insuficiencia_renal"
            :pregunta="preguntasIntegrante.insuficiencia_renal"
        />
        <input-pregunta
            :respuesta="model.respuestas.fuma"
            :pregunta="preguntasIntegrante.fuma"
        />
        <input-pregunta
            :respuesta="model.respuestas.actividad_fisica"
            :pregunta="preguntasIntegrante.actividad_fisica"
        />
        <input-pregunta
            :respuesta="model.respuestas.vacuna_fiebre_amarilla"
            :pregunta="preguntasIntegrante.vacuna_fiebre_amarilla"
        />
        <input-pregunta
            :respuesta="model.respuestas.enfermedades_cronicas"
            :pregunta="preguntasIntegrante.enfermedades_cronicas"
        />
        <input-pregunta
            :respuesta="model.respuestas.diabetes"
            :pregunta="preguntasIntegrante.diabetes"
        />
        <input-pregunta
            :respuesta="model.respuestas.hipertencion_trimestral"
            :pregunta="preguntasIntegrante.hipertencion_trimestral"
        />
        <input-pregunta
            :respuesta="model.respuestas.diabetes_trimestral"
            :pregunta="preguntasIntegrante.diabetes_trimestral"
        />
        <input-pregunta
            :respuesta="model.respuestas.tension_sistolica"
            :pregunta="preguntasIntegrante.tension_sistolica"
        />
        <input-pregunta
            :respuesta="model.respuestas.tension_diastolica"
            :pregunta="preguntasIntegrante.tension_diastolica"
        />
        <input-pregunta
            :respuesta="model.respuestas.hemoglobina_glococilada"
            :pregunta="preguntasIntegrante.hemoglobina_glococilada"
        />
        <input-pregunta
            :respuesta="model.respuestas.enfermedades_costosas"
            :pregunta="preguntasIntegrante.enfermedades_costosas"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'CuidadosEnfermedades',
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