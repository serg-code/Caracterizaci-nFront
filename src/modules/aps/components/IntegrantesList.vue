<template>
  <v-card>
    <v-card-title>
      <v-icon large class="mr-1">mdi-account-group</v-icon>
      <v-badge
          dark
          color="primary"
          :content="String(integrantes.length)"
      >
        Integrantes
      </v-badge>
      <v-spacer />
      <v-btn color="primary" @click="nuevoIntegrante">
        Nuevo integrante
      </v-btn>
      <v-btn
          v-if="integrantes.length"
          icon
          color="primary"
          class="ml-3"
          @click="open = !open"
      >
        <v-icon>mdi-chevron-{{open ? 'up' : 'down'}}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <div v-if="open && integrantes.length">
        <v-card-text>
          <v-list>
            <template v-for="(integrante, indexIntegrante) in integrantes">
              <v-list-item
                  :key="`integrante${indexIntegrante}`"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{[integrante.primer_nombre, integrante.segundo_nombre, integrante.primer_apellido, integrante.segundo_apellido].filter(x => x).join(' ')}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{[integrante.tipo_identificacion, integrante.identificacion].filter(x => x).join('')}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                      icon
                      color="warning"
                      @click="editarIntegrante(integrante)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      color="error"
                      @click="confirmarBorradoIntegrante(integrante)"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
    <registro-integrante
        v-model="model"
        :integrante="itemSelected"
        :dialog.sync="dialogIntegrante"
    />
    <c-confirm
        v-model="showConfirm"
        :loading.sync="loadingConfirm"
        title="Borrar integrante"
        :subtitle="`¿Está seguro de continuar con el borrado del integrante ${itemSelected && itemSelected.primer_nombre ? `<strong>${itemSelected.primer_nombre}</strong>` : ''}`"
        text-confirm-button="Si, Borrar"
        action="delete"
        color-confirm-button="error"
        @success="val => borrarIntegrante(val)"
    />
  </v-card>
</template>

<script>
import RegistroIntegrante from '@/modules/aps/components/RegistroIntegrante'
export default {
  name: 'IntegrantesList',
  components: {RegistroIntegrante},
  props:{
    value: {
      type: Object,
      default: null
    }
  },
  data:() => ({
    showConfirm: false,
    loadingConfirm: false,
    open: false,
    dialogIntegrante: false,
    itemSelected: null
  }),
  computed:{
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    integrantes() {
      return this.model?.integrantes || []
    }
  },
  methods: {
    nuevoIntegrante() {
      this.itemSelected = null
      this.dialogIntegrante = true
    },
    editarIntegrante(item) {
      this.itemSelected = item
      this.dialogIntegrante = true
    },
    confirmarBorradoIntegrante(item) {
      this.itemSelected = item
      this.showConfirm = true
    },
    borrarIntegrante(val){
      console.log('ok borrar', val)
      this.loadingConfirm = true
    }
  }
}
</script>