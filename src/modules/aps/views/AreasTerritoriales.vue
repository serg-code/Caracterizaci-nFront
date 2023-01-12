<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <c-tooltip tooltip="Nueva área territorial" top>
          <v-btn
              color="primary"
              @click="register(null)"
          >
            <v-icon class="white--text">mdi-plus</v-icon>
            Área Territorial
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <c-rows
            name="rowsAreasTerritoriales"
            route="barrio_vereda"
            :make-headers="itemsHeaders"
            :initial-run="true"
        >
          <template v-slot:rows="{ items, loading, headers }">
            <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                loading-text="Cargando... por favor espere"
                class="elevation-1"
                hide-default-footer
                disable-pagination
            >
              <template v-slot:item.nombre="{ item }">
                {{[item.tipo || '', item.nombre || ''].filter(x => x).join(', ')}}
              </template>
              <template v-slot:item.municipio="{ item }">
                {{[item.municipio ? item.municipio.nombre : '', item.municipio && item.municipio.departamento ? item.municipio.departamento.nombre : ''].filter(x => x).join(', ')}}
              </template>
              <template v-slot:item.options="{ item }">
                <options-buttons
                    :loading="item.loading"
                    top
                    edit-button
                    @edit="register(item)"
                    delete-button
                    @delete="deleteConfirm(item)"
                />
              </template>
            </v-data-table>
          </template>
        </c-rows>
      </v-col>
    </v-row>
    <registro-area-territorial
        v-model="registerDialog"
        :item-prop="selectedItem"
        @saved="rowsReload"
    />
    <c-confirm
        v-model="showConfirm"
        :loading.sync="loadingConfirm"
        title="Borrar área territorial"
        :subtitle="`¿Está seguro de continuar con el borrado de: ${selectedItem && selectedItem.tipo || ''} ${selectedItem && selectedItem.nombre ? `<strong>${selectedItem.nombre}</strong>` : ''}`"
        text-confirm-button="Si, Borrar"
        action="delete"
        dispatch="barrio_vereda"
        color-confirm-button="error"
        @success="rowsReload"
    />
  </v-container>
</template>

<script>
import RegistroAreaTerritorial from '@/modules/aps/components/areasTerritoriales/RegistroAreaTerritorial'
export default {
  name: 'AreasTerritoriales',
  components: {RegistroAreaTerritorial},
  data:() => ({
    itemsHeaders: [
      {
        text: 'Nombre',
        value: 'nombre',
      },
      {
        text: 'Municipio',
        value: 'municipio',
      },
      {
        value: 'options',
        visibleColumnSelectable: false,
      }
    ],
    registerDialog: false,
    selectedItem: null,
    showConfirm: false,
    loadingConfirm: false,
  }),
  methods: {
    register(item) {
      this.selectedItem = item
      this.registerDialog = true
    },
    deleteConfirm(item) {
      this.selectedItem = item
      this.showConfirm = true
    },
    rowsReload() {
      this.$store.commit('dataRows/setReloadRows', 'rowsAreasTerritoriales')
    }
  }
}
</script>