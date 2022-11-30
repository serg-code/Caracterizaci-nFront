<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <c-tooltip tooltip="Nueva encuesta" top>
          <v-btn
              color="primary"
              :to="{name: 'RegistroEncuestaAPS'}"
          >
            <v-icon class="white--text">mdi-plus</v-icon>
            Encuesta
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
  </v-container>
</template>

<script>
export default {
  name: 'ListEncuestas',
}
</script>