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
        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Detección temprana</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.juv_cancer_cuello_uterino"
            :pregunta="preguntasIntegrante.juv_cancer_cuello_uterino"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_colposcopia"
            :pregunta="preguntasIntegrante.juv_colposcopia"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_bioscopia_cervico"
            :pregunta="preguntasIntegrante.juv_bioscopia_cervico"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_examen_seno"
            :pregunta="preguntasIntegrante.juv_examen_seno"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_planifica"
            :pregunta="preguntasIntegrante.juv_planifica"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_metodo_planifica"
            :pregunta="preguntasIntegrante.juv_metodo_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_tiempo_metodo"
            :pregunta="preguntasIntegrante.juv_tiempo_metodo"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_razones_no_planifica"
            :pregunta="preguntasIntegrante.juv_razones_no_planifica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_asesoria_anticoncepcion"
            :pregunta="preguntasIntegrante.juv_asesoria_anticoncepcion"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_parejas_sexuales_al_anio"
            :pregunta="preguntasIntegrante.juv_parejas_sexuales_al_anio"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.juv_atencion_medica"
            :pregunta="preguntasIntegrante.juv_atencion_medica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_atencion_enfermeria"
            :pregunta="preguntasIntegrante.juv_atencion_enfermeria"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_salud_vocal"
            :pregunta="preguntasIntegrante.juv_salud_vocal"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Protección específica</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.juv_vasectomia"
            :pregunta="preguntasIntegrante.juv_vasectomia"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.adol_profilaxis"
            :pregunta="preguntasIntegrante.adol_profilaxis"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_esterilizacion_femenina"
            :pregunta="preguntasIntegrante.juv_esterilizacion_femenina"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_vias_esterilizacion"
            :pregunta="preguntasIntegrante.juv_vias_esterilizacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_profilaxis"
            :pregunta="preguntasIntegrante.juv_profilaxis"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_detartraje_supragingival"
            :pregunta="preguntasIntegrante.juv_detartraje_supragingival"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_prueba_vih"
            :pregunta="preguntasIntegrante.juv_prueba_vih"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_antecedentes_diabetes"
            :pregunta="preguntasIntegrante.juv_antecedentes_diabetes"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_antecedentes_hipertension"
            :pregunta="preguntasIntegrante.juv_antecedentes_hipertension"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_alteracion_colesterol"
            :pregunta="preguntasIntegrante.juv_alteracion_colesterol"
        />
        <input-pregunta
            :respuesta="model.respuestas.juv_perimetro_abdominal"
            :pregunta="preguntasIntegrante.juv_perimetro_abdominal"
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
  name: 'JuventudIntegrante',
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
      this.juvPlanifica()
      this.juvCancerCuelloUterino()
      this.juvEsterilizacionFemenina()
    },
    juvEsterilizacionFemenina(){
      if (this.model.respuestas.juv_esterilizacion_femenina.model === integrante.juv_esterilizacion_femenina) {
        this.model.respuestas.juv_vias_esterilizacion.show = true
      } else {
        this.model.respuestas.juv_vias_esterilizacion.show = false
        this.model.respuestas.juv_vias_esterilizacion.model = null
      }
    },
    juvCancerCuelloUterino(){
      if (this.model.respuestas.juv_cancer_cuello_uterino.model === integrante.juv_cancer_cuello_uterino) {
        this.model.respuestas.juv_colposcopia.show = true
        this.model.respuestas.juv_bioscopia_cervico.show = true
      } else {
        this.model.respuestas.juv_colposcopia.show = false
        this.model.respuestas.juv_colposcopia.model = null
        this.model.respuestas.juv_bioscopia_cervico.show = false
        this.model.respuestas.juv_bioscopia_cervico.model = null
      }
    },
    juvPlanifica(){
      if (this.model.respuestas.juv_planifica.model === integrante.juv_planifica) {
        this.model.respuestas.juv_metodo_planifica.show = true
        this.model.respuestas.juv_tiempo_metodo.show = true
        this.model.respuestas.juv_razones_no_planifica.show = false
        this.model.respuestas.juv_razones_no_planifica.model = null
      } else {
        this.model.respuestas.juv_metodo_planifica.show = false
        this.model.respuestas.juv_metodo_planifica.model = null
        this.model.respuestas.juv_tiempo_metodo.show = false
        this.model.respuestas.juv_tiempo_metodo.model = null
        this.model.respuestas.juv_razones_no_planifica.show = true
      }
    }
  }
}
</script>