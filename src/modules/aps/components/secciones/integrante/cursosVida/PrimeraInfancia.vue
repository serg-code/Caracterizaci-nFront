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
          <p class="text-h7 ma-0">Valoración nutricional</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.pi_peso_al_nacer"
            :pregunta="preguntasIntegrante.pi_peso_al_nacer"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_talla_al_nacer"
            :pregunta="preguntasIntegrante.pi_talla_al_nacer"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_peso_actual"
            :pregunta="preguntasIntegrante.pi_peso_actual"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_talla_actual"
            :pregunta="preguntasIntegrante.pi_talla_actual"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_valoracion_nutricional"
            :pregunta="preguntasIntegrante.pi_valoracion_nutricional"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoracion de desarrollo</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.pi_desarrollo_lenguaje"
            :pregunta="preguntasIntegrante.pi_desarrollo_lenguaje"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_desarrollo_motora"
            :pregunta="preguntasIntegrante.pi_desarrollo_motora"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_desarrollo_conducta"
            :pregunta="preguntasIntegrante.pi_desarrollo_conducta"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_desarrollo_probelmas_visuales"
            :pregunta="preguntasIntegrante.pi_desarrollo_probelmas_visuales"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_desarrollo_problemas_auditivos"
            :pregunta="preguntasIntegrante.pi_desarrollo_problemas_auditivos"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_desparasitado"
            :pregunta="preguntasIntegrante.pi_desparasitado"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_hospitalizacion_nacer"
            :pregunta="preguntasIntegrante.pi_hospitalizacion_nacer"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Vacunación</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.pi_carnet_vacunacion"
            :pregunta="preguntasIntegrante.pi_carnet_vacunacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_bcg_rn"
            :pregunta="preguntasIntegrante.pi_vacuna_bcg_rn"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_polio_d1"
            :pregunta="preguntasIntegrante.pi_vacuna_polio_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_polio_d2"
            :pregunta="preguntasIntegrante.pi_vacuna_polio_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_polio_d3"
            :pregunta="preguntasIntegrante.pi_vacuna_polio_d3"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_polio_r1"
            :pregunta="preguntasIntegrante.pi_vacuna_polio_r1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_polio_r2"
            :pregunta="preguntasIntegrante.pi_vacuna_polio_r2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_hepatitis_a"
            :pregunta="preguntasIntegrante.pi_vacuna_hepatitis_a"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_hepatitis_b_rn"
            :pregunta="preguntasIntegrante.pi_vacuna_hepatitis_b_rn"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_influenza_estacional"
            :pregunta="preguntasIntegrante.pi_vacuna_influenza_estacional"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_neumococo_d1"
            :pregunta="preguntasIntegrante.pi_vacuna_neumococo_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_neumococo_d2"
            :pregunta="preguntasIntegrante.pi_vacuna_neumococo_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_neumococo_d3"
            :pregunta="preguntasIntegrante.pi_vacuna_neumococo_d3"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_rotavirus_d1"
            :pregunta="preguntasIntegrante.pi_vacuna_rotavirus_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_rotavirus_d2"
            :pregunta="preguntasIntegrante.pi_vacuna_rotavirus_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_fiebre_amarilla"
            :pregunta="preguntasIntegrante.pi_vacuna_fiebre_amarilla"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_dpt_d1"
            :pregunta="preguntasIntegrante.pi_vacuna_dpt_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_dpt_d2"
            :pregunta="preguntasIntegrante.pi_vacuna_dpt_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_pentavalente_d1"
            :pregunta="preguntasIntegrante.pi_vacuna_pentavalente_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_pentavalente_d2"
            :pregunta="preguntasIntegrante.pi_vacuna_pentavalente_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_pentavalente_d3"
            :pregunta="preguntasIntegrante.pi_vacuna_pentavalente_d3"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_srp_d1"
            :pregunta="preguntasIntegrante.pi_vacuna_srp_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_srp_d2"
            :pregunta="preguntasIntegrante.pi_vacuna_srp_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_vacuna_varicela"
            :pregunta="preguntasIntegrante.pi_vacuna_varicela"
            sm="6"
            md="4"
            lg="3"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.pi_atencion_medica"
            :pregunta="preguntasIntegrante.pi_atencion_medica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_atencion_enfermeria"
            :pregunta="preguntasIntegrante.pi_atencion_enfermeria"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_atencion_lactancia"
            :pregunta="preguntasIntegrante.pi_atencion_lactancia"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_tsh"
            :pregunta="preguntasIntegrante.pi_tsh"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Protección especifíca</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.pi_fluor"
            :pregunta="preguntasIntegrante.pi_fluor"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_profilaxis"
            :pregunta="preguntasIntegrante.pi_profilaxis"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_sellantes"
            :pregunta="preguntasIntegrante.pi_sellantes"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_higiene_bucal"
            :pregunta="preguntasIntegrante.pi_higiene_bucal"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_caries"
            :pregunta="preguntasIntegrante.pi_caries"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.pi_consulta_odontologica"
            :pregunta="preguntasIntegrante.pi_consulta_odontologica"
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
  name: 'PrimeraInfancia',
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
      this.piCarnetVacunacion()
    },
    piCarnetVacunacion() {
      const vacunasKey = this.keyRespuestas?.length && this.keyRespuestas.filter(x => x.includes('pi_vacuna_'))
      if (this.model.respuestas.pi_carnet_vacunacion.model === integrante.pi_carnet_vacunacion) {
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