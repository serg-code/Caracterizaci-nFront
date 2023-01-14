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
            :respuesta="model.respuestas.adul_valoracion_peso"
            :pregunta="preguntasIntegrante.adul_valoracion_peso"
            type="number"
            decimal
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_valoracion_talla"
            :pregunta="preguntasIntegrante.adul_valoracion_talla"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_imc"
            :pregunta="preguntasIntegrante.adul_imc"
            type="number"
            decimal
            readonly
            :clearable="false"
            :hint="hintIMC"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_asesoria_anticoncepcion"
            :pregunta="preguntasIntegrante.adul_asesoria_anticoncepcion"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_planifica"
            :pregunta="preguntasIntegrante.adul_planifica"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_metodo_planifica"
            :pregunta="preguntasIntegrante.adul_metodo_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_desde_cuando_planifica"
            :pregunta="preguntasIntegrante.adul_desde_cuando_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_razones_no_planifica"
            :pregunta="preguntasIntegrante.adul_razones_no_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_parejas_sexuales_al_anio"
            :pregunta="preguntasIntegrante.adul_parejas_sexuales_al_anio"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_control_adultos"
            :pregunta="preguntasIntegrante.adul_control_adultos"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_antecedentes_diabetes"
            :pregunta="preguntasIntegrante.adul_antecedentes_diabetes"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_antecedentes_hipertension"
            :pregunta="preguntasIntegrante.adul_antecedentes_hipertension"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_antecedentes_colesterol"
            :pregunta="preguntasIntegrante.adul_antecedentes_colesterol"
            sm="6"
            md="4"
        />
        <v-col cols="12">
          <v-row>
            <input-pregunta
                :respuesta="model.respuestas.adul_perimetro_abdominal"
                :pregunta="preguntasIntegrante.adul_perimetro_abdominal"
                type="number"
                decimal
                md="6"
            />
          </v-row>
        </v-col>

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.adul_atencion_medica"
            :pregunta="preguntasIntegrante.adul_atencion_medica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_salud_bucal"
            :pregunta="preguntasIntegrante.adul_salud_bucal"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_profilaxis"
            :pregunta="preguntasIntegrante.adul_profilaxis"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_detartraje_supragingival"
            :pregunta="preguntasIntegrante.adul_detartraje_supragingival"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Detección temprana</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.adul_cancer_cuello_uterino_adn_vph"
            :pregunta="preguntasIntegrante.adul_cancer_cuello_uterino_adn_vph"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_cancer_cuello_uterino_adn_vph_positivo"
            :pregunta="preguntasIntegrante.adul_cancer_cuello_uterino_adn_vph_positivo"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_colposcopia_cervico_uterina"
            :pregunta="preguntasIntegrante.adul_colposcopia_cervico_uterina"
        />

        <input-pregunta
            :respuesta="model.respuestas.adul_biopsia_cervico_uterina"
            :pregunta="preguntasIntegrante.adul_biopsia_cervico_uterina"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_cancer_mama_mamografia"
            :pregunta="preguntasIntegrante.adul_cancer_mama_mamografia"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_cancer_mama_valoracion_clinica"
            :pregunta="preguntasIntegrante.adul_cancer_mama_valoracion_clinica"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_cancer_prostata"
            :pregunta="preguntasIntegrante.adul_cancer_prostata"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_vasectomia"
            :pregunta="preguntasIntegrante.adul_vasectomia"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_esterilizacion_femenina"
            :pregunta="preguntasIntegrante.adul_esterilizacion_femenina"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_vias_esterilizacion"
            :pregunta="preguntasIntegrante.adul_vias_esterilizacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_fiebre_amarilla"
            :pregunta="preguntasIntegrante.adul_fiebre_amarilla"
        />
        <input-pregunta
            :respuesta="model.respuestas.adul_prueba_vih"
            :pregunta="preguntasIntegrante.adul_prueba_vih"
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
  name: 'AdultezIntegrante',
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
      this.adulPlanifica()
      // this.juvCancerCuelloUterino()
      this.adulEsterilizacionFemenina()
      this.calculaImc()
    },
    calculaImc(){
      this.hintIMC = ''
      const result = this.getIMC(this.model.respuestas.adul_valoracion_peso.model, this.model.respuestas.adul_valoracion_talla.model)
      this.model.respuestas.adul_imc.model = result.resultado
      this.hintIMC = result.hintIMC
    },
    adulEsterilizacionFemenina(){
      if (this.model.respuestas.adul_esterilizacion_femenina.model === integrante.adul_esterilizacion_femenina) {
        this.model.respuestas.adul_vias_esterilizacion.show = true
      } else {
        this.model.respuestas.adul_vias_esterilizacion.show = false
        this.model.respuestas.adul_vias_esterilizacion.model = null
      }
    },
    // juvCancerCuelloUterino(){
    //   if (this.model.respuestas.juv_cancer_cuello_uterino.model === integrante.juv_cancer_cuello_uterino) {
    //     this.model.respuestas.juv_colposcopia.show = true
    //     this.model.respuestas.juv_bioscopia_cervico.show = true
    //   } else {
    //     this.model.respuestas.juv_colposcopia.show = false
    //     this.model.respuestas.juv_colposcopia.model = null
    //     this.model.respuestas.juv_bioscopia_cervico.show = false
    //     this.model.respuestas.juv_bioscopia_cervico.model = null
    //   }
    // },
    adulPlanifica(){
      if (this.model.respuestas.adul_planifica.model === integrante.adul_planifica) {
        this.model.respuestas.adul_metodo_planifica.show = true
        this.model.respuestas.adul_desde_cuando_planifica.show = true
        this.model.respuestas.adul_razones_no_planifica.show = false
        this.model.respuestas.adul_razones_no_planifica.model = null
      } else {
        this.model.respuestas.adul_metodo_planifica.show = false
        this.model.respuestas.adul_metodo_planifica.model = null
        this.model.respuestas.adul_desde_cuando_planifica.show = false
        this.model.respuestas.adul_desde_cuando_planifica.model = null
        this.model.respuestas.adul_razones_no_planifica.show = true
      }
    }
  }
}
</script>