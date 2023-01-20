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
            :respuesta="model.respuestas.ma_aceptacion_embarazo"
            :pregunta="preguntasIntegrante.ma_aceptacion_embarazo"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_fecha_control_prenatal"
            :pregunta="preguntasIntegrante.ma_fecha_control_prenatal"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_fecha_ultima_regla"
            :pregunta="preguntasIntegrante.ma_fecha_ultima_regla"
            :max="moment().format('YYYY-MM-DD')"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_fecha_parto"
            :pregunta="preguntasIntegrante.ma_fecha_parto"
            :min="moment().format('YYYY-MM-DD')"
            readonly
            :clearable="false"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_ganancia_peso"
            :pregunta="preguntasIntegrante.ma_ganancia_peso"
            decimal
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_gestacion"
            :pregunta="preguntasIntegrante.ma_gestacion"
            readonly
            :clearable="false"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_carnet"
            :pregunta="preguntasIntegrante.ma_carnet"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_prenatal_mensual"
            :pregunta="preguntasIntegrante.ma_prenatal_mensual"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_examen_serologia_1_trimestre"
            :pregunta="preguntasIntegrante.ma_examen_serologia_1_trimestre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_examen_serologia_2_trimestre"
            :pregunta="preguntasIntegrante.ma_examen_serologia_2_trimestre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_examen_serologia_3_trimestre"
            :pregunta="preguntasIntegrante.ma_examen_serologia_3_trimestre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_examen_vih_1_trimestre"
            :pregunta="preguntasIntegrante.ma_examen_vih_1_trimestre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_examen_vih_2_trimestre"
            :pregunta="preguntasIntegrante.ma_examen_vih_2_trimestre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_examen_vih_3_trimestre"
            :pregunta="preguntasIntegrante.ma_examen_vih_3_trimestre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_odontologico"
            :pregunta="preguntasIntegrante.ma_odontologico"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_suplementacion"
            :pregunta="preguntasIntegrante.ma_suplementacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_sedentarismo"
            :pregunta="preguntasIntegrante.ma_sedentarismo"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_bebidas_alcoholicas"
            :pregunta="preguntasIntegrante.ma_bebidas_alcoholicas"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_fecha_ultimo_parto"
            :pregunta="preguntasIntegrante.ma_fecha_ultimo_parto"
            :max="moment().format('YYYY-MM-DD')"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_depresion_postparto"
            :pregunta="preguntasIntegrante.ma_depresion_postparto"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_institucional"
            :pregunta="preguntasIntegrante.ma_atencion_institucional"
        />
        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Morbilidad: Gestaciòn, parto, postparto</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.ma_aborto_no_especificado"
            :pregunta="preguntasIntegrante.ma_aborto_no_especificado"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemorragia_precoz"
            :pregunta="preguntasIntegrante.ma_hemorragia_precoz"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemorragia_anteparto"
            :pregunta="preguntasIntegrante.ma_hemorragia_anteparto"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hipertension"
            :pregunta="preguntasIntegrante.ma_hipertension"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_vomitos"
            :pregunta="preguntasIntegrante.ma_vomitos"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_madre"
            :pregunta="preguntasIntegrante.ma_atencion_madre"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_diabetes_mellitus"
            :pregunta="preguntasIntegrante.ma_diabetes_mellitus"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hallazgo_anormal"
            :pregunta="preguntasIntegrante.ma_hallazgo_anormal"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_parto_unico"
            :pregunta="preguntasIntegrante.ma_parto_unico"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_parto_complicado"
            :pregunta="preguntasIntegrante.ma_parto_complicado"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemorragia_postparto"
            :pregunta="preguntasIntegrante.ma_hemorragia_postparto"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_parto_cesarea"
            :pregunta="preguntasIntegrante.ma_parto_cesarea"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_otras_complicaciones_parto"
            :pregunta="preguntasIntegrante.ma_otras_complicaciones_parto"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_otras_complicaciones_purperio"
            :pregunta="preguntasIntegrante.ma_otras_complicaciones_purperio"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hospitalizacion_sifilis"
            :pregunta="preguntasIntegrante.ma_hospitalizacion_sifilis"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_edad_gestacional"
            :pregunta="preguntasIntegrante.ma_edad_gestacional"
            sm="6"
            md="4"
            xl="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_plan_canguro"
            :pregunta="preguntasIntegrante.ma_plan_canguro"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_curso_maternidad_paternidad"
            :pregunta="preguntasIntegrante.ma_curso_maternidad_paternidad"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>

        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_medica"
            :pregunta="preguntasIntegrante.ma_atencion_medica"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_enfermeria"
            :pregunta="preguntasIntegrante.ma_atencion_enfermeria"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_odontologica"
            :pregunta="preguntasIntegrante.ma_atencion_odontologica"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Detección temprana</p>
        </v-col>

        <input-pregunta
            :respuesta="model.respuestas.ma_antigeno_hepatitis_b"
            :pregunta="preguntasIntegrante.ma_antigeno_hepatitis_b"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_cancer_cuello_uterino"
            :pregunta="preguntasIntegrante.ma_cancer_cuello_uterino"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_glicemia_ayuna"
            :pregunta="preguntasIntegrante.ma_glicemia_ayuna"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemoclasificacion"
            :pregunta="preguntasIntegrante.ma_hemoclasificacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemograma"
            :pregunta="preguntasIntegrante.ma_hemograma"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemoparasitos_chagas"
            :pregunta="preguntasIntegrante.ma_hemoparasitos_chagas"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_toxoplasma"
            :pregunta="preguntasIntegrante.ma_toxoplasma"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_rubeola"
            :pregunta="preguntasIntegrante.ma_rubeola"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_varicela"
            :pregunta="preguntasIntegrante.ma_varicela"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_prueba_treponemica_sifilis"
            :pregunta="preguntasIntegrante.ma_prueba_treponemica_sifilis"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_urocultivo"
            :pregunta="preguntasIntegrante.ma_urocultivo"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_prueba_vih"
            :pregunta="preguntasIntegrante.ma_prueba_vih"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_espermograma"
            :pregunta="preguntasIntegrante.ma_espermograma"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_citologia"
            :pregunta="preguntasIntegrante.ma_citologia"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_elisa"
            :pregunta="preguntasIntegrante.ma_elisa"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_micronutrientes"
            :pregunta="preguntasIntegrante.ma_micronutrientes"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_prenatal_medica_general"
            :pregunta="preguntasIntegrante.ma_atencion_prenatal_medica_general"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_prenatal_enfermeria"
            :pregunta="preguntasIntegrante.ma_atencion_prenatal_enfermeria"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_prenatal_medica_obstetra"
            :pregunta="preguntasIntegrante.ma_atencion_prenatal_medica_obstetra"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_prenatal_consulta_nutricion"
            :pregunta="preguntasIntegrante.ma_atencion_prenatal_consulta_nutricion"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_vacunacion_toxoide"
            :pregunta="preguntasIntegrante.ma_vacunacion_toxoide"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_vacunacion_difteria"
            :pregunta="preguntasIntegrante.ma_vacunacion_difteria"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_vacunacion_tosferina"
            :pregunta="preguntasIntegrante.ma_vacunacion_tosferina"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_vacunacion_influenza"
            :pregunta="preguntasIntegrante.ma_vacunacion_influenza"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_ecografia_obstetrica"
            :pregunta="preguntasIntegrante.ma_ecografia_obstetrica"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_ecografia_anatomico"
            :pregunta="preguntasIntegrante.ma_ecografia_anatomico"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Protección específica</p>
        </v-col>

        <input-pregunta
            :respuesta="model.respuestas.ma_interrupcion_voluntaria_embarazo"
            :pregunta="preguntasIntegrante.ma_interrupcion_voluntaria_embarazo"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_asesoria_anticonceptiva_ive"
            :pregunta="preguntasIntegrante.ma_asesoria_anticonceptiva_ive"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_purperio"
            :pregunta="preguntasIntegrante.ma_atencion_purperio"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_pediatria"
            :pregunta="preguntasIntegrante.ma_atencion_pediatria"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_atencion_recien_nacido"
            :pregunta="preguntasIntegrante.ma_atencion_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemograma_recien_nacido"
            :pregunta="preguntasIntegrante.ma_hemograma_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_hemoclasificacion_recien_nacido"
            :pregunta="preguntasIntegrante.ma_hemoclasificacion_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_sifilis_recien_nacido"
            :pregunta="preguntasIntegrante.ma_sifilis_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_vih_recien_nacido"
            :pregunta="preguntasIntegrante.ma_vih_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_chagas_recien_nacido"
            :pregunta="preguntasIntegrante.ma_chagas_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_tsh_recien_nacido"
            :pregunta="preguntasIntegrante.ma_tsh_recien_nacido"
        />
        <input-pregunta
            :respuesta="model.respuestas.ma_tamizaje_genetico_recien_nacido"
            :pregunta="preguntasIntegrante.ma_tamizaje_genetico_recien_nacido"
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
  name: 'MaternoPerinatal',
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
      this.maFechaUltimaRegla()
      this.maGestacion()
      this.maHemoparasitosChagas()
    },
    maHemoparasitosChagas(){
      if(this.model.respuestas.ma_hemoparasitos_chagas.model === integrante.ma_hemoparasitos_chagas) {
        this.model.respuestas.ma_chagas_recien_nacido.show = true
      } else {
        this.model.respuestas.ma_chagas_recien_nacido.show = false
        this.model.respuestas.ma_chagas_recien_nacido.model = null
      }
    },
    maGestacion(){
      if(this.model.respuestas.ma_gestacion.model >= 12) {
        this.model.respuestas.ma_examen_serologia_1_trimestre.show = true
        this.model.respuestas.ma_examen_vih_1_trimestre.show = true
      } else {
        this.model.respuestas.ma_examen_serologia_1_trimestre.show = false
        this.model.respuestas.ma_examen_serologia_1_trimestre.model = null
        this.model.respuestas.ma_examen_vih_1_trimestre.show = false
        this.model.respuestas.ma_examen_vih_1_trimestre.model = null
      }

      if(this.model.respuestas.ma_gestacion.model >= 24) {
        this.model.respuestas.ma_examen_serologia_2_trimestre.show = true
        this.model.respuestas.ma_examen_vih_2_trimestre.show = true
      } else {
        this.model.respuestas.ma_examen_serologia_2_trimestre.show = false
        this.model.respuestas.ma_examen_serologia_2_trimestre.model = null
        this.model.respuestas.ma_examen_vih_2_trimestre.show = false
        this.model.respuestas.ma_examen_vih_2_trimestre.model = null
      }

      if(this.model.respuestas.ma_gestacion.model >= 36) {
        this.model.respuestas.ma_examen_serologia_3_trimestre.show = true
        this.model.respuestas.ma_examen_vih_3_trimestre.show = true
      } else {
        this.model.respuestas.ma_examen_serologia_3_trimestre.show = false
        this.model.respuestas.ma_examen_serologia_3_trimestre.model = null
        this.model.respuestas.ma_examen_vih_3_trimestre.show = false
        this.model.respuestas.ma_examen_vih_3_trimestre.model = null
      }
    },
    maFechaUltimaRegla(){
      if (this.model.respuestas.ma_fecha_ultima_regla.model) {
        const diasGestacion = (7 * 40) + 10
        this.model.respuestas.ma_fecha_parto.model =  this.moment(this.model.respuestas.ma_fecha_ultima_regla.model, 'YYYY-MM-DD').add(diasGestacion, 'd').format('YYYY-MM-DD')
        const fecha1 = this.moment(this.model.respuestas.ma_fecha_ultima_regla.model, 'YYYY-MM-DD').add(10, 'd')
        const fecha2 = this.moment()
        const diff = fecha2.diff(fecha1, 'weeks')
        this.model.respuestas.ma_gestacion.model = diff > 0 ? diff : 0
      } else {
        this.model.respuestas.ma_fecha_parto.model = null
        this.model.respuestas.ma_gestacion.model = null
      }
    }
  }
}
</script>