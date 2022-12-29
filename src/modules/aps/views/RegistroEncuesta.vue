<template>
  <v-container>
    <view-title/>
    <ValidationObserver
        v-if="model"
        ref="formEncuesta"
        slim
    >
      <form-hogar
          v-model="model"
          :editing.sync="editing"
      />
      <integrantes-list
          v-model="model"
          class="my-4"
      />
      <v-window
          v-if="!editing"
          v-model="step"
          class="pa-1"
      >
        <template v-for="(seccion, indexSeccion) in seccionesHabilitadas">
          <v-window-item
              v-if="seccion.show"
              :value="indexSeccion + 1"
              :key="`${seccion.ref_seccion}Seccion${indexSeccion}`"
              :id="`${seccion.ref_seccion}Seccion${indexSeccion}`"
          >
            <ValidationObserver
                :ref="`${seccion.ref_seccion}Seccion${indexSeccion}`"
                slim
            >
              <component
                  :is="seccion.component"
                  :seccion="seccion"
                  style="margin-bottom: 60px !important;"
              />
              <navegacion-encuesta
                  style="position: fixed;"
                  :disabled-prev="step === 1"
                  :next-btn="step !== seccionesHabilitadas.length"
                  :save-btn="step === seccionesHabilitadas.length"
                  @clickPrev="step--"
                  @clickNext="guardarSeccion(`${seccion.ref_seccion}Seccion${indexSeccion}`)"
                  @clickSave="guardarEncuesta"
                  @clickFullSave="guardarEncuestaFull"
              />
            </ValidationObserver>
          </v-window-item>
        </template>
      </v-window>
    </ValidationObserver>
    <global-loading :value="loading" absolute/>
  </v-container>
</template>

<script>
import Hogar from '@/modules/aps/models/Hogar'
import FormHogar from '@/modules/aps/components/FormHogar'
import ViviendaHogar from '@/modules/aps/components/secciones/ViviendaHogar'
import AnimalesHogar from '@/modules/aps/components/secciones/AnimalesHogar'
import FactoresProtectores from '@/modules/aps/components/secciones/FactoresProtectores'
import HabitosConsumo from '@/modules/aps/components/secciones/HabitosConsumo'
import SeguridadAlimentaria from '@/modules/aps/components/secciones/SeguridadAlimentaria'
import MortalidadHogar from '@/modules/aps/components/secciones/MortalidadHogar'
import NavegacionEncuesta from '@/modules/aps/components/NavegacionEncuesta'
import IntegrantesList from '@/modules/aps/components/IntegrantesList'
import APSMixin from '@/modules/aps/mixins/APSMixin'

export default {
  name: 'RegistroEncuesta',
  mixins:[APSMixin],
  components: {
    FormHogar,
    ViviendaHogar,
    AnimalesHogar,
    FactoresProtectores,
    HabitosConsumo,
    SeguridadAlimentaria,
    MortalidadHogar,
    NavegacionEncuesta,
    IntegrantesList
  },
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    step: 1,
    loading: false,
    editing: true,
    model: null,
  }),
  watch: {
    model: {
      handler() {
        this.validaLogica()
      },
      immediate: false,
      deep: true
    }
  },
  computed: {
    seccionesHabilitadas() {
      return this.model?.secciones ? Object.values(this.model.secciones).filter(x => x.show) : []
    }
  },
  created() {
    this.getEncuesta()
    this.getComplementos()
  },
  methods: {
    async getEncuesta(){
      this.loading = true
      this.model = this.uuid ? await this.encuestaGet(this.uuid) : this.clone(Hogar)
      this.editing = !this.uuid
      this.loading = false
    },
    async getComplementos() {
      await this.$store.dispatch('aps/getPreguntas')
      await this.$store.dispatch('aps/getTiposIdentificacion')
    },
    async guardarEncuesta() {
      this.loading = true
      this.model.encuesta = this.clone(this.model)
      const copia = this.clone(this.model)
      await this.encuestaSave({hogar: copia})
      this.loading = false
    },
    guardarEncuestaFull() {
      this.$refs.formEncuesta.validate().then(async result => {
        if (result) {
          this.loading = true
          this.model.encuesta = this.clone(this.model)
          const copia = this.clone(this.model)
          const response = await this.encuestaSaveFull({hogar: copia})
          if(response) this.$router.replace(`/aps/resultado-encuesta/${copia.id}`)
          this.loading = false
        }
      })
    },
    guardarSeccion(seccion) {
      this.$refs[seccion][0].validate().then(async result => {
        if (result) {
          this.loading = true
          this.model.encuesta = this.clone(this.model)
          // const copia = this.clone(this.model)
          // const response = await this.encuestaSave({hogar: copia})
          // if(response) this.step++
          this.step++
          this.loading = false
        }
        else {
          this.$store.commit('snackbar/set', { color:'warning', message: 'Hay preguntas por diligenciar.' })
        }
      })
    },
    validaLogica() {
      // this.model.secciones.factores_protectores.respuestas.tipo_familia.show = this.hogar.secciones.factores_protectores.respuestas.problemas_consumo_alcoholicas.model === 4
    }
  }
}
</script>
