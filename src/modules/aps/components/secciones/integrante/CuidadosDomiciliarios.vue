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
            :respuesta="model.respuestas.cuidados_domiciliarios"
            :pregunta="preguntasIntegrante.cuidados_domiciliarios"
        />

        <v-col
            v-if="model.respuestas.diagnostico_principal.show"
            cols="12"
        >
          <search-cie10
              v-model="model.respuestas.diagnostico_principal.model"
              item-text="descrip"
              item-value="codigo"
              :name="preguntasIntegrante.diagnostico_principal.descripcion"
              :label="preguntasIntegrante.diagnostico_principal.descripcion"
              rules="required"
          />
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.causa"
            :pregunta="preguntasIntegrante.causa"
        />
        <input-pregunta
            :respuesta="model.respuestas.fecha_inicio_domiciliario"
            :pregunta="preguntasIntegrante.fecha_inicio_domiciliario"
        />
        <input-pregunta
            :respuesta="model.respuestas.oxigeno_domiciliario"
            :pregunta="preguntasIntegrante.oxigeno_domiciliario"
        />
        <input-pregunta
            :respuesta="model.respuestas.plan_aprobado"
            :pregunta="preguntasIntegrante.plan_aprobado"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
import SearchCie10 from '@/modules/aps/components/input/SearchCie10'
export default {
  name: 'CuidadosDomiciliarios',
  components: {SearchCie10, InputPregunta},
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
      this.oxigenoDomiciliario()
      this.cuidadosDomiciliarios()
    },
    cuidadosDomiciliarios(){
      if(this.model.respuestas.cuidados_domiciliarios.model === 78) {
        this.model.respuestas.diagnostico_principal.show = true
        this.model.respuestas.causa.show = true
        this.model.respuestas.fecha_inicio_domiciliario.show = true
        this.model.respuestas.oxigeno_domiciliario.show = true
      }
      else {
        this.model.respuestas.diagnostico_principal.show = false
        this.model.respuestas.diagnostico_principal.model = null
      this.model.respuestas.causa.show = false
      this.model.respuestas.causa.model = null
        this.model.respuestas.fecha_inicio_domiciliario.show = false
        this.model.respuestas.fecha_inicio_domiciliario.model = null
        this.model.respuestas.oxigeno_domiciliario.show = false
        this.model.respuestas.oxigeno_domiciliario.model = null
      }
    },
    oxigenoDomiciliario(){
      if(this.model.respuestas.oxigeno_domiciliario.model === 85) this.model.respuestas.plan_aprobado.show = true
      else {
        this.model.respuestas.plan_aprobado.show = false
        this.model.respuestas.plan_aprobado.model = null
      }
    }
  }
}
</script>