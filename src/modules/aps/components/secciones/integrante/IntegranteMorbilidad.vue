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
            :respuesta="model.respuestas.enfermedad_cronica"
            :pregunta="preguntasIntegrante.enfermedad_cronica"
        />
        <v-col
            v-if="model.respuestas.enfermedad_cronica_cual.show"
            cols="12"
        >
          <search-cie10
              v-model="model.respuestas.enfermedad_cronica_cual.model"
              item-text="descrip"
              item-value="codigo"
              tipo="EnfermedadCronica"
              :name="preguntasIntegrante.enfermedad_cronica_cual.descripcion"
              :label="preguntasIntegrante.enfermedad_cronica_cual.descripcion"
              rules="required"
          />
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.controlada"
            :pregunta="preguntasIntegrante.controlada"
        />
        <input-pregunta
            :respuesta="model.respuestas.propiedades_respiratorio"
            :pregunta="preguntasIntegrante.propiedades_respiratorio"
        />
        <input-pregunta
            :respuesta="model.respuestas.propiedades_piel"
            :pregunta="preguntasIntegrante.propiedades_piel"
        />
        <input-pregunta
            :respuesta="model.respuestas.enfermedades_congenitas"
            :pregunta="preguntasIntegrante.enfermedades_congenitas"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
import SearchCie10 from '@/modules/aps/components/input/SearchCie10'
import {integrante} from '@/modules/aps/data/CondicionalesId'
export default {
  name: 'IntegranteMorbilidad',
  components: {InputPregunta, SearchCie10},
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
  },
  watch:{
    model:{
      handler(){
        this.validaLogica()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    validaLogica() {
      this.enfermedadCronica()
    },
    enfermedadCronica(){
      if(this.model.respuestas.enfermedad_cronica.model === integrante.enfermedad_cronica) {
        this.model.respuestas.enfermedad_cronica_cual.show = true
        this.model.respuestas.controlada.show = true
      }
      else {
        this.model.respuestas.enfermedad_cronica_cual.show = false
        this.model.respuestas.enfermedad_cronica_cual.model = null
        this.model.respuestas.controlada.show = false
        this.model.respuestas.controlada.model = null
      }
    }
  }
}
</script>