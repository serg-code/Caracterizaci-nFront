export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: null,
    },
    vid: {
      type: String,
      default: null,
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [String, Boolean],
      default: 'auto',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Number,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
    prefix: {
      type: String,
      default: null,
    },
    errorMessages: {
      type: String,
      default: null,
    },
  },
  computed: {
    isRequired() {
      if (!this.rules) return false
      if (typeof this.rules === 'string') {
        return this.rules?.toLowerCase()?.includes('required')
      }

      return this.rules?.required
    }
  }
}
