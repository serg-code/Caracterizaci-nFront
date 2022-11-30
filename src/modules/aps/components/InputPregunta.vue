<template>
  <v-col
      v-if="model.show"
      cols="12"
  >
    <input-select
        v-model="model.model"
        :items="pregunta.opciones"
        :item-text="itemText"
        :item-value="itemValue"
        :name="pregunta.descripcion"
        :label="pregunta.descripcion"
        rules="required"
    />
  </v-col>
</template>

<script>

export default {
  name: 'InputPregunta',
  props: {
    respuesta: {
      type:Object,
      default: null
    },
    pregunta: {
      type:Object,
      default: null
    },
    itemValue: {
      type: String,
      default: 'id',
    },
    itemText: {
      type: String,
      default: 'pregunta_opcion',
    },
  },
  computed: {
    model:{
      get() {
        return this.respuesta
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>