<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <span
        v-bind="attrs"
        v-on="on"
        class="primary--text text-decoration-underline"
      >
        {{ header.text }}
      </span>
    </template>
    <span>{{ header.fullText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'HeaderTooltip',
  props: {
    header: {
      type: Object,
      default: () => { },
    },
  },
}
</script>
