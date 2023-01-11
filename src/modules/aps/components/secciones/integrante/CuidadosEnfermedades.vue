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
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.artritis_remautidea"
            :pregunta="preguntasIntegrante.artritis_remautidea"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.vih_sida"
            :pregunta="preguntasIntegrante.vih_sida"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.hemofilia"
            :pregunta="preguntasIntegrante.hemofilia"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.insuficiencia_renal"
            :pregunta="preguntasIntegrante.insuficiencia_renal"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.fuma"
            :pregunta="preguntasIntegrante.fuma"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.actividad_fisica"
            :pregunta="preguntasIntegrante.actividad_fisica"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.vacuna_fiebre_amarilla"
            :pregunta="preguntasIntegrante.vacuna_fiebre_amarilla"
            sm="6"
            md="4"
        />
<!--        <input-pregunta-->
<!--            :respuesta="model.respuestas.enfermedades_cronicas"-->
<!--            :pregunta="preguntasIntegrante.enfermedades_cronicas"-->
<!--            sm="6"-->
<!--            md="4"-->
<!--        />-->
        <input-pregunta
            :respuesta="model.respuestas.diabetes"
            :pregunta="preguntasIntegrante.diabetes"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.hipertencion_trimestral"
            :pregunta="preguntasIntegrante.hipertencion_trimestral"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.diabetes_trimestral"
            :pregunta="preguntasIntegrante.diabetes_trimestral"
            sm="6"
            md="4"
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

        <input-pregunta
            :respuesta="model.respuestas.ha_estado_embarazada"
            :pregunta="preguntasIntegrante.ha_estado_embarazada"
        />
        <input-pregunta
            :respuesta="model.respuestas.cuantos_embarazos_ha_tenido"
            :pregunta="preguntasIntegrante.cuantos_embarazos_ha_tenido"
        />
        <input-pregunta
            :respuesta="model.respuestas.hijos_muertos_parto_natural"
            :pregunta="preguntasIntegrante.hijos_muertos_parto_natural"
        />
        <input-pregunta
            :respuesta="model.respuestas.hijos_vivos_parto_natural"
            :pregunta="preguntasIntegrante.hijos_vivos_parto_natural"
        />
        <input-pregunta
            :respuesta="model.respuestas.hijos_muertos_por_cesarea"
            :pregunta="preguntasIntegrante.hijos_muertos_por_cesarea"
        />
        <input-pregunta
            :respuesta="model.respuestas.hijos_vivos_por_cesarea"
            :pregunta="preguntasIntegrante.hijos_vivos_por_cesarea"
        />
        <input-pregunta
            :respuesta="model.respuestas.cuantos_abortos"
            :pregunta="preguntasIntegrante.cuantos_abortos"
        />
        <input-pregunta
            :respuesta="model.respuestas.cuantos_gemelos_multiples"
            :pregunta="preguntasIntegrante.cuantos_gemelos_multiples"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
import {integrante} from '@/modules/aps/data/CondicionalesId'
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
  },
  watch: {
    model: {
      handler() {
        this.validaLogica()
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    validaLogica(){
      this.haEstadoEmbarazada()
    },
    haEstadoEmbarazada(){
      if (this.model.respuestas.ha_estado_embarazada.model === integrante.ha_estado_embarazada) {
        this.model.respuestas.cuantos_embarazos_ha_tenido.show = true
        this.model.respuestas.hijos_muertos_parto_natural.show = true
        this.model.respuestas.hijos_vivos_parto_natural.show = true
        this.model.respuestas.hijos_muertos_por_cesarea.show = true
        this.model.respuestas.hijos_vivos_por_cesarea.show = true
        this.model.respuestas.cuantos_abortos.show = true
        this.model.respuestas.cuantos_gemelos_multiples.show = true
      } else {
        this.model.respuestas.cuantos_embarazos_ha_tenido.show = false
        this.model.respuestas.cuantos_embarazos_ha_tenido.model = null
        this.model.respuestas.hijos_muertos_parto_natural.show = false
        this.model.respuestas.hijos_muertos_parto_natural.model = null
        this.model.respuestas.hijos_vivos_parto_natural.show = false
        this.model.respuestas.hijos_vivos_parto_natural.model = null
        this.model.respuestas.hijos_muertos_por_cesarea.show = false
        this.model.respuestas.hijos_muertos_por_cesarea.model = null
        this.model.respuestas.hijos_vivos_por_cesarea.show = false
        this.model.respuestas.hijos_vivos_por_cesarea.model = null
        this.model.respuestas.cuantos_abortos.show = false
        this.model.respuestas.cuantos_abortos.model = null
        this.model.respuestas.cuantos_gemelos_multiples.show = false
        this.model.respuestas.cuantos_gemelos_multiples.model = null
      }
    }
  }
}
</script>