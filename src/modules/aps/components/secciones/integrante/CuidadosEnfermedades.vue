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
            sm="6"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.tension_diastolica"
            :pregunta="preguntasIntegrante.tension_diastolica"
            sm="6"
            md="6"
        />
        <v-col v-if="tensionArterial" cols="12" class="pt-0">
          <v-chip label :color="tensionArterial.color">
            {{tensionArterial.message}}
          </v-chip>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.hemoglobina_glococilada"
            :pregunta="preguntasIntegrante.hemoglobina_glococilada"
            md="6"
        />
        <v-col v-if="hemoglobina" cols="12" class="pt-0">
          <v-chip label :color="hemoglobina.color">
            {{hemoglobina.message}}
          </v-chip>
        </v-col>
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
    },
    hemoglobina(){
      const valorHemoglobina = Number(this.model.respuestas.hemoglobina_glococilada.model)
      if(valorHemoglobina && valorHemoglobina >= 7){
        return { color: 'error', message: 'Hemoglobina no controlada' }
      }
      return null
    },
    tensionArterial(){
      const sistolica = Number(this.model.respuestas.tension_sistolica.model)
      const diastolica = Number(this.model.respuestas.tension_diastolica.model)
      if(sistolica && diastolica) {
        if((sistolica < 120) && (diastolica < 120)) {
          return {color: 'success', message: 'Tensión arterial óptima'}
        }else if((sistolica >= 120 && sistolica <= 129) && (diastolica >= 80 && diastolica <= 84)) {
          return {color: 'success', message: 'Tensión arterial normal'}
        }else if((sistolica >= 130 && sistolica <= 139) && (diastolica >= 85 && diastolica <= 90)) {
          return {color: 'warning', message: 'Tensión arterial normal alta'}
        }else if((sistolica >= 140 && sistolica <= 159) && (diastolica >= 90 && diastolica <= 99)) {
          return {color: 'error', message: 'Hipertensión grado 1'}
        }else if((sistolica >= 160 && sistolica <= 179) && (diastolica >= 100 && diastolica <= 109)) {
          return {color: 'error', message: 'Hipertensión grado 2'}
        }else if((sistolica >= 180) && (diastolica >= 110)) {
          return {color: 'error', message: 'Hipertensión grado 3'}
        }else if((sistolica >= 140) && (diastolica <= 90)) {
          return {color: 'error', message: 'Hipertensión sistólica aislada'}
        } else return {color: 'warning', message: 'Evaluación no disponible'}
      } else return null
    }
  }
}
</script>