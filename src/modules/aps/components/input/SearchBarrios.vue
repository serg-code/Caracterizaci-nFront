<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="(zona === 'Rural disperso' ? 'Vereda o corregimiento' : zona) || name"
    :vid="vid"
    :rules="rules"
  >
    <v-autocomplete
      v-model="model"
      :items="rows"
      :item-text="itemText"
      :item-value="itemValue"
      :search-input.sync="barrioSearch"
      no-filter
      :placeholder="placeholder || 'Buscar por nombre'"
      no-data-text="No hay resultados para mostrar"
      :outlined="outlined"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errors"
      :clearable="clearable"
      :hide-details="hideDetails"
      :multiple="multiple"
      :loading="loadingBarrios"
      :hint="hint"
      :return-object="returnObject"
      :persistent-hint="persistentHint"
      :chips="chips"
      :small-chips="smallChips"
      :deletable-chips="deletableChips"
      @change="val => $emit('change', val)"
    >
      <template
          v-if="label"
          v-slot:label
      >
        {{ (zona === 'Rural disperso' ? 'Vereda o corregimiento' : zona) || label }}
        <strong
            v-if="isRequired"
            class="error--text"
        >
          *
        </strong>
      </template>
      <template
        v-if="$scopedSlots && $scopedSlots.item"
        v-slot:item="{ item }"
      >
        <slot
          v-bind="{ item }"
          name="item"
        />
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'
import debounce from 'lodash/debounce'

export default {
  name: 'SearchBarrios',
  mixins: [InputMixin],
  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null,
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    noRadio: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    limitSelect: {
      type: Number,
      default: 10,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    deletableChips: {
      type: Boolean,
      default: false,
    },
    smallChips: {
      type: Boolean,
      default: false,
    },
    municipio: {
      type: [String, Number],
      default: null,
    },
    zona: {
      type: [String, Number],
      default: null,
    },
  },
  data: () => ({
    barrioSearch: null,
    model: null,
    loadingBarrios: false,
    rows: []
  }),
  watch: {
    barrioSearch: {
      handler(val) {
        val && this.buscarBarrios()
      },
      immediate: false
    },
    zona: {
      handler(val) {
        val && this.buscarBarrios()
      },
      immediate: false
    },
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
        this.$emit('inputObject', (typeof val !== 'undefined' && val !== null) ? this.rows.find(x => x[this.itemValue] === val) : null)
      },
      immediate: false,
    },
    value: {
      handler(val) {
        this.model = ((typeof val !== 'undefined') ? val : null)
      },
      immediate: true,
    },
  },
  created() {
    if(this.value) this.buscarBarrios()
  },
  methods:{
    buscarBarrios: debounce(async function () {
      this.loadingBarrios = true
      this.axios.get(`barrio_vereda?filter[search]=${this.barrioSearch || ''}${this.value ? `&filter[id]=${this.value}` : ''}${this.municipio ? `&filter[id_municipio]=${this.municipio}` : ''}${this.zona ? `&filter[tipo]=${this.zona === 'Rural disperso' ? 'Vereda,Corregimiento' : this.zona}` : ''}`)
          .then(({data}) => { this.rows = data?.data?.data || [] })
          .catch(error => this.$store.commit('snackbar/setError', { message: 'Error al realizar la busqueda de barrios.', error }))
          .finally(() => {this.loadingBarrios = false})
    }, 500)
  }
}
</script>
