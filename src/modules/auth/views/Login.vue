<template>
  <v-container fluid class="pa-md-0" style="height: 100%">
    <v-row justify="center" style="height: 100%; margin: 0">
      <v-col
          cols="12"
          md="6"
          lg="7"
          xl="8"
          class="primary d-none d-md-flex align-center justify-center"
      >
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="8" xl="6">
<!--              <img-->
<!--                  width="100%"-->
<!--                  src="@/assets/images/client/session.png"-->
<!--              />-->
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                cols="8"
                xl="6"
            >
              <div>
                <h2 class="display-1 white--text font-weight-medium text-center">
<!--                  {{ clientName }}-->
                  Nombre cliente
                </h2>
<!--                <h6-->
<!--                    v-if="clientDescription"-->
<!--                    class="subtitle-1 mt-4 white&#45;&#45;text op-5 font-weight-regular text-center"-->
<!--                >-->
<!--                  {{ clientDescription }}-->
<!--                </h6>-->
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col
          cols="12"
          md="6"
          lg="5"
          xl="4"
          class="d-flex align-center justify-center"
          :class="$vuetify.breakpoint.smAndDown ? 'pt-4 pb-8' : ''"
      >
        <global-loading v-model="loading" absolute/>
        <v-container
            fluid
        >
          <v-row justify="center">
            <v-col
                cols="12"
                sm="8"
                md="10"
                lg="8"
                class="align-center justify-center"
            >
              <v-row
                  justify="center"
                  class="mb-6"
              >
<!--                <img-->
<!--                    v-if="darkMode"-->
<!--                    width="100%"-->
<!--                    src="@/assets/images/logo/session.png"-->
<!--                />-->
<!--                <img-->
<!--                    v-else-->
<!--                    width="100%"-->
<!--                    src="@/assets/images/logo/session.png"-->
<!--                />-->
              </v-row>
              <v-row justify="center">
                <v-col
                    v-if="$vuetify.breakpoint.smAndDown"
                    cols="12"
                    class="text-center"
                >
<!--                  <h2>{{ clientName }}</h2>-->
                  <h2>Nombre cliente</h2>
                </v-col>
                <v-col cols="12" class="text-center">
                  <p>Ingrese nombre de usuario y contraseña para acceder al panel de control.</p>
                </v-col>
                <v-col cols="12">
                  <ValidationObserver
                      ref="formLogin"
                      tag="form"
                      v-slot="{ invalid }"
                      @submit.prevent="signIn"
                  >
                    <v-row>
                      <v-col cols="12">
                        <input-text
                            v-model="email"
                            label="Correo electrónico"
                            name="Correo electrónico"
                            rules="required|email"
                            :dense="false"
                        />
                      </v-col>
                      <v-col cols="12">
                        <input-password
                            v-model="password"
                            label="Contraseña"
                            rules="required"
                            name="contraseña"
                            :dense="false"
                        />
                      </v-col>
                    </v-row>
                    <div class="d-block d-sm-flex align-center">
                      <v-checkbox
                          v-model="remember"
                          :true-value="1"
                          :false-value="0"
                          label="Recordar mis credenciales"
                      />
                    </div>
                    <v-btn
                        type="submit"
                        :disabled="invalid"
                        color="primary"
                        class="mb-2"
                        block
                        submit
                        x-large
                    >Iniciar Sesión
                    </v-btn>
                  </ValidationObserver>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginView',
  data: () => ({
    email: null,
    password: null,
    remember: 0,
    loading: false
  }),
  methods: {
    signIn () {
      this.$refs.formLogin.validate().then(result => {
        if (result) {
          this.loading = true
          this.$store.dispatch('auth/login', { email: this.email, password: this.password, remember_token: this.remember, device: 'mi equipo' })
              .then(resolve => {
                if (resolve) this.$router.push({name: 'Home'})
                this.loading = false
              })
        }
      })
    }
  }
}
</script>