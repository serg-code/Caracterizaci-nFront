<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :vid="vid"
    :rules="'validPhone' + (rules ? `|${rules}`: '')"
  >
    <v-text-field
      v-model="phoneFormatted"
      v-mask="'###-###-####'"
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
      type="tel"
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
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'

export default {
  name: 'InputPhone',
  mixins: [InputMixin],
  props: {
    value: {
      type: String,
      default: null,
    }
  },
  data: () => ({
    model: null
  }),
  computed: {
    isRequired() {
      if (!this.rules) return false
      if (typeof this.rules === 'string') {
        return this.rules.toLowerCase().includes('required')
      }

      return this.rules.required
    },
    phoneFormatted: {
      get() {
        return this.value ? this.formatPhone(this.value) : null
      },
      set(newValue) {
        this.$emit('input', this.formatPhoneInverse(newValue))
      },
    },
  },
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
      immediate: false,
    },
    value: {
      handler(val) {
        this.model = (((typeof val !== 'undefined') && (val)) || null ? val : this.model)
      },
      immediate: true,
    },
  },
  methods: {
    formatPhone(value) {
      if (!value) return null
      const text = String(JSON.parse(JSON.stringify(value)))
      return [text.slice(0,3), text.slice(3,6), text.slice(6,10)].filter(x => x).join('-')
    },
    formatPhoneInverse(value) {
      if (!value) return null
      return (value.split('-')).filter(x => x).join('')
    },
  },
}
</script>
