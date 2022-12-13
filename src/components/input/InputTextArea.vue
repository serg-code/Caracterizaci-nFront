<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :vid="vid"
    :rules="`${rules}|maxlength:${maxLength}`"
  >
    <v-textarea
      v-model="model"
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
    </v-textarea>
  </ValidationProvider>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'

export default {
  name: 'InputTextArea',
  mixins: [InputMixin],
  props: {
    value: {
      type: String,
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
  },
  computed: {
    maxLength() {
      return this.maxlength || 254
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
