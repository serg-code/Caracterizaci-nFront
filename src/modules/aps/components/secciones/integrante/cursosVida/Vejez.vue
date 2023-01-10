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
            :respuesta="model.respuestas.ve_valoracion_peso"
            :pregunta="preguntasIntegrante.ve_valoracion_peso"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_valoracion_talla"
            :pregunta="preguntasIntegrante.ve_valoracion_talla"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_imc"
            :pregunta="preguntasIntegrante.ve_imc"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_asesoria_anticoncepcion"
            :pregunta="preguntasIntegrante.ve_asesoria_anticoncepcion"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_planifica"
            :pregunta="preguntasIntegrante.ve_planifica"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_metodo_planifica"
            :pregunta="preguntasIntegrante.ve_metodo_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_desde_cuando_planifica"
            :pregunta="preguntasIntegrante.ve_desde_cuando_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_razones_no_planifica"
            :pregunta="preguntasIntegrante.ve_razones_no_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_parejas_sexuales_al_anio"
            :pregunta="preguntasIntegrante.ve_parejas_sexuales_al_anio"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_control_adultos"
            :pregunta="preguntasIntegrante.ve_control_adultos"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_antecedentes_diabetes"
            :pregunta="preguntasIntegrante.ve_antecedentes_diabetes"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_antecedentes_hipertension"
            :pregunta="preguntasIntegrante.ve_antecedentes_hipertension"
            sm="6"
            md="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_alteracion_colesterol"
            :pregunta="preguntasIntegrante.ve_alteracion_colesterol"
            sm="6"
            md="4"
        />
        <v-col cols="12">
          <v-row>
            <input-pregunta
                :respuesta="model.respuestas.ve_perimetro_abdominal"
                :pregunta="preguntasIntegrante.ve_perimetro_abdominal"
                md="6"
            />
          </v-row>
        </v-col>

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.ve_salud_medica"
            :pregunta="preguntasIntegrante.ve_salud_medica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_salud_bucal"
            :pregunta="preguntasIntegrante.ve_salud_bucal"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_profilaxis"
            :pregunta="preguntasIntegrante.ve_profilaxis"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_detartraje_supragingival"
            :pregunta="preguntasIntegrante.ve_detartraje_supragingival"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Detección temprana</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.ve_cancer_cuello_uterino_adn_vph"
            :pregunta="preguntasIntegrante.ve_cancer_cuello_uterino_adn_vph"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_cancer_cuello_uterino_adn_vph_positivo"
            :pregunta="preguntasIntegrante.ve_cancer_cuello_uterino_adn_vph_positivo"
            md="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_colposcopia_uterina"
            :pregunta="preguntasIntegrante.ve_colposcopia_uterina"
        />

        <input-pregunta
            :respuesta="model.respuestas.ve_bioscopia_uterina"
            :pregunta="preguntasIntegrante.ve_bioscopia_uterina"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_cancer_mama_mamografia"
            :pregunta="preguntasIntegrante.ve_cancer_mama_mamografia"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_cancer_mama_valoracion_clinica"
            :pregunta="preguntasIntegrante.ve_cancer_mama_valoracion_clinica"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_cancer_prostata_psa"
            :pregunta="preguntasIntegrante.ve_cancer_prostata_psa"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_cancer_prostata_rectal"
            :pregunta="preguntasIntegrante.ve_cancer_prostata_rectal"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_vasectomia"
            :pregunta="preguntasIntegrante.ve_vasectomia"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_esterilizacion_femenina"
            :pregunta="preguntasIntegrante.ve_esterilizacion_femenina"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_vias_esterilizacion"
            :pregunta="preguntasIntegrante.ve_vias_esterilizacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_vacuna_fiebre_amarilla"
            :pregunta="preguntasIntegrante.ve_vacuna_fiebre_amarilla"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_vacuna_influenza"
            :pregunta="preguntasIntegrante.ve_vacuna_influenza"
        />
        <input-pregunta
            :respuesta="model.respuestas.ve_prueba_vih"
            :pregunta="preguntasIntegrante.ve_prueba_vih"
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
  name: 'VejezIntegrante',
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
      this.vePlanifica()
      // this.juvCancerCuelloUterino()
      this.veEsterilizacionFemenina()
    },
    veEsterilizacionFemenina(){
      if (this.model.respuestas.ve_esterilizacion_femenina.model === integrante.ve_esterilizacion_femenina) {
        this.model.respuestas.ve_vias_esterilizacion.show = true
      } else {
        this.model.respuestas.ve_vias_esterilizacion.show = false
        this.model.respuestas.ve_vias_esterilizacion.model = null
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
    vePlanifica(){
      if (this.model.respuestas.ve_planifica.model === integrante.ve_planifica) {
        this.model.respuestas.ve_metodo_planifica.show = true
        this.model.respuestas.ve_desde_cuando_planifica.show = true
        this.model.respuestas.ve_razones_no_planifica.show = false
        this.model.respuestas.ve_razones_no_planifica.model = null
      } else {
        this.model.respuestas.ve_metodo_planifica.show = false
        this.model.respuestas.ve_metodo_planifica.model = null
        this.model.respuestas.ve_desde_cuando_planifica.show = false
        this.model.respuestas.ve_desde_cuando_planifica.model = null
        this.model.respuestas.ve_razones_no_planifica.show = true
      }
    }
  }
}
</script>