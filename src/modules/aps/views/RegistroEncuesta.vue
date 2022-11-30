<template>
  <v-container>
    <view-title/>
    <ValidationObserver
        ref="formEncuesta"
        slim
    >
      <form-hogar
          v-model="model.hogar"
          :editing.sync="model.editing"
      />
      <v-window
          v-if="!model.editing"
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
              />
            </ValidationObserver>
          </v-window-item>
        </template>
      </v-window>
    </ValidationObserver>
  </v-container>
</template>

<script>
import FactoresProtectores from '@/modules/aps/components/secciones/FactoresProtectores'
import HabitosConsumo from '@/modules/aps/components/secciones/HabitosConsumo'
import Hogar from '@/modules/aps/models/Hogar'
import NavegacionEncuesta from '@/modules/aps/components/NavegacionEncuesta'
import FormHogar from "@/modules/aps/components/FormHogar";

export default {
  name: 'RegistroEncuesta',
  components: {FormHogar, NavegacionEncuesta, FactoresProtectores, HabitosConsumo},
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    step: 1,
    model: {
      editing: true,
      hogar: null
    }
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
      return Object.values(this.model.hogar.secciones).filter(x => x.show)
    }
  },
  created() {
    this.model.hogar = this.clone(Hogar)
    this.getPreguntas()
  },
  methods: {
    async getPreguntas() {
      await this.$store.dispatch('aps/getPreguntas')
    },
    guardarEncuesta() {
      const copia = this.clone(this.model)
      copia.hogar.secciones = Object.values(copia.hogar.secciones)
      copia.hogar.secciones.forEach(x => {
        Object.entries(x.respuestas).map(z => {
          x.respuestas[z[0]] = z[1].model
        })
      })
      console.log('guardar Encuesta Final', copia)
      this.$refs.formEncuesta.validate().then(result => {
        if (result) {
          this.loading = true
          this.axios.post('respuestas', copia)
              .then(() => {
                this.$router.replace(`/aps/resultado-encuesta/${copia.hogar.id}`)
              })
              .catch(error => {
                this.$store.commit('snackbar/setError', {error})
              })
          .finally(() => { this.loading = false })
        }
      })
    },
    guardarSeccion(seccion) {
      this.$refs[seccion][0].validate().then(result => {
        if (result) {
          console.log('fffff', result)
          this.step++
        }
        else {
          this.step++
          this.$store.commit('snackbar/set', { color:'warning', message: 'Hay preguntas por diligenciar.' })
        }
      })
    },
    validaLogica() {
      // this.model.hogar.secciones.factores_protectores.respuestas.tipo_familia.show = this.model.hogar.secciones.factores_protectores.respuestas.problemas_consumo_alcoholicas.model === 4
    }
  }
}
</script>
