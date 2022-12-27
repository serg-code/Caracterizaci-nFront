import {uuid} from "vue-uuid";

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
        async integranteDelete(id) {
            return await new Promise(resolve => {
                this.axios.delete(`integrante/${id}`)
                    .then(({data}) => {
                        console.log('data', data)
                        resolve(true)
                    })
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(false)
                    })
            })
        },
        async encuestaSave(encuesta) {
            return await new Promise(resolve => {
                encuesta.hogar.secciones = encuesta.hogar.secciones ? this.convertirSecciones(encuesta.hogar.secciones) : []
                this.axios.post('hogar', encuesta)
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
                this.axios.post('hogar/completo', encuesta)
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
        async encuestaResultGet(uuid) {
            return await new Promise(resolve => {
                this.axios.get(`hogar/${uuid}`)
                    .then(({data}) => {
                        if(data?.data) resolve(data.data)
                        else resolve(null)
                    })
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        convertirDataIntegrante(dataEncuesta, copiaIntegrante){
            if(!copiaIntegrante.id) copiaIntegrante.id = uuid.v1()
            copiaIntegrante.hogar_id = dataEncuesta.id
            const indexIntegrante = dataEncuesta.integrantes.findIndex(x => x.id === copiaIntegrante.id)
            if(indexIntegrante > -1) dataEncuesta.integrantes.splice(indexIntegrante, 1)
            dataEncuesta.integrantes.splice(0, 0, copiaIntegrante)
            dataEncuesta.encuesta = this.clone(dataEncuesta)
            const dataIntegrante = this.clone(copiaIntegrante)
            return {dataEncuesta, dataIntegrante, copiaIntegrante}
        },
        convertirSecciones(secciones) {
            // secciones = Object.values(secciones)
            Object.values(secciones).forEach(x => {
                Object.entries(x.respuestas).map(z => {
                    x.respuestas[z[0]] = z[1].model
                })
            })
            return secciones
        }
    }
}
