<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <c-tooltip
            v-if="permisos.crear"
            tooltip="Nueva encuesta"
            top
        >
          <v-btn
              color="primary"
              :to="{name: 'RegistroEncuestaAPS'}"
          >
            <v-icon class="white--text">mdi-plus</v-icon>
            Encuesta
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <c-rows
            name="rowsEncuestas"
            route="hogar"
            :make-headers="itemsHeaders"
            :initial-run="true"
            advance-filters
            filters-title="Filtros de encuestas"
            filters-max-width="450"
        >
          <filters slot="filters" />
          <template v-slot:filterstags="{ tags }">
            <tags-filters :tags="tags" />
          </template>
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
              <template v-slot:item.id="{ item }">
                <div style="display: grid;">
                  <span class="font-weight-bold">{{ item.id }}</span>
                  <span>{{ item.direccion }}</span>
                </div>
              </template>
              <template v-slot:item.ubicacion="{ item }">
                <div style="display: grid;">
                  {{item.municipio ? [item.municipio.nombre, item.municipio?.departamento ? item.municipio?.departamento.nombre : ''].filter(x => x).join(', ') : ''}}
                </div>
              </template>
              <template v-slot:item.puntaje_obtenido="{ item }">
                <v-progress-linear
                    v-if="item.puntaje_obtenido && item.puntaje_max"
                    :value="item.porcentaje"
                    :color="item.color"
                    height="25"
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ value }}%</strong>
                  </template>
                </v-progress-linear>
                <div class="caption text-center">{{ item.puntaje_obtenido && item.puntaje_max ? `${item.puntaje_obtenido} de ${item.puntaje_max}` : '' }}</div>
              </template>
              <template v-slot:item.estado_registro="{ item }">
                <v-chip label :color="item.estado_registro === 'ABIERTO' ? 'warning' : 'success'">{{item.estado_registro}}</v-chip>
              </template>
              <template v-slot:item.options="{ item }">
                <options-buttons
                    :loading="item.loading"
                    :edit-button="permisos.editar"
                    @edit="$router.push(`/aps/registro-encuesta/${item.id}`)"
                    top
                >
                  <c-tooltip
                      v-if="permisos.resultados"
                      top
                      tooltip="Ir a los resultados"
                  >
                    <v-btn
                        class="ma-1"
                        color="success"
                        depressed
                        fab
                        dark
                        x-small
                        @click="$router.push(`/aps/resultado-encuesta/${item.id}`)"
                    >
                      <v-icon>mdi-gauge</v-icon>
                    </v-btn>
                  </c-tooltip>
                </options-buttons>
              </template>
            </v-data-table>
          </template>
        </c-rows>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import APSMixin from '@/modules/aps/mixins/APSMixin'
import Filters from '@/modules/aps/components/encuestas/Filters'
import TagsFilters from '@/modules/aps/components/encuestas/TagsFilters'
import store from '@/store'
export default {
  name: 'ListEncuestas',
  mixins:[APSMixin],
  components:{
    TagsFilters,
    Filters
  },
  data:() => ({
    itemsHeaders: [
      {
        text: 'Encuesta',
        value: 'id',
      },
      {
        text: 'Ubicación',
        value: 'ubicacion',
      },
      {
        text: 'Riesgo',
        value: 'puntaje_obtenido',
      },
      {
        text: 'Estado',
        value: 'estado_registro',
      },
      {
        value: 'options',
        visibleColumnSelectable: false,
      }
    ]
  }),
  computed: {
    permisos () {
      return store.getters['auth/permissionsByModule']('hogar')
    }
  }
}
</script>