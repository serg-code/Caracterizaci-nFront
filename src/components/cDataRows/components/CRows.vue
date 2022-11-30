<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <v-row dense justify="space-between" align="center" class="d-flex pa-1">
          <v-col
            cols="12"
            sm="4"
            md="3"
            class="d-flex justify-start"
          >
            <v-select
              v-if="isOnline"
              v-model="dataPagination.itemsPerPage"
              :items="optionsPerPage"
              item-text="text"
              item-value="value"
              @change="reloadCurrentPage"
              hide-details
              outlined
              dense
              style="max-width: 80px"
              class="mr-2"
            >
              <template slot="selection">
                <v-icon size="28">mdi-table-row</v-icon>
              </template>
            </v-select>
            <v-select
              v-model="selectHeaders"
              :items="makeHeaders.filter(x => x.visibleColumnSelectable)"
              item-text="text"
              item-value="id"
              return-object
              hide-details
              multiple
              outlined
              style="max-width: 80px"
              dense
            >
              <template
                slot="selection"
                slot-scope="{ index }"
              >
                <v-icon
                  v-if="index === 0"
                  size="22"
                >
                  mdi-table-column
                </v-icon>
              </template>
            </v-select>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="6"
            class="align-center"
          >
            <v-text-field
              v-model="searchRows"
              placeholder="Buscar..."
              prepend-inner-icon="mdi-magnify"
              filled
              rounded
              hide-details
              clearable
              class="searchRows"
              @keyup.enter="reloadCurrentPage"
            >
              <template v-slot:prepend>
                <v-btn
                  icon
                  large
                  color="primary"
                  @click="reloadCurrentPage"
                >
                  <v-icon large>mdi-sync</v-icon>
                </v-btn>
              </template>
              <template
                v-if="(advanceFilters || exportExcel) && isOnline"
                v-slot:append-outer
              >
                <c-row-filters
                  :title="filtersTitle"
                  :subtitle="filtersSubtitle"
                  :max-width="filtersMaxWidth"
                >
                  <template v-slot:filters>
                    <slot name="filters" />
                  </template>
                </c-row-filters>
              </template>
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="3"
            style="text-align: end"
          >
            <export-excel
              v-if="exportExcel && isOnline"
              :route="urlStringExport"
              :count="(dataPagination && dataPagination.itemsLength) || null"
            />
            <slot name="additional-actions"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <slot
      v-if="isOnline"
      name="filterstags"
      v-bind="{ tags: filtersTags }"
    />
    <div
      class="mt-1"
      style="position: relative !important;"
    >
      <slot
        name="rows"
        v-bind="{ items: items, headers: rowsHeaders, loading: loading }"
      />
    </div>
    <template v-if="dataPagination && isOnline">
      <div
        v-if="footerPagination"
        class="mt-15"
      >
        <div
          style="left: 0 !important; right: 0 !important; bottom: 0 !important; position: fixed !important;"
        >
          <v-sheet
            tile
            elevation="5"
          >
            <v-container>
              <template v-if="dataPagination.lastPage && dataPagination.itemsLength">
                <v-row align="center" justify="center">
                <span class="title grey--text text--darken-1 text-center caption mt-1">
                  {{ `Registros del ${dataPagination.from} al ${dataPagination.to} de ${dataPagination.itemsLength}`
                  }}
                </span>
                </v-row>
                <v-row align="center" justify="center">
                  <v-pagination
                    class="my-1"
                    circle
                    v-model="dataPagination.currentPage"
                    :total-visible="totalVisiblePagination"
                    :length="dataPagination.lastPage"
                    @input="reloadPage"
                  />
                </v-row>
              </template>
              <v-row
                v-else
                align="center"
                justify="center"
              >
                <div
                  style="display: inline-flex !important;"
                  class="ma-2"
                >
                  <div
                    class="mr-0 ml-3"
                    :style="`margin-top: ${!dataPagination.prev ? '5' : '4'}px !important;`"
                  >
                    <v-btn
                      fab
                      x-small
                      elevation="2"
                      :disabled="!dataPagination.prev"
                      @click="() => {
                  dataPagination.currentPage = dataPagination.prev
                  reloadPage()
                }"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </div>

                  <div class="mx-2">
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      color="primary"
                    />
                    <v-avatar
                      v-else
                      size="40"
                      color="primary"
                      class="white--text elevation-2"
                    >
                      {{ dataPagination.currentPage }}
                    </v-avatar>
                  </div>

                  <div
                    class="ml-0 mr-3"
                    :style="`margin-top: ${!dataPagination.next ? '5' : '4'}px !important;`"
                  >
                    <v-btn
                      fab
                      x-small
                      elevation="2"
                      :disabled="!dataPagination.next"
                      @click="() => {
                  dataPagination.currentPage = dataPagination.next
                  reloadPage()
                }"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-row>
            </v-container>
          </v-sheet>
        </div>
      </div>
      <div v-else class="text-center mt-1">
        <template v-if="dataPagination.lastPage && dataPagination.itemsLength">
          <span class="title grey--text text--darken-1 text-center caption pa-1">
          {{ `Registros del ${dataPagination.from} al ${dataPagination.to} de ${dataPagination.itemsLength}`}}
        </span>
          <v-pagination
            circle
            v-model="dataPagination.currentPage"
            :total-visible="totalVisiblePagination"
            :length="dataPagination.lastPage"
            @input="reloadPage"
          />
        </template>
        <div
          v-else
          style="display: inline-flex !important;"
          class="ma-2"
        >
          <div
            class="mr-0 ml-3"
            :style="`margin-top: ${!dataPagination.prev ? '5' : '4'}px !important;`"
          >
            <v-btn
              fab
              x-small
              elevation="2"
              :disabled="!dataPagination.prev"
              @click="() => {
                  dataPagination.currentPage = dataPagination.prev
                  reloadPage()
                }"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </div>

          <div class="mx-2">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            />
            <v-avatar
              v-else
              size="40"
              color="primary"
              class="white--text elevation-2"
            >
              {{ dataPagination.currentPage }}
            </v-avatar>
          </div>

          <div
            class="ml-0 mr-3"
            :style="`margin-top: ${!dataPagination.next ? '5' : '4'}px !important;`"
          >
            <v-btn
              fab
              x-small
              elevation="2"
              :disabled="!dataPagination.next"
              @click="() => {
                  dataPagination.currentPage = dataPagination.next
                  reloadPage()
                }"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import RowsManager from '../data/RowsManager'
import CRowFilters from './CRowFilters.vue'
import ExportExcel from './ExportExcel.vue'

export default {
  name: 'CRows',
  components: {
    ExportExcel,
    CRowFilters,
  },
  props: {
    exportExcel: {
      type: Boolean,
      default: false,
    },
    advanceFilters: {
      type: Boolean,
      default: false,
    },
    filtersTitle: {
      type: String,
      default: '',
    },
    filtersSubtitle: {
      type: String,
      default: '',
    },
    filtersMaxWidth: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    footerPagination: {
      type: Boolean,
      default: false,
    },
    itemsLoading: {
      type: Boolean,
      default: false,
    },
    initialRun: {
      type: Boolean,
      default: true,
    },
    makeHeaders: {
      type: Array,
      default: () => [],
    },
    route: {
      type: String,
      default: '',
    },
    dispatch: {
      type: String,
      default: '',
    },
    totalVisiblePagination: {
      type: Number,
      default: 5,
    },
    optionsPerPage: {
      type: Array,
      default: () => [
        {
          text: 10,
          value: 10,
        },
        {
          text: 30,
          value: 30,
        },
        {
          text: 50,
          value: 50,
        },
        {
          text: 100,
          value: 100,
        },
        {
          text: 200,
          value: 200,
        },
        {
          text: 500,
          value: 500,
        },
      ],
    },
  },
  data: () => ({
    debounce: require('lodash/debounce'),
    urlStringExport: null,
    constDataRow: null,
    sortString: '',
    filterString: '',
    selectHeaders: [],
    rowsHeaders: [],
    loading: false,
    activePetition: true,
    items: [],
    searchRows: '',
    dataPagination: {
      currentPage: 1,
      lastPage: 1,
      itemsLength: 0,
      itemsPerPage: 0,
      from: 1,
      to: 1,
    },
    filtersTags: {},
  }),
  computed: {
    stateDataRow() {
      return store.getters['dataRows/myDataRow'](this.name)
    },
  },
  watch: {
    isOffline: {
      handler(val) {
        if (val) this.reloadCurrentPage()
      },
      immediate: true,
    },
    'stateDataRow.filters': {
      handler() {
        this.reloadCurrentPage()
      },
      immediate: false,
    },
    'stateDataRow.changes': {
      handler() {
        this.reloadCurrentPage()
      },
      immediate: false,
    },
    route: {
      handler(val) {
        if (val) this.reloadCurrentPage()
      },
      immediate: false,
    },
    searchRows: {
      handler(val) {
        if (!val) this.reloadPage()
      },
      immediate: false,
    },
    selectHeaders: {
      handler(val) {
        if (this.name) {
          store.commit('dataRows/setDataRowsHeaders', {
            name: this.name,
            version: this.constDataRow?.version || 1,
            headers: val,
          })
        }
        this.reloadRowsHeaders()
      },
      immediate: false,
    },
  },
  created() {
    this.dataPagination.itemsPerPage = this.optionsPerPage[0].value
    if (this.name) this.constDataRow = RowsManager.find(x => x.name === this.name)
    this.reloadHeaders()
    this.loading = this.initialRun
  },
  mounted() {
    setTimeout(() => {
      if (this.route && this.initialRun) {
        this.reloadCurrentPage()
      }
    }, 300)
  },
  methods: {
    reloadRowsHeaders() {
      this.rowsHeaders = JSON.parse(JSON.stringify(this.stateDataRow?.headers || this.makeHeaders)).sort((a, b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1

        return 0
      })
    },
    reloadHeaders() {
      this.makeHeaders.forEach((item, index) => {
        // eslint-disable-next-line no-param-reassign
        item.id = index
        // eslint-disable-next-line no-param-reassign
        item.visibleColumn = item.visibleColumn !== false
        // eslint-disable-next-line no-param-reassign
        item.visibleColumnSelectable = item.visibleColumnSelectable !== false
        // eslint-disable-next-line no-param-reassign
        item.disabled = !(item.columnSelectable !== false)
        // eslint-disable-next-line no-param-reassign
        item.sortable = !!item.sortable
        // eslint-disable-next-line no-param-reassign
        item.text = item.text || ''
      })
      store.commit('dataRows/setDataRowsHeaders', {
        name: this.name,
        version: this.constDataRow?.version || 1,
        headers: this.constDataRow?.version !== this.stateDataRow?.version
          ? this.makeHeaders.filter(x => x.visibleColumn)
          : this.stateDataRow.headers,
      })
      this.selectHeaders = this.stateDataRow?.headers || JSON.parse(JSON.stringify(this.makeHeaders.filter(x => x.visibleColumn)))
    },
    async reloadCurrentPage() {
      this.dataPagination.currentPage = 1
      await this.reloadPage()
    },
    async reloadPage() {
      if (this.activePetition) {
        try {
          this.loading = true
          this.activePetition = false
          if (this.isOnline) {
            const urlString = await this.makeUrl()
            const { data } = await axios.get(urlString)

            if (data) {
              this.dataPagination.itemsLength = data.total
              this.dataPagination.itemsPerPage = parseInt(data.per_page, 10)
              this.dataPagination.lastPage = data.last_page
              this.dataPagination.from = data.from
              this.dataPagination.to = data.to
              // eslint-disable-next-line no-nested-ternary
              this.dataPagination.next = data.total ? data.next_page_url : data.next_page_url ? this.dataPagination.currentPage + 1 : null
              // eslint-disable-next-line no-nested-ternary
              this.dataPagination.prev = data.total ? data.prev_page_url : data.prev_page_url ? this.dataPagination.currentPage - 1 : null
              data.data.forEach(x => {
                // eslint-disable-next-line no-param-reassign
                x.loading = false
              })
              this.items = Object.freeze(data.data)
              // eslint-disable-next-line no-mixed-operators
              this.filtersTags = this?.$slots?.filters && this.$slots.filters[0] && this.$slots.filters[0].componentInstance?.$data?.model || {}
            }
          } else if (this.dispatch) {
            store.dispatch(this.dispatch, this.searchRows || '')
              .then(data => {
                this.items = Object.freeze(data)
              })
          }
        } catch (e) {
          store.commit('snackbar/setSnackbarError', {
            message: 'Error al hacer la busqueda de registros.',
            e,
          })
        }
        setTimeout(() => {
          this.activePetition = true
        }, 400)
        this.loading = false
      }
    },
    async makeUrl() {
      // eslint-disable-next-line no-nested-ternary
      const filtersString = this.advanceFilters ? this.stateDataRow.filters ? `&${this.stateDataRow.filters}` : '' : ''
      const sortString = ''
      this.urlStringExport = `${this.route}${this.route.indexOf('?') > -1 ? '&' : '?'}filter[search]=${!this.searchRows ? '' : this.searchRows}${filtersString}${sortString}&excel=1`

      return `${this.route}${this.route.indexOf('?') > -1 ? '&' : '?'}per_page=${this.dataPagination.itemsPerPage}${filtersString}${sortString}&page=${this.dataPagination.currentPage}&filter[search]=${!this.searchRows ? '' : this.searchRows}`
    },
  },
}
</script>

<style>
.searchRows .v-input__prepend-outer {
  margin-top: 6px !important;
}

.searchRows .v-input__append-outer {
  margin-top: 2px !important;
}
</style>
