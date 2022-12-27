<template>
  <v-card
      v-if="model"
      class="ma-0"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-h6 ma-0">{{ model.descripcion }}</p>
        </v-col>
        <v-col cols="12">
          <v-row>
            <input-pregunta
                :respuesta="model.respuestas.encuesta_sisben"
                :pregunta="preguntas.encuesta_sisben"
            />
            <input-pregunta
                :respuesta="model.respuestas.ficha_sisben"
                :pregunta="preguntas.ficha_sisben"
                sm="6"
                md="4"
            />
            <input-pregunta
                :respuesta="model.respuestas.puntaje_sisben"
                :pregunta="preguntas.puntaje_sisben"
                sm="6"
                md="4"
            />
            <input-pregunta
                :respuesta="model.respuestas.nivel_sisben"
                :pregunta="preguntas.nivel_sisben"
                sm="6"
                md="4"
            />
          </v-row>
        </v-col>
        <input-pregunta
            :respuesta="model.respuestas.tipos_vivienda"
            :pregunta="preguntas.tipos_vivienda"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_tenecia"
            :pregunta="preguntas.tipos_tenecia"
        />
        <input-pregunta
            :respuesta="model.respuestas.servicios_sanitarios"
            :pregunta="preguntas.servicios_sanitarios"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_alumbrado"
            :pregunta="preguntas.tipos_alumbrado"
        />
        <input-pregunta
            :respuesta="model.respuestas.dormitorios"
            :pregunta="preguntas.dormitorios"
        />
        <input-pregunta
            :respuesta="model.respuestas.humo_vivienda"
            :pregunta="preguntas.humo_vivienda"
        />
        <input-pregunta
            :respuesta="model.respuestas.fuentes_agua"
            :pregunta="preguntas.fuentes_agua"
        />
        <input-pregunta
            :respuesta="model.respuestas.tratamiento_agua"
            :pregunta="preguntas.tratamiento_agua"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_tratamiento_agua"
            :pregunta="preguntas.tipos_tratamiento_agua"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_disposicion_basura"
            :pregunta="preguntas.tipos_disposicion_basura"
        />
        <input-pregunta
            :respuesta="model.respuestas.reciclan"
            :pregunta="preguntas.reciclan"
        />
        <input-pregunta
            :respuesta="model.respuestas.iluminacion_adecuada"
            :pregunta="preguntas.iluminacion_adecuada"
        />
        <input-pregunta
            :respuesta="model.respuestas.ventilacion_adecuada"
            :pregunta="preguntas.ventilacion_adecuada"
        />
        <input-pregunta
            :respuesta="model.respuestas.roedores"
            :pregunta="preguntas.roedores"
        />
        <input-pregunta
            :respuesta="model.respuestas.reservorios_agua"
            :pregunta="preguntas.reservorios_agua"
        />
        <input-pregunta
            :respuesta="model.respuestas.anjeos"
            :pregunta="preguntas.anjeos"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_insectos_vectores"
            :pregunta="preguntas.tipos_insectos_vectores"
        />
        <input-pregunta
            :respuesta="model.respuestas.conservacion_alimentos"
            :pregunta="preguntas.conservacion_alimentos"
        />
        <input-pregunta
            :respuesta="model.respuestas.actividad_productiva"
            :pregunta="preguntas.actividad_productiva"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_material_piso"
            :pregunta="preguntas.tipos_material_piso"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_material_techo"
            :pregunta="preguntas.tipos_material_techo"
        />
        <input-pregunta
            :respuesta="model.respuestas.tipos_material_paredes"
            :pregunta="preguntas.tipos_material_paredes"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import InputPregunta from '@/modules/aps/components/InputPregunta'
export default {
  name: 'ViviendaHogar',
  components: {InputPregunta},
  props: {
    seccion: {
      type:Object,
      default: null
    }
  },
  computed: {
    ...mapState('aps',['preguntas']),
    model:{
      get() {
        return this.seccion
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>