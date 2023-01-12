<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :vid="vid"
    :rules="`${rules}|maxlength:${maxLength}`"
  >
    <v-text-field
      v-model="model"
      v-mask="decimal ? '' : mask"
      :class="upperCase ? 'c-upper-case' : lowerCase ? 'c-lower-case' : null"
      :placeholder="placeholder"
      :outlined="outlined"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errors && errors.length ? errors : errorMessages"
      :clearable="clearable"
      :counter="counter"
      :persistent-hint="persistentHint"
      :hint="hint"
      :hide-details="hideDetails"
      :prefix="prefix"
      :loading="loading"
      :type="type"
      :max="max"
      :min="min"
      :step="decimal ? 0.01 : step"
      @keypress="eventKey"
      @focus="changeCase"
      @blur="changeCase"
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
      <template v-slot:prepend>
        <slot name="prepend" />
      </template>
      <template v-slot:prepend-inner>
        <slot name="prepend-inner" />
      </template>
      <template v-slot:append-outer>
        <slot name="append-outer" />
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'

export default {
  name: 'InputText',
  mixins: [InputMixin],
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
    lowerCase: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    maxlength: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    decimal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    maxLength() {
      return this.maxlength || (['text', 'email'].find(x => x === this.type) ? 254 : 12)
    },
    mask() {
      return (['text', 'email'].find(x => x === this.type) ? 'X' : '#').repeat(this.maxLength)
    },
    model: {
      get() {
        return ((typeof this.value !== 'undefined') ? this.value : null)
      },
      set(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
    },
  },
  methods: {
    eventKey(event){
      return this.decimal ? ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 46 || event.keyCode === 44) : true
    },
    changeCase() {
      if (this.model && (this.upperCase || this.lowerCase)) {
        this.model = this.upperCase ? this.model.toUpperCase() : this.model.toLowerCase()
      }
    },
  },
}
</script>

<style>
.c-upper-case input {
  text-transform: uppercase !important;
}

.c-lower-case input {
  text-transform: lowercase !important;
}
</style>
