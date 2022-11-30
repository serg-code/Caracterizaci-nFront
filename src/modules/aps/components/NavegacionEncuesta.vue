<template>
  <v-bottom-navigation
      class="elevation-3"
      grow
      height="70"
  >
    <v-btn
        color="success"
        :disabled="disabledPrev"
        @click="$emit('clickPrev')"
    >
      <span class="white--text">Anterior</span>
      <v-icon color="white">mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn color="blue">
      <span class="white--text">Guardar</span>
      <v-icon color="white">mdi-content-save</v-icon>
    </v-btn>
    <v-btn
        v-if="nextBtn"
        color="success"
        class="ma-0"
        @click="$emit('clickNext')"
    >
      <span class="white--text">Siguiente</span>
      <v-icon color="white">mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn
        v-if="saveBtn"
        color="primary"
        @click="$emit('clickSave')"
    >
      <span class="white--text">Finalizar</span>
      <v-icon color="white">mdi-check-bold</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'NavegacionEncuesta',
  props:{
    disabledPrev: {
      type:Boolean,
      default: false
    },
    nextBtn: {
      type:Boolean,
      default: true
    },
    saveBtn: {
      type:Boolean,
      default: false
    }
  }
}
</script>