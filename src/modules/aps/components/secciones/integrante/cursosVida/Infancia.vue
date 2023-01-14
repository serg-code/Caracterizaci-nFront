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
            :respuesta="model.respuestas.in_peso"
            :pregunta="preguntasIntegrante.in_peso"
            type="number"
            decimal
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_talla"
            :pregunta="preguntasIntegrante.in_talla"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoracion de desarrollo</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.in_desarrollo_lenguaje"
            :pregunta="preguntasIntegrante.in_desarrollo_lenguaje"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_desarrollo_motora"
            :pregunta="preguntasIntegrante.in_desarrollo_motora"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_desarrollo_conducta"
            :pregunta="preguntasIntegrante.in_desarrollo_conducta"
            sm="4"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_desarrollo_probelmas_visuales"
            :pregunta="preguntasIntegrante.in_desarrollo_probelmas_visuales"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_desarrollo_problemas_auditivos"
            :pregunta="preguntasIntegrante.in_desarrollo_problemas_auditivos"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_desparasitado"
            :pregunta="preguntasIntegrante.in_desparasitado"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Vacunación</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.in_carnet_vacunacion"
            :pregunta="preguntasIntegrante.in_carnet_vacunacion"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_dpt_r2"
            :pregunta="preguntasIntegrante.in_vacuna_dpt_r2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_polio_r2"
            :pregunta="preguntasIntegrante.in_vacuna_polio_r2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_srp_r1"
            :pregunta="preguntasIntegrante.in_vacuna_srp_r1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_fiebre_amarilla"
            :pregunta="preguntasIntegrante.in_vacuna_fiebre_amarilla"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_vph_d1"
            :pregunta="preguntasIntegrante.in_vacuna_vph_d1"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_vph_d2"
            :pregunta="preguntasIntegrante.in_vacuna_vph_d2"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_vacuna_vph_d3"
            :pregunta="preguntasIntegrante.in_vacuna_vph_d3"
            sm="6"
            md="4"
            lg="3"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Valoración integral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.in_atencion_medica"
            :pregunta="preguntasIntegrante.in_atencion_medica"
            sm="6"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_atencion_enfermeria"
            :pregunta="preguntasIntegrante.in_atencion_enfermeria"
            sm="6"
        />

        <v-col cols="12" class="pb-0">
          <p class="text-h7 ma-0">Salud oral</p>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.in_caries"
            :pregunta="preguntasIntegrante.in_caries"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_consulta_odontologica"
            :pregunta="preguntasIntegrante.in_consulta_odontologica"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_uso_seda_dental"
            :pregunta="preguntasIntegrante.in_uso_seda_dental"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_fluor"
            :pregunta="preguntasIntegrante.in_fluor"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_profilaxis"
            :pregunta="preguntasIntegrante.in_profilaxis"
            sm="6"
            md="4"
            lg="3"
        />
        <input-pregunta
            :respuesta="model.respuestas.in_sellantes"
            :pregunta="preguntasIntegrante.in_sellantes"
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
  name: 'InfanciaIntegrante',
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
      this.inCarnetVacunacion()
    },
    inCarnetVacunacion() {
      const vacunasKey = this.keyRespuestas?.length && this.keyRespuestas.filter(x => x.includes('in_vacuna_'))
      if (this.model.respuestas.in_carnet_vacunacion.model === integrante.in_carnet_vacunacion) {
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