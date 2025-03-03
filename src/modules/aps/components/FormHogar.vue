<template>
<v-card>
  <v-card-title :class="editing ? '' : 'pb-0'">
    <v-icon large class="mr-1">mdi-home</v-icon>
    Identificación del Hogar
  </v-card-title>
  <v-list
      v-if="!editing"
      class="pa-0"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{ value.direccion }}</v-list-item-title>
        <v-list-item-subtitle>{{ [value.municipioObj && value.municipioObj.nombre, value.departamentoObj && value.departamentoObj.nombre].filter(x => x).join(', ') }}</v-list-item-subtitle>
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
        ref="formHogar"
        slim
    >
      <v-container v-if="model">
        <v-row>
          <v-col cols="12" md="6">
            <input-select
                v-model="model.cod_dpto"
                :items="departamentos"
                item-text="nombre"
                item-value="codigo_dane"
                name="Departamento"
                label="Departamento"
                rules="required"
                @inputObject="val => model.departamentoObj = val"
                @change="changeDepartamento"
            />
          </v-col>
          <v-col cols="12" md="6">
            <input-select
                v-model="model.cod_mun"
                :items="municipiosHogar"
                :disabled="!model.cod_dpto"
                item-text="nombre"
                item-value="codigo_dane"
                name="Municipio"
                label="Municipio"
                rules="required"
                no-radio
                @inputObject="val => model.municipioObj = val"
                @change="changeMunicipio"
            />
          </v-col>
          <v-col cols="12" md="6">
            <input-select
                v-model="model.zona"
                :items="zonas"
                :disabled="!model.cod_mun"
                name="Zona"
                label="Zona"
                rules="required"
                no-radio
                @change="changeZona"
            />
          </v-col>
          <v-col cols="12" md="6">
            <search-barrios
                v-model="model.barrio_vereda_id"
                :disabled="!model.zona"
                :municipio="model.cod_mun"
                :zona="model.zona"
                item-text="nombre"
                item-value="id"
                name="Barrio"
                label="Barrio"
                rules="required"
            />
          </v-col>
          <v-col cols="12">
            <input-text
                v-model="model.direccion"
                label="Dirección"
                name="Dirección"
                rules="required"
            />
          </v-col>
          <v-col cols="12" v-if="isMovil">
            <input-geolocation
                v-model="model.geolocalizacion"
                label="Geolocalización"
                name="Geolocalización"
                :readonly="true"
                rules="required"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch
                v-model="model.realizo_encuesta"
                inset
                :false-value="0"
                :true-value="1"
                class="ma-0 mt-1"
                label="Realiza encuesta"
                hide-details
                @change="changeRealiza"
            />
          </v-col>
          <v-col
              v-if="!model.realizo_encuesta"
              cols="12"
              md="8"
          >
            <input-select
                v-model="model.motivos"
                :items="motivos_no_responde"
                item-text="motivos"
                item-value="id"
                name="Motivo no responde"
                label="Motivo no responde"
                no-radio
                rules="required"
                @inputObject="val => model.motivosObj = val"
            />
          </v-col>
        </v-row>
      </v-container>
    </ValidationObserver>
    <v-card-actions>
      <v-spacer/>
      <v-btn text @click="cancelar(1)">
        Cancelar
      </v-btn>
      <v-btn color="primary" @click="save">
        Guardar
      </v-btn>
    </v-card-actions>
  </template>
  <global-loading :value="loading" absolute/>
</v-card>
</template>

<script>
import {mapState} from 'vuex'
import InputGeolocation from '@/components/input/InputGeolocation'
import APSMixin from '@/modules/aps/mixins/APSMixin'
import {uuid} from 'vue-uuid'
import SearchBarrios from '@/modules/aps/components/input/SearchBarrios'

export default {
  name: 'FormHogar',
  mixins:[APSMixin],
  components: {SearchBarrios, InputGeolocation},
  props: {
    value: {
      type:Object,
      default: null
    },
    editing: {
      type:Boolean,
      default: false
    }
  },
  data:() => ({
    model: null,
    loading: false
  }),
  computed: {
    ...mapState('aps',['departamentos', 'municipios', 'zonas', 'motivos_no_responde']),
    municipiosHogar() {
      return (this.model?.cod_dpto && this.municipios?.length && this.municipios.filter(x => x.codigo_departamento === this.model.cod_dpto)) || []
    }
  },
  watch: {
    editing: {
      handler() {
        this.model = this.clone(this.value)
      },
      immediate: true
    }
  },
  methods: {
    save() {
      this.$refs.formHogar.validate().then(async result => {
        if (result) {
          this.loading = true
          const copy = this.clone(this.model)
          if(!copy.id) copy.id = uuid.v1()
          copy.encuesta = JSON.stringify(this.clone(copy))
          const data = this.clone(copy)
          data.secciones = null
          const response = await this.encuestaSave({hogar: data})
          this.loading = false
          if(response) {
            this.$emit('input', copy)
            this.cancelar(copy.id)
          }
        }
      })
    },
    changeDepartamento() {
      this.model.cod_mun = null
      this.model.zona = null
      this.model.barrio_vereda_id = null
    },
    changeMunicipio() {
      this.model.zona = null
      this.model.barrio_vereda_id = null
    },
    changeZona() {
      this.model.barrio_vereda_id = null
    },
    changeRealiza() {
      if(!this.model.realizo_encuesta) this.model.motivos = null
    },
    editar() {
      this.$emit('update:editing', true)
    },
    cancelar(close) {
      console.log('this.model.id', this.model.id)
      if(close === 1 && !this.model.id) this.$router.go(-1)
      else if(!this.$route.params?.uuid) this.$router.replace({name:'RegistroEncuestaAPS', params: {uuid: close}})
      this.$emit('update:editing', false)
    }
  }
}
</script>