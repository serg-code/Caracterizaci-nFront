<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :vid="vid"
    :rules="rules"
  >
    <v-text-field
      v-model="model"
      :placeholder="placeholder"
      :outlined="outlined"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errors"
      :clearable="clearable"
      :counter="counter"
      :persistent-hint="persistentHint"
      :hint="hint"
      :hide-details="hideDetails"
      :loading="loading"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="`mdi-${showPassword ? 'eye' : 'eye-off'}`"
      @click:append="showPassword = !showPassword"
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
  name: 'InputPassword',
  mixins: [InputMixin],
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
  },
  data: () => ({
    showPassword: false,
  }),
  computed: {
    model: {
      get() {
        return ((typeof this.value !== 'undefined') ? this.value : null)
      },
      set(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
    },
  },
}
</script>
