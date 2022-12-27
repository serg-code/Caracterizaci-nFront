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
            :respuesta="model.respuestas.gatos"
            :pregunta="preguntas.gatos"
        />
        <input-pregunta
            :respuesta="model.respuestas.gatos_cuantos"
            :pregunta="preguntas.gatos_cuantos"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.gatos_vacunados"
            :pregunta="preguntas.gatos_vacunados"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.perros"
            :pregunta="preguntas.perros"
        />
        <input-pregunta
            :respuesta="model.respuestas.perros_cuantos"
            :pregunta="preguntas.perros_cuantos"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.perros_vacunados"
            :pregunta="preguntas.perros_vacunados"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.equinos"
            :pregunta="preguntas.equinos"
        />
        <input-pregunta
            :respuesta="model.respuestas.equinos_cuantos"
            :pregunta="preguntas.equinos_cuantos"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.equinos_vacunados"
            :pregunta="preguntas.equinos_vacunados"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.aves"
            :pregunta="preguntas.aves"
        />
        <input-pregunta
            :respuesta="model.respuestas.porcinos"
            :pregunta="preguntas.porcinos"
        />
        <input-pregunta
            :respuesta="model.respuestas.porcinos_cuantos"
            :pregunta="preguntas.porcinos_cuantos"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.porcinos_vacunados"
            :pregunta="preguntas.porcinos_vacunados"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.animales_no_rabia"
            :pregunta="preguntas.animales_no_rabia"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.animales_si_rabia"
            :pregunta="preguntas.animales_si_rabia"
            md="6"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'AnimalesHogar',
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
      this.gatos()
      this.perros()
      this.equinos()
      this.porcinos()
    },
    porcinos(){
      if(this.model.respuestas.porcinos.model === 359) {
        this.model.respuestas.porcinos_cuantos.show = true
        this.model.respuestas.porcinos_vacunados.show = true
      }
      else {
        this.model.respuestas.porcinos_cuantos.show = false
        this.model.respuestas.porcinos_cuantos.model = null
        this.model.respuestas.porcinos_vacunados.show = false
        this.model.respuestas.porcinos_vacunados.model = null
      }
    },
    equinos(){
      if(this.model.respuestas.equinos.model === 353) {
        this.model.respuestas.equinos_cuantos.show = true
        this.model.respuestas.equinos_vacunados.show = true
      }
      else {
        this.model.respuestas.equinos_cuantos.show = false
        this.model.respuestas.equinos_cuantos.model = null
        this.model.respuestas.equinos_vacunados.show = false
        this.model.respuestas.equinos_vacunados.model = null
      }
    },
    perros(){
      if(this.model.respuestas.perros.model === 349) {
        this.model.respuestas.perros_cuantos.show = true
        this.model.respuestas.perros_vacunados.show = true
      }
      else {
        this.model.respuestas.perros_cuantos.show = false
        this.model.respuestas.perros_cuantos.model = null
        this.model.respuestas.perros_vacunados.show = false
        this.model.respuestas.perros_vacunados.model = null
      }
    },
    gatos(){
      if(this.model.respuestas.gatos.model === 345) {
        this.model.respuestas.gatos_cuantos.show = true
        this.model.respuestas.gatos_vacunados.show = true
      }
      else {
        this.model.respuestas.gatos_cuantos.show = false
        this.model.respuestas.gatos_cuantos.model = null
        this.model.respuestas.gatos_vacunados.show = false
        this.model.respuestas.gatos_vacunados.model = null
      }
    },
  }
}
</script>