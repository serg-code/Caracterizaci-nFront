<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <c-tooltip
            v-if="permisos.crear"
            tooltip="Nuevo rol"
            top
        >
          <v-btn
              color="primary"
              @click="register(null)"
          >
            <v-icon class="white--text">mdi-plus</v-icon>
            Rol
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <v-data-table
            :headers="itemsHeaders"
            :items="items"
            :items-per-page="10"
            :loading="loading"
        >
          <template v-slot:item.options="{ item }">
            <c-tooltip
                v-if="permisos.editar"
                top
                tooltip="Editar"
            >
              <v-btn
                  class="ma-1"
                  color="warning"
                  depressed
                  fab
                  dark
                  x-small
                  :loading="loading"
                  @click="register(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </c-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <register-rol
        v-model="registerDialog"
        :item-prop="selectedItem"
        @saved="rowsReload"
    />
  </v-container>
</template>

<script>
import RegisterRol from '@/modules/roles/components/RegisterRol'
import store from "@/store";
export default {
  name: 'ListRoles',
  components: {RegisterRol},
  data:() => ({
    loading: false,
    items: [],
    itemsHeaders: [
      {
        text: 'Nombre',
        value: 'name',
      },
      {
        value: 'options',
        sortable: false,
      }
    ],
    registerDialog: false,
    selectedItem: null,
  }),
  computed: {
    permisos () {
      return store.getters['auth/permissionsByModule']('roles')
    }
  },
  created() {
    this.rowsReload()
  },
  methods: {
    register(item) {
      this.selectedItem = item
      this.registerDialog = true
    },
    rowsReload() {
      this.loading = true
      this.axios.get('roles')
          .then(({data}) => {
            this.items = data?.data[0] || []
          })
          .catch(error => {
            this.$store.commit('snackbar/setError', {error})
          })
      .finally(() => { this.loading = false })
    }
  }
}
</script>