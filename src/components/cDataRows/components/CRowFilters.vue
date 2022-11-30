<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
    eager
  >
    <template v-slot:activator="{ on, attrs }">
      <c-tooltip
        top
        tooltip="Filtros"
        v-bind="attrs"
        v-on="on"
      >
        <v-btn
          color="primary"
          fab
          @click="dialog = true"
        >
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </c-tooltip>
    </template>
    <base-card
      :show-actions="false"
      action-close
      :loading.sync="newLoading"
      @close="dialog = false"
    >
      <template slot="title">{{ title }}</template>
      <v-card-text>{{ subtitle }}</v-card-text>
      <v-card-text>
        <slot name="filters" />
      </v-card-text>
    </base-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'CRowFilters',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: String,
      default: '920',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    newLoading:{
      get(){
        return this.loading
      },
      set(val) {
        this.$emit('update:loading', val)
      }
    }
  },
  data: () => ({
    dialog: false,
  }),
}
</script>
