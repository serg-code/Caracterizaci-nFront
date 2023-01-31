<template>
  <v-menu
    :disabled="disabled"
    ref="dateRangeMenu"
    v-model="dateRangeMenu"
    :close-on-content-click="false"
    :return-value.sync="model"
    :nudge-top="20"
    transition="scale-transition"
    offset-y
    min-width="280px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider
        :name="name"
        :vid="vid"
        :rules="rules"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="dateFormatted"
          class="date-period"
          :label="label"
          :placeholder="placeholder"
          readonly
          :outlined="outlined"
          :dense="dense"
          :disabled="disabled"
          :error-messages="errors"
          :clearable="clearable"
          :hint="hint"
          :persistent-hint="persistentHint"
          :hide-details="hideDetails"
          v-on="on"
        >
          <template #prepend-inner>
            <v-icon>mdi-calendar-range</v-icon>
          </template>
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
          <template v-slot:append>
            <v-menu
              v-if="showSelectPeriods"
              offset-y
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ attrs, on }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-dots-vertical
                </v-icon>
              </template>
              <v-list
                class="pa-0"
              >
                <v-list-item
                  v-for="(period, indexPeriod) in periods"
                  :key="`period${indexPeriod}`"
                  @click="selectPeriod(period)"
                >
                  <v-list-item-title
                    :class="selectedPeriod === period ? 'primary--text' : ''"
                  >
                    {{ period.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker
      v-model="model"
      class="date-period-picker"
      :disabled="disabled"
      :readonly="readonly"
      :min="min"
      :max="max"
      scrollable
      range
      :title-date-format="() => dateFormatted"
    />
  </v-menu>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'

export default {
  name: 'InputDateRange',
  mixins: [InputMixin],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    periodOrigin: {
      type: String,
      default: '',
    },
    min: {
      type: [Number, String],
      default: '1900-01-01',
    },
    max: {
      type: [Number, String],
      default: null,
    },
    showSelectPeriods: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    model: [],
    dateRangeMenu: false,
    clearSelectedPeriod: true,
    selectedPeriod: {
      value: '',
      text: 'Periodo',
    },
    periods: [
      {
        value: 'today',
        text: 'Hoy',
      },
      {
        value: 'last_week',
        text: 'Semana Pasada',
      },
      {
        value: 'last_month',
        text: 'Mes Pasado',
      },
      {
        value: 'last_year',
        text: 'Año Pasado',
      },
    ],
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
        if (this.$refs.dateRangeMenu && this.value?.length === 2 && this.model?.length === 2) {
          this.$refs.dateRangeMenu.save(this.model)
        }

        return (this.value?.length === 2 && this.value) ? [this.formatDate(this.value[0]), this.formatDate(this.value[1])].join(' - ') : ''
      },
      set(newVal) {
        // eslint-disable-next-line prefer-destructuring
        if (!newVal) this.selectedPeriod = this.periods[0]
        this.input(newVal || '')
      },
    },
  },
  watch: {
    model: {
      handler(val) {
        if (!val) {
          this.input([])
          // eslint-disable-next-line prefer-destructuring
          this.selectedPeriod = this.periods[0]
        } else if (val?.length === 2) {
          if ((val[0] !== val[1]) && !this.moment(val[1]).isAfter(val[0], 'day')) {
            this.input([val[1], val[0]])
            // eslint-disable-next-line prefer-destructuring
            if (this.clearSelectedPeriod) this.selectedPeriod = this.periods[0]
          } else {
            // eslint-disable-next-line prefer-destructuring
            if (this.clearSelectedPeriod && (val !== this.value)) this.selectedPeriod = this.periods[0]
            this.input(val)
          }
        }
      },
      immediate: true,
    },
    value: {
      handler(val, prev) {
        if ((typeof prev === 'undefined' || prev === null) && (!val || (val && val.length === 0))) {
          this.selectedPeriod = this.periods.find(period => period.value === this.periodOrigin) || []
          this.model = this.makeDatePeriod()
        } else {
          this.model = ((typeof val !== 'undefined' && val !== null) ? val : [])
        }
      },
      immediate: true,
    },
    periodOrigin: {
      handler(val) {
        if (val) this.selectPeriod(val)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    input(val) {
      this.$emit('input', val || [])
    },
    selectPeriod(period) {
      this.selectedPeriod = this.periods.find(x => x.value === ((typeof period === 'string') ? period : period.value)) || this.periods[0]
      this.model = this.makeDatePeriod()
    },
    makeDatePeriod() {
      this.coolTimeSelectedPeriod()
      switch (this.selectedPeriod.value) {
        case 'today':
          return [
            this.moment().format('YYYY-MM-DD'),
            this.moment().format('YYYY-MM-DD'),
          ]
        case 'last_week':
          return [
            this.moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
            this.moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
          ]
        case 'last_month':
          return [
            this.moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            this.moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
          ]
        case 'last_year':
          return [
            this.moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            this.moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
          ]
        default:
          return null
      }
    },
    coolTimeSelectedPeriod() {
      this.clearSelectedPeriod = false
      setTimeout(() => {
        this.clearSelectedPeriod = true
      }, 500)
    },
    formatDate(date) {
      if (!date) return ''
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    },
  },
}
</script>

<style>
.date-period .v-input__prepend-outer {
  margin: 0 !important;
  margin-right: 4px !important;
}
.date-period-picker .v-date-picker-title__date {
  font-size: 22px !important;
}
</style>
