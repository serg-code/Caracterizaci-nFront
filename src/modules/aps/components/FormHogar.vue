<template>
<v-card>
  <v-card-title :class="editing ? '' : 'pb-0'">Identificación del Hogar</v-card-title>
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
            />
          </v-col>
          <!--      <v-col cols="12" md="6">-->
          <!--        <input-select-->
          <!--            v-model="model.zona"-->
          <!--            :items="zonas"-->
          <!--            :disabled="!model.cod_mun"-->
          <!--            item-text="nombre"-->
          <!--            item-value="codigo"-->
          <!--            name="Zona"-->
          <!--            label="Zona"-->
          <!--            rules="required"-->
          <!--            no-radio-->
          <!--        />-->
          <!--      </v-col>-->
          <!--      <v-col cols="12" md="6">-->
          <!--        <input-select-->
          <!--            v-model="model.barrio"-->
          <!--            :items="barrios"-->
          <!--            :disabled="!model.zona"-->
          <!--            item-text="nombre"-->
          <!--            item-value="codigo_dane"-->
          <!--            name="Barrio"-->
          <!--            label="Barrio"-->
          <!--            rules="required"-->
          <!--            no-radio-->
          <!--        />-->
          <!--      </v-col>-->
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
        </v-row>
      </v-container>
    </ValidationObserver>
    <v-card-actions>
      <v-spacer/>
      <v-btn text @click="cancelar">
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

export default {
  name: 'FormHogar',
  components: {InputGeolocation},
  props: {
    value: {
      type:Object,
      default: null
    },
    editing: {
      type:Boolean,
      default: true
    }
  },
  data:() => ({
    model: null,
    loading: false
  }),
  computed: {
    ...mapState('aps',['departamentos', 'municipios', 'barrios', 'zonas']),
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
      this.$refs.formHogar.validate().then(result => {
        if (result) {
          this.loading = true
          const copy = this.clone(this.model)
          copy.secciones = []
          this.axios.post('respuestas', {hogar: copy})
              .then(({data}) => {
                if(data?.data?.hogar) this.model.id = data.data.hogar.id
                this.$emit('input', this.model)
                this.cancelar()
              })
              .catch(error => {
                this.$store.commit('snackbar/setError', {error})
              })
              .finally(() => { this.loading = false })
        }
      })
    },
    editar() {
      this.$emit('update:editing', true)
    },
    cancelar() {
      if(this.model.id) this.$emit('update:editing', false)
      else this.$router.go(-1)
    }
  }
}
</script>