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
            :respuesta="model.respuestas.fallecido_familiar"
            :pregunta="preguntas.fallecido_familiar"
        />
        <input-pregunta
            :respuesta="model.respuestas.sexo_fallecido"
            :pregunta="preguntas.sexo_fallecido"
        />
        <input-pregunta
            :respuesta="model.respuestas.edad_fallecido"
            :pregunta="preguntas.edad_fallecido"
        />
        <input-pregunta
            :respuesta="model.respuestas.causa_muerte"
            :pregunta="preguntas.causa_muerte"
        />
        <input-pregunta
            :respuesta="model.respuestas.fecha_muerte"
            :pregunta="preguntas.fecha_muerte"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
import { hogar } from '@/modules/aps/data/CondicionalesId'
export default {
  name: 'MortalidadHogar',
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
      this.fallecidoFamiliar()
    },
    fallecidoFamiliar(){
      if(this.model.respuestas.fallecido_familiar.model === hogar.fallecido_familiar) {
        this.model.respuestas.sexo_fallecido.show = true
        this.model.respuestas.edad_fallecido.show = true
        this.model.respuestas.causa_muerte.show = true
        this.model.respuestas.fecha_muerte.show = true
      }
      else {
        this.model.respuestas.sexo_fallecido.show = false
        this.model.respuestas.sexo_fallecido.model = null
        this.model.respuestas.edad_fallecido.show = false
        this.model.respuestas.edad_fallecido.model = null
        this.model.respuestas.causa_muerte.show = false
        this.model.respuestas.causa_muerte.model = null
        this.model.respuestas.fecha_muerte.show = false
        this.model.respuestas.fecha_muerte.model = null
      }
    }
  }
}
</script>