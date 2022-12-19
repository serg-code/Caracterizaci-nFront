<template>
  <v-card>
    <v-card-title :class="editing ? '' : 'pb-0'" class="text-start">
      <v-icon large class="mr-1">mdi-account</v-icon>
      Identificación del integrante
    </v-card-title>
    <v-list
        v-if="!editing"
        class="pa-0"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ [integrante.primer_nombre, integrante.segundo_nombre, integrante.primer_apellido, integrante.segundo_apellido].filter(x => x).join(' ') }}</v-list-item-title>
          <v-list-item-subtitle>{{ [integrante.tipo_identificacion, integrante.identificacion].filter(x => x).join('') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
              fab
              color="warning"
              @click="editar"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <template v-else>
      <ValidationObserver
          ref="formIntegrante"
          slim
      >
        <v-container class="mt-4">
          <v-row v-if="model">
            <v-col cols="12" md="6">
              <input-select
                  v-model="model.tipo_identificacion"
                  :items="tiposIdentificacion"
                  item-text="tipo"
                  item-value="id"
                  name="Tipo identificación"
                  label="Tipo identificación"
                  rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.identificacion"
                  label="Identificación"
                  name="Identificación"
                  rules="required"
                  type="number"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.primer_nombre"
                  label="Primer nombre"
                  name="Primer nombre"
                  rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.segundo_nombre"
                  label="Segundo nombre"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.primer_apellido"
                  label="Primer apellido"
                  name="Primer apellido"
                  rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.segundo_apellido"
                  label="Segundo apellido"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-select
                  v-model="model.sexo"
                  :items="[{text: 'Masculino', value: 'Masculino'}, {text: 'Femenino', value: 'Femenino'}]"
                  name="Sexo"
                  label="Sexo"
                  rules="required"
                  no-radio
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-date
                  v-model="model.fecha_nacimiento"
                  name="Fecha de nacimiento"
                  label="Fecha de nacimiento"
                  rules="required"
                  birth
                  :max="moment().format('YYYY-MM-DD')"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-select
                  v-model="model.rh"
                  :items="rhs"
                  name="RH"
                  label="RH"
                  rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-select
                  v-model="model.estado_civil"
                  :items="estadosCiviles"
                  name="Estado civil"
                  label="Estado civil"
                  rules="required"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.correo"
                  label="Correo electrónico"
                  name="Correo electrónico"
                  type="email"
                  rules="email"
              />
            </v-col>
            <v-col cols="12" md="6">
              <input-text
                  v-model="model.telefono"
                  label="Celular"
                  name="Celular"
                  type="tel"
                  rules="required"
              />
            </v-col>
            <v-col cols="12">
              <input-select
                  v-model="model.cabeza_familia"
                  :items="[{text: 'SI', value: 'SI'}, {text: 'NO', value: 'NO'}]"
                  name="¿Es cabeza de familia?"
                  label="¿Es cabeza de familia?"
                  rules="required"
              />
            </v-col>
            <v-col cols="12">
              <v-divider class="mb-3"/>
              <v-card-actions class="pa-0">
                <v-spacer/>
                <v-btn text @click="cancelar(1)">
                  Cancelar
                </v-btn>
                <v-btn color="primary" @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </ValidationObserver>
    </template>
  </v-card>
</template>

<script>
import Integrante from '@/modules/aps/models/Integrante'
import APSMixin from '@/modules/aps/mixins/APSMixin'
import {mapState} from 'vuex'
export default {
  name: 'FormIntegrante',
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
    editing:{
      type:Boolean,
      default: false
    }
  },
  data:() => ({
    model: null,
    loading: false
  }),
  computed: {
    ...mapState('aps',['tiposIdentificacion', 'rhs', 'estadosCiviles'])
  },
  watch: {
    editing: {
      handler() {
        this.model = this.clone(this.integrante || Integrante)
      },
      immediate: true
    }
  },
  methods: {
    save() {
      this.$refs.formIntegrante.validate().then(async result => {
        if (result) {
          this.loading = true
          const data = this.convertirDataIntegrante(this.clone(this.value), this.clone(this.model))
          // let dataEncuesta = this.clone(this.value)
          // const copiaIntegrante = this.clone(this.model)
          // if(!copiaIntegrante.id) copiaIntegrante.id = uuid.v1()
          // copiaIntegrante.hogar_id = dataEncuesta.id
          // const indexIntegrante = dataEncuesta.integrantes.findIndex(x => x.id === copiaIntegrante.id)
          // if(indexIntegrante > -1) dataEncuesta.integrantes.splice(indexIntegrante, 1)
          // dataEncuesta.integrantes.splice(0, 0, copiaIntegrante)
          // dataEncuesta.encuesta = this.clone(dataEncuesta)
          // const dataIntegrante = this.clone(copiaIntegrante)
          data.dataIntegrante.secciones = null
          const response = await this.integranteSave({ encuesta: data.dataEncuesta.encuesta, integrante: data.dataIntegrante })
          if(response) {
            this.$emit('input', data.dataEncuesta.encuesta)
            this.$emit('update:integrante', data.copiaIntegrante)
            this.cancelar()
          }
          this.loading = false
        }
      })
    },
    editar() {
      this.$emit('update:editing', true)
    },
    cancelar(close) {
      if(close === 1 && !this.model.id) this.$emit('closeModal')
      else this.$emit('update:editing', false)
      this.$refs.formIntegrante.reset()
      setTimeout(() => {
        this.model = null
      }, 500)
    }
  }
}
</script>