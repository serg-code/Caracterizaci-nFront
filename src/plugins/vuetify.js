import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
    primary: '#4CAF50',
    secondary: '#9C27b0',
    accent: '#9C27b0',
    info: '#00CAE3',
}

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    }
})
