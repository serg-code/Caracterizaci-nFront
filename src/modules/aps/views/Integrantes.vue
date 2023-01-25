<template>
  <v-container>
    <view-title />
    <v-row>
      <v-col cols="12">
        <c-rows
            name="rowsIntegrantes"
            route="integrante"
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
              <template v-slot:item.id="{ item }">
                <div style="display: flex;">
                  <v-badge
                      :value="item.cabeza_familia && item.cabeza_familia !== 'NO'"
                      color="success"
                      icon="mdi-shield-check"
                      overlap
                      offset-y="22"
                      bottom
                      left
                  >
                    <v-icon large class="mr-2">mdi-face-{{item.sexo === 'Masculino' ? 'man' : 'woman'}}</v-icon>
                  </v-badge>
                  <div style="display: grid;">
                    <span class="font-weight-bold">{{ [item.primer_nombre, item.segundo_nombre, item.primer_apellido, item.segundo_apellido].filter(x => x).join(' ') }}</span>
                    <span>{{ [item.tipo_identificacion, item.identificacion].filter(x => x).join('') }}</span>
                  </div>
                </div>
              </template>
              <template v-slot:item.contacto="{ item }">
                <div style="display: grid;">
                  <span>{{ item.correo }}</span>
                  <span>{{ item.telefono }}</span>
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
                >
                  <c-tooltip
                      top
                      tooltip="Ir a la encuesta"
                  >
                    <v-btn
                        class="ma-1"
                        color="warning"
                        depressed
                        fab
                        dark
                        x-small
                        @click="$router.push(`/aps/registro-encuesta/${item.hogar_id}`)"
                    >
                      <v-icon>mdi-clipboard-list</v-icon>
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

export default {
  name: 'ListIntegrantes',
  mixins:[APSMixin],
  data:() => ({
    itemsHeaders: [
      {
        text: 'Integrante',
        value: 'id',
      },
      {
        text: 'Contacto',
        value: 'contacto',
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
  })
}
</script>