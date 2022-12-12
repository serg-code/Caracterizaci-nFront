export default {
    methods: {
        async integranteSave(data) {
            return await new Promise(resolve => {
                data.integrante.secciones = data.integrante.secciones ? this.convertirSecciones(data.integrante.secciones) : []
                this.axios.post('integrante', data)
                    .then(({data}) => resolve(data?.data?.integrante || null))
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        async integranteSaveFull(data) {
            return await new Promise(resolve => {
                data.integrante.secciones = data.integrante.secciones ? this.convertirSecciones(data.integrante.secciones) : []
                this.axios.post('integrante/completo', data)
                    .then(({data}) => resolve(data?.data?.integrante || null))
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        async encuestaSave(encuesta) {
            return await new Promise(resolve => {
                encuesta.hogar.secciones = encuesta.hogar.secciones ? this.convertirSecciones(encuesta.hogar.secciones) : []
                this.axios.post('respuestas', encuesta)
                    .then(({data}) => resolve(data?.data?.hogar || null))
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        async encuestaSaveFull(encuesta) {
            return await new Promise(resolve => {
                encuesta.hogar.secciones = encuesta.hogar.secciones ? this.convertirSecciones(encuesta.hogar.secciones) : []
                this.axios.post('respuestas/completo', encuesta)
                    .then(({data}) => resolve(data?.data?.hogar || null))
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        async encuestaGet(uuid) {
            return await new Promise(resolve => {
                this.axios.get(`hogar/${uuid}`)
                    .then(({data}) => {
                        if(data?.data?.encuesta) {
                            let hogar = JSON.parse(data.data.encuesta)
                            resolve(hogar)
                        }
                        else resolve(null)
                    })
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        convertirSecciones(secciones) {
            secciones = Object.values(secciones)
            secciones.forEach(x => {
                Object.entries(x.respuestas).map(z => {
                    x.respuestas[z[0]] = z[1].model
                })
            })
            return secciones
        }
    }
}
