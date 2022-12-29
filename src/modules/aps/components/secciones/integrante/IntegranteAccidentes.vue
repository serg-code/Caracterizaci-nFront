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
            :respuesta="model.respuestas.accidentes_transito"
            :pregunta="preguntasIntegrante.accidentes_transito"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipo_lesion"
            :pregunta="preguntasIntegrante.tipo_lesion"
        />
        <input-pregunta
            :respuesta="model.respuestas.accidentes_laborales"
            :pregunta="preguntasIntegrante.accidentes_laborales"
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
  name: 'IntegranteAccidentes',
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
      this.accidentesTransito()
    },
    accidentesTransito(){
      if(this.model.respuestas.accidentes_transito.model === integrante.accidentes_transito) this.model.respuestas.tipo_lesion.show = true
      else {
        this.model.respuestas.tipo_lesion.show = false
        this.model.respuestas.tipo_lesion.model = null
      }
    }
  }
}
</script>