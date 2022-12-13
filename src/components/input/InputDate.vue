<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :vid="vid"
    :rules="'validDate' + (rules ? `|${rules}`: '') + (min ? `|min_date:${min}` : '') + (max ? `|max_date:${max}` : '')"
  >
    <v-text-field
      v-model="dateFormatted"
      v-mask="'##/##/####'"
      :placeholder="placeholder"
      :outlined="outlined"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errors"
      :clearable="clearable"
      :loading="loading"
      :counter="counter"
      :suffix="suffix"
      :prefix="prefix"
      :hint="hint"
      :persistent-hint="persistentHint"
      :hide-details="hideDetails"
    >
      <template
        v-if="label"
        #label
      >
        {{ label }}
        <strong
          v-if="isRequired"
          class="error--text"
        >
          *
        </strong>
      </template>
      <template #prepend-inner>
        <v-menu
          ref="dateMenu"
          v-model="dateMenu"
          :disabled="disabled"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-icon
              class="mr-1"
              v-bind="attrs"
              v-on="on"
            >
              {{ iconCalendar }}
            </v-icon>
          </template>
          <v-date-picker
            v-model="model"
            :min="min"
            :max="max"
            scrollable
            :disabled="disabled"
            :readonly="readonly"
            :active-picker.sync="activePicker"
            @change="save"
          />
        </v-menu>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'

export default {
  name: 'InputDate',
  mixins: [InputMixin],
  props: {
    value: {
      type: String,
      default: null,
    },
    min: {
      type: [Number, String],
      default: '1900-01-01',
    },
    max: {
      type: [Number, String],
      default: null,
    },
    birth: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    iconCalendar: 'mdi-calendar-month',
    activePicker: null,
    model: null,
    dateMenu: false,
  }),
  computed: {
    isRequired() {
      if (!this.rules) return false
      if (typeof this.rules === 'string') {
        return this.rules.toLowerCase().includes('required')
      }

      return this.rules.required
    },
    dateFormatted: {
      get() {
        return this.value ? this.formatDate(this.value) : null
      },
      set(newValue) {
        this.$emit('input', this.formatDateInverse(newValue))
      },
    },
  },
  watch: {
    dateMenu(val) {
      val && this.birth && setTimeout(() => {
        this.activePicker = 'YEAR'
      })
    },
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
      immediate: false,
    },
    value: {
      handler(val) {
        this.model = (((typeof val !== 'undefined') && (val && val.length === 10) && this.moment(val).isValid()) || null ? val : this.model)
      },
      immediate: true,
    },
  },
  methods: {
    save(date) {
      this.$refs?.dateMenu?.save(date)
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')

      return [Number.isInteger(Number(day)) && day, Number.isInteger(Number(month)) && month, Number.isInteger(Number(year)) && year].filter(x => x).join('/')
    },
    formatDateInverse(date) {
      if (!date) return null
      const [day, month, year] = date.split('/')

      return `${year}-${month}-${day}`
    },
  },
}
</script>
