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
            :respuesta="model.respuestas.adol_peso"
            :pregunta="preguntasIntegrante.adol_peso"
            type="number"
            decimal
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_talla"
            :pregunta="preguntasIntegrante.adol_talla"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_imc"
            :pregunta="preguntasIntegrante.adol_imc"
            type="number"
            decimal
            readonly
            :clearable="false"
            :hint="hintIMC"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_asesoria_anticonceptiva"
            :pregunta="preguntasIntegrante.adol_asesoria_anticonceptiva"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_planifica"
            :pregunta="preguntasIntegrante.adol_planifica"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_metodo_planficica"
            :pregunta="preguntasIntegrante.adol_metodo_planficica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_desde_cuando_planifica"
            :pregunta="preguntasIntegrante.adol_desde_cuando_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_razon_no_planifica"
            :pregunta="preguntasIntegrante.adol_razon_no_planifica"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Vacunación</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.adol_vacunacion"
            :pregunta="preguntasIntegrante.adol_vacunacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_vacuna_fiebre_amarilla"
            :pregunta="preguntasIntegrante.adol_vacuna_fiebre_amarilla"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_vacuna_vph"
            :pregunta="preguntasIntegrante.adol_vacuna_vph"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_vacuna_toxoide_tetanico"
            :pregunta="preguntasIntegrante.adol_vacuna_toxoide_tetanico"
            sm="6"
            md="4"
            lg="3"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.adol_atencion_medica"
            :pregunta="preguntasIntegrante.adol_atencion_medica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_atencion_enfermeria"
            :pregunta="preguntasIntegrante.adol_atencion_enfermeria"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Salud oral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.adol_salud_bucal"
            :pregunta="preguntasIntegrante.adol_salud_bucal"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_fluor"
            :pregunta="preguntasIntegrante.adol_fluor"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_profilaxis"
            :pregunta="preguntasIntegrante.adol_profilaxis"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_sellantes"
            :pregunta="preguntasIntegrante.adol_sellantes"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_supragingival"
            :pregunta="preguntasIntegrante.adol_supragingival"
            sm="6"
            md="4"
            lg="3"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import APSMixin from '@/modules/aps/mixins/APSMixin'
import {mapState} from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
import {integrante} from '@/modules/aps/data/CondicionalesId'

export default {
  name: 'AdolecenciaIntegrante',
  components: {InputPregunta},
  mixins: [APSMixin],
  props: {
    seccion: {
      type: Object,
      default: null
    },
    integrante: {
      type: Object,
      default: null
    }
  },
  data:() =>({
    hintIMC: ''
  }),
  computed: {
    keyRespuestas(){
      return this.model?.respuestas && Object.keys(this.model.respuestas) || []
    },
    edad(){
      return this.integrante?.fecha_nacimiento && this.calculateAge(this.integrante.fecha_nacimiento) || null
    },
    sexo(){
      return this.integrante?.sexo || null
    },
    ...mapState('aps', ['preguntasIntegrante']),
    model: {
      get() {
        return this.seccion
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    model: {
      handler() {
        this.validaLogica()
      },
      immediate: true,
      deep: true
    },
    edad: {
      handler() {
        this.validaSeccion()
      },
      immediate: true,
      deep: true
    },
    sexo: {
      handler() {
        this.validaSeccion()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    validaSeccion(){
      this.validadorSeccionIntegrante(this.model, this.integrante)
    },
    validaLogica() {
      this.adolVacunacion()
      this.adolPlanifica()
      this.calculaImc()
    },
    calculaImc(){
      this.hintIMC = ''
      const result = this.getIMC(this.model.respuestas.adol_peso.model, this.model.respuestas.adol_talla.model)
      this.model.respuestas.adol_imc.model = result.resultado
      this.hintIMC = result.hintIMC
    },
    adolPlanifica(){
      if (this.model.respuestas.adol_planifica.model === integrante.adol_planifica) {
        this.model.respuestas.adol_metodo_planficica.show = true
        this.model.respuestas.adol_desde_cuando_planifica.show = true
        this.model.respuestas.adol_razon_no_planifica.show = false
        this.model.respuestas.adol_razon_no_planifica.model = null
      } else {
        this.model.respuestas.adol_metodo_planficica.show = false
        this.model.respuestas.adol_metodo_planficica.model = null
        this.model.respuestas.adol_desde_cuando_planifica.show = false
        this.model.respuestas.adol_desde_cuando_planifica.model = null
        this.model.respuestas.adol_razon_no_planifica.show = true
      }
    },
    adolVacunacion() {
      const vacunasKey = this.keyRespuestas?.length && this.keyRespuestas.filter(x => x.includes('adol_vacuna_'))
      if (this.model.respuestas.adol_vacunacion.model === integrante.adol_vacunacion) {
        vacunasKey.forEach(x => {
          this.model.respuestas[x].show = true
        })
      } else {
        vacunasKey.forEach(x => {
          this.model.respuestas[x].show = false
          this.model.respuestas[x].model = null
        })
      }
    }
  }
}
</script>