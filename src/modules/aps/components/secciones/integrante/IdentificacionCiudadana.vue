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
            :respuesta="model.respuestas.grupo_etnia"
            :pregunta="preguntasIntegrante.grupo_etnia"
        />
        <input-pregunta
            :respuesta="model.respuestas.grupo_atencion_especial"
            :pregunta="preguntasIntegrante.grupo_atencion_especial"
        />
        <input-pregunta
            :respuesta="model.respuestas.programas"
            :pregunta="preguntasIntegrante.programas"
        />
        <input-pregunta
            :respuesta="model.respuestas.cual_programa"
            :pregunta="preguntasIntegrante.cual_programa"
        />
        <input-pregunta
            :respuesta="model.respuestas.seguridad_social"
            :pregunta="preguntasIntegrante.seguridad_social"
        />
        <input-pregunta
            :respuesta="model.respuestas.esta_estudiando"
            :pregunta="preguntasIntegrante.esta_estudiando"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipo_educacion"
            :pregunta="preguntasIntegrante.tipo_educacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.por_que"
            :pregunta="preguntasIntegrante.por_que"
        />
        <input-pregunta
            :respuesta="model.respuestas.ocupacion_ingreso"
            :pregunta="preguntasIntegrante.ocupacion_ingreso"
        />
        <input-pregunta
            :respuesta="model.respuestas.discapacidad"
            :pregunta="preguntasIntegrante.discapacidad"
        />
        <input-pregunta
            :respuesta="model.respuestas.ayudas_tenicas"
            :pregunta="preguntasIntegrante.ayudas_tenicas"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
import { integrante } from '@/modules/aps/data/CondicionalesId'
export default {
  name: 'IdentificacionCiudadana',
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
      this.programas()
      this.estaEstudiando()
      this.discapacidad()
    },
    discapacidad(){
      if(this.model.respuestas.discapacidad.model && this.model.respuestas.discapacidad.model !== integrante.discapacidad) this.model.respuestas.ayudas_tenicas.show = true
      else {
        this.model.respuestas.ayudas_tenicas.show = false
        this.model.respuestas.ayudas_tenicas.model = null
      }
    },
    estaEstudiando(){
      if(this.model.respuestas.esta_estudiando.model === integrante.esta_estudiando) {
        this.model.respuestas.por_que.show = true
      }
      else {
        this.model.respuestas.por_que.show = false
        this.model.respuestas.por_que.model = null
      }

      if(this.model.respuestas.esta_estudiando.model === integrante.esta_estudiando_si) {
        this.model.respuestas.tipo_educacion.show = true
      }
      else {
        this.model.respuestas.tipo_educacion.show = false
        this.model.respuestas.tipo_educacion.model = null
      }
    },
    programas(){
      if(this.model.respuestas.programas.model === integrante.programas) this.model.respuestas.cual_programa.show = true
      else {
        this.model.respuestas.cual_programa.show = false
        this.model.respuestas.cual_programa.model = null
      }
    }
  }
}
</script>