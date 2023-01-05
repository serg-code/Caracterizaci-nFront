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
            :respuesta="model.respuestas.depresion"
            :pregunta="preguntasIntegrante.depresion"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.intento_suicidio"
            :pregunta="preguntasIntegrante.intento_suicidio"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.esquizofrenia"
            :pregunta="preguntasIntegrante.esquizofrenia"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.trastorno_afectivo"
            :pregunta="preguntasIntegrante.trastorno_afectivo"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.bulimia"
            :pregunta="preguntasIntegrante.bulimia"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.anorexia"
            :pregunta="preguntasIntegrante.anorexia"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.tratamiento"
            :pregunta="preguntasIntegrante.tratamiento"
            sm="6"
            md="4"
            xl="3"
        />
        <v-col
            v-if="model.respuestas.diagnostico.show"
            cols="12"
        >
          <search-cie10
              v-model="model.respuestas.diagnostico.model"
              item-text="descrip"
              item-value="codigo"
              tipo="SaludMental"
              :name="preguntasIntegrante.diagnostico.descripcion"
              :label="preguntasIntegrante.diagnostico.descripcion"
              rules="required"
          />
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.violencia_fisica"
            :pregunta="preguntasIntegrante.violencia_fisica"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_psicologica"
            :pregunta="preguntasIntegrante.violencia_psicologica"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_sexual"
            :pregunta="preguntasIntegrante.violencia_sexual"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_institucional"
            :pregunta="preguntasIntegrante.violencia_institucional"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_social"
            :pregunta="preguntasIntegrante.violencia_social"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.violencia_gestacion"
            :pregunta="preguntasIntegrante.violencia_gestacion"
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
import SearchCie10 from '@/modules/aps/components/input/SearchCie10'
import {integrante} from '@/modules/aps/data/CondicionalesId'
export default {
  name: 'SaludMental',
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
      this.tratamiento()
    },
    tratamiento(){
      if(this.model.respuestas.tratamiento.model === integrante.tratamiento) this.model.respuestas.diagnostico.show = true
      else {
        this.model.respuestas.diagnostico.show = false
        this.model.respuestas.diagnostico.model = null
      }
    }
  }
}
</script>