<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :vid="vid"
    :rules="rules"
  >
    <v-radio-group
        v-if="items && items.length <= 5 && !noRadio"
        v-model="model"
        :error-messages="errors"
    >
      <template
          v-if="label"
          v-slot:label
      >
        {{ label }}
        <strong
            v-if="isRequired"
            class="error--text"
        >
          *
        </strong>
      </template>
      <template v-for="(item, indexItem) in items">
        <v-radio
            :key="`radio${item.id}-${indexItem}`"
            :value="item[itemValue]"
        >
          <template v-slot:label>
            <div>{{ item[itemText] }}</div>
          </template>
        </v-radio>
      </template>
    </v-radio-group>
    <v-select
      v-else-if="items && items.length <= limitSelect"
      v-model="model"
      :placeholder="placeholder"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :outlined="outlined"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errors"
      :clearable="clearable"
      :hide-details="hideDetails"
      :multiple="multiple"
      :loading="loading"
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
        {{ label }}
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
          v-bind="{ item: item }"
          name="item"
        />
      </template>
    </v-select>
    <v-autocomplete
      v-else
      v-model="model"
      :placeholder="placeholder"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :outlined="outlined"
      :dense="dense"
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errors"
      :clearable="clearable"
      :hide-details="hideDetails"
      :multiple="multiple"
      :loading="loading"
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
        {{ label }}
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

export default {
  name: 'InputSelect',
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
    items: {
      type: Array,
      default: () => [],
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
  },
  data: () => ({
    model: null,
  }),
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
        this.$emit('inputObject', (typeof val !== 'undefined' && val !== null) ? this.items.find(x => x[this.itemValue] === val) : null)
      },
      immediate: false,
    },
    value: {
      handler(val) {
        this.model = ((typeof val !== 'undefined') ? val : null)
      },
      immediate: true,
    },
  }
}
</script>
