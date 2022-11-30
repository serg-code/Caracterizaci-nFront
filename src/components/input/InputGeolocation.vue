<template>
  <ValidationProvider
      :name="name"
      :vid="vid"
      :rules="rules"
      v-slot="{ errors }"
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
        :persistent-hint="persistentHint"
        :hint="hint"
        :hide-details="hideDetails"
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
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-progress-circular
              v-if="loadingLocation"
              size="24"
              color="info"
              indeterminate
          />
          <v-icon
              v-else
              color="primary"
              style="margin-top: 2px !important;"
              @click.stop="getLocation"
          >
            mdi-map-marker-right
          </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import InputMixin from '@/mixins/InputMixin'

export default {
  name: 'InputGeolocation',
  mixins: [InputMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
  },
  data: () => ({
    loadingLocation: false
  }),
  computed: {
    model: {
      get() {
        return ((typeof this.value !== 'undefined') ? this.value : null)
      },
      set(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        this.loadingLocation = true
        navigator.geolocation.getCurrentPosition(objPosition => {
          setTimeout(() => {
            this.model = `${objPosition.coords.latitude}, ${objPosition.coords.longitude}`
            this.loadingLocation = false
          }, 1000)
        }, objPositionError => {
          let message = ''
          switch (objPositionError.code) {
            case objPositionError.PERMISSION_DENIED:
              message = 'No se ha permitido el acceso a la posición del usuario.'
              break;
            case objPositionError.POSITION_UNAVAILABLE:
              message = 'No se ha podido acceder a la información de su posición.'
              break;
            case objPositionError.TIMEOUT:
              message = 'El servicio ha tardado demasiado tiempo en responder.'
              break;
            default:
              message = 'Error desconocido.'
          }
          setTimeout(() => {
            this.$store.commit('snackbar/set', {color: 'error', message: message})
            this.loadingLocation = false
          }, 1000)
        }, {
          maximumAge: 75000,
          timeout: 15000
        });
      } else {
        this.$store.commit('snackbar/set', {
          color: 'warning',
          message: 'Su navegador no soporta la API de geolocalización.'
        })
      }
    }
  }
}
</script>