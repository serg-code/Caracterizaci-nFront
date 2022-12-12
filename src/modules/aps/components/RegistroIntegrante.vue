<template>
  <v-dialog
      v-model="dialogModal"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-toolbar-title>{{ model && model.id ? 'Edición de ' : 'Nuevo ' }}integrante</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
            dark
            @click="dialogModal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <ValidationObserver
            v-if="model"
            ref="formEncuestaIntegrante"
            slim
        >
          <form-integrante
              v-model="vmodel"
              :integrante.sync="model"
              :editing.sync="editing"
              @closeModal="cancelar"
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
      </v-container>
      <global-loading :value="loading" absolute/>
    </v-card>
  </v-dialog>
</template>

<script>
import APSMixin from '@/modules/aps/mixins/APSMixin'
import Integrante from '@/modules/aps/models/Integrante'
import FormIntegrante from '@/modules/aps/components/FormIntegrante'
import IntegranteAccidentes from '@/modules/aps/components/secciones/integrante/IntegranteAccidentes'
import CuidadosDomiciliarios from '@/modules/aps/components/secciones/integrante/CuidadosDomiciliarios'
import CuidadosEnfermedades from '@/modules/aps/components/secciones/integrante/CuidadosEnfermedades'
import NavegacionEncuesta from '@/modules/aps/components/NavegacionEncuesta'
export default {
  name: 'RegistroIntegrante',
  components: {FormIntegrante, NavegacionEncuesta, IntegranteAccidentes, CuidadosDomiciliarios, CuidadosEnfermedades},
  mixins: [APSMixin],
  props: {
    value:{
      type:Object,
      default: null
    },
    integrante:{
      type:Object,
      default: null
    },
    dialog:{
      type:Boolean,
      default: false
    }
  },
  data:() => ({
    step: 1,
    loading: false,
    editing: true,
    model: null,
  }),
  watch: {
    dialogModal: {
      handler(val) {
        if(val) this.assignIntegrante()
      },
      immediate: false
    }
  },
  computed: {
    dialogModal: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('update:dialog', val)
      },
    },
    vmodel: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    seccionesHabilitadas() {
      return this.model?.secciones ? Object.values(this.model.secciones).filter(x => x.show) : []
    }
  },
  methods: {
    assignIntegrante(){
      this.loading = true
      this.model = this.clone(this.integrante || Integrante)
      this.editing = !this.model.id
      this.loading = false
    },
    async guardarEncuesta() {
      this.loading = true
      let dataEncuesta = this.clone(this.vmodel)
      const copiaIntegrante = this.clone(this.model)
      const indexIntegrante = dataEncuesta.integrantes.findIndex(x => x.id === copiaIntegrante.id)
      if(indexIntegrante > -1) dataEncuesta.integrantes.splice(indexIntegrante, 1)
      dataEncuesta.integrantes.splice(0, 0, copiaIntegrante)
      dataEncuesta.encuesta = this.clone(dataEncuesta)
      const dataIntegrante = this.clone(copiaIntegrante)

      const response = await this.integranteSave({integrante: dataIntegrante, encuesta: dataEncuesta.encuesta})
      if(response) this.vmodel = dataEncuesta.encuesta
      this.loading = false
    },
    guardarEncuestaFull() {
      this.$refs.formEncuestaIntegrante.validate().then(async result => {
        if (result) {
          this.loading = true
          let dataEncuesta = this.clone(this.vmodel)
          const copiaIntegrante = this.clone(this.model)
          const indexIntegrante = dataEncuesta.integrantes.findIndex(x => x.id === copiaIntegrante.id)
          if(indexIntegrante > -1) dataEncuesta.integrantes.splice(indexIntegrante, 1)
          dataEncuesta.integrantes.splice(0, 0, copiaIntegrante)
          dataEncuesta.encuesta = this.clone(dataEncuesta)
          const dataIntegrante = this.clone(copiaIntegrante)

          const response = await this.integranteSaveFull({integrante: dataIntegrante, encuesta: dataEncuesta.encuesta})
          if(response) {
            this.vmodel = dataEncuesta.encuesta
            this.cancelar()
          }
          this.loading = false
        }
      })
    },
    guardarSeccion(seccion) {
      this.$refs[seccion][0].validate().then(async result => {
        if (result) {
          this.loading = true
          let dataEncuesta = this.clone(this.vmodel)
          const copiaIntegrante = this.clone(this.model)
          const indexIntegrante = dataEncuesta.integrantes.findIndex(x => x.id === copiaIntegrante.id)
          if(indexIntegrante > -1) dataEncuesta.integrantes.splice(indexIntegrante, 1)
          dataEncuesta.integrantes.splice(0, 0, copiaIntegrante)
          dataEncuesta.encuesta = this.clone(dataEncuesta)
          const dataIntegrante = this.clone(copiaIntegrante)

          const response = await this.integranteSave({integrante: dataIntegrante, encuesta: dataEncuesta.encuesta})
          if(response) {
            this.vmodel = dataEncuesta.encuesta
            this.step++
          }
          this.loading = false
        }
        else {
          this.$store.commit('snackbar/set', { color:'warning', message: 'Hay preguntas por diligenciar.' })
        }
      })
    },
    validaLogica() {
      // this.model.secciones.factores_protectores.respuestas.tipo_familia.show = this.model.secciones.factores_protectores.respuestas.problemas_consumo_alcoholicas.model === 4
    },
    cancelar() {
      this.$emit('update:dialog', false)
      setTimeout(() => {
        this.model = null
        this.$refs.formEncuestaIntegrante.reset()
      }, 500)
    }
  }
}
</script>