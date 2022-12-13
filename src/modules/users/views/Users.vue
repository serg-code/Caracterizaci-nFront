<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <c-tooltip tooltip="Nueva encuesta" top>
          <v-btn
              color="primary"
              @click="register()"
          >
            <v-icon class="white--text">mdi-plus</v-icon>
            Usuario
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <c-rows
            name="rowsUsers"
            route="usuarios"
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
              <template v-slot:item.options="{ item }">
                <options-buttons
                    :loading="item.loading"
                    edit-button
                    @edit="$router.push(`/aps/registro-encuesta/${item.id}`)"
                    top
                />
              </template>
            </v-data-table>
          </template>
        </c-rows>
      </v-col>
    </v-row>
    <register-user
        v-model="registerDialog"
        :user="selectedItem"
        @saved="rowsReload"
    />
  </v-container>
</template>

<script>
import RegisterUser from '@/modules/users/components/RegisterUser'
export default {
  name: 'ListUsers',
  components: {RegisterUser},
  data:() => ({
    itemsHeaders: [
      {
        text: 'Nombre',
        value: 'name',
      },
      {
        text: 'Correo electrónico',
        value: 'Email',
      },
      {
        value: 'options',
        visibleColumnSelectable: false,
      }
    ],
    registerDialog: false,
    selectedItem: null,
  }),
  methods: {
    register(item) {
      this.selectedItem = item
      this.registerDialog = true
    },
    rowsReload() {
      this.$store.commit('dataRows/setReloadRows', 'rowsUsers')
    }
  }
}
</script>