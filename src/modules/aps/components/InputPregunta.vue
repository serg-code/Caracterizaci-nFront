<template>
  <v-col
      v-if="model.show"
      :cols="cols"
      :sm="sm || cols"
      :md="md || sm || cols"
      :lg="lg || md || sm || cols"
      :xl="xl || lg || md || sm || cols"
  >
    <input-select
        v-if="pregunta.tipo === 'seleccion' || pregunta.tipo === 'seleccion_multiple'"
        v-model="model.model"
        :items="pregunta.opciones"
        :item-text="itemText"
        :item-value="itemValue"
        :name="pregunta.descripcion"
        :label="pregunta.descripcion"
        :multiple="pregunta.tipo === 'seleccion_multiple'"
        :rules="rules"
    />
    <input-text
        v-if="pregunta.tipo === 'texto' || pregunta.tipo === 'numero'"
        v-model="model.model"
        :name="pregunta.descripcion"
        :label="pregunta.descripcion"
        :rules="rules"
        :type="pregunta.tipo === 'texto' ? 'text' : 'number'"
    />
    <input-date
        v-if="pregunta.tipo === 'fecha'"
        v-model="model.model"
        :name="pregunta.descripcion"
        :label="pregunta.descripcion"
        :rules="rules"
        :max="moment().format('YYYY-MM-DD')"
    />
    <input-text-area
        v-if="pregunta.tipo === 'texto_largo'"
        v-model="model.model"
        :name="pregunta.descripcion"
        :label="pregunta.descripcion"
        :rules="rules"
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
    rules: {
      type: String,
      default: 'required',
    },
    cols: {
      type: String,
      default: '12',
    },
    sm: {
      type: String,
      default: '',
    },
    md: {
      type: String,
      default: '',
    },
    lg: {
      type: String,
      default: '',
    },
    xl: {
      type: String,
      default: '',
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