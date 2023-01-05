import {uuid} from 'vue-uuid'

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
                        if (data?.data?.encuesta) {
                            let hogar = JSON.parse(data.data.encuesta)
                            resolve(hogar)
                        } else resolve(null)
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
                        if (data?.data) resolve(data.data)
                        else resolve(null)
                    })
                    .catch(error => {
                        this.$store.commit('snackbar/setError', {error})
                        resolve(null)
                    })
            })
        },
        convertirDataIntegrante(dataEncuesta, copiaIntegrante) {
            if (!copiaIntegrante.id) copiaIntegrante.id = uuid.v1()
            copiaIntegrante.hogar_id = dataEncuesta.id
            if (copiaIntegrante.secciones) Object.values(copiaIntegrante.secciones).forEach(seccion => {
                this.validadorSeccionIntegrante(seccion, copiaIntegrante)
            })
            const indexIntegrante = dataEncuesta.integrantes.findIndex(x => x.id === copiaIntegrante.id)
            if (indexIntegrante > -1) dataEncuesta.integrantes.splice(indexIntegrante, 1)
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
        },
        validadorSeccionIntegrante(seccion, integrante) {
            const edad = integrante?.fecha_nacimiento && this.calculateAge(integrante.fecha_nacimiento) || null
            const sexo = integrante?.sexo || null
            if(seccion && integrante && edad?.days){
                switch (seccion.ref_seccion) {
                    case 'primera_infancia': {
                        if (edad?.years > 5) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            seccion.respuestas['pi_vacuna_bcg_rn'].showSeccion = edad.totalMonths >= 0
                            seccion.respuestas['pi_vacuna_polio_d1'].showSeccion = edad.totalMonths >= 2
                            seccion.respuestas['pi_vacuna_polio_d2'].showSeccion = edad.totalMonths >= 4
                            seccion.respuestas['pi_vacuna_polio_d3'].showSeccion = edad.totalMonths >= 6
                            seccion.respuestas['pi_vacuna_polio_r1'].showSeccion = edad.totalMonths >= 18
                            seccion.respuestas['pi_vacuna_polio_r2'].showSeccion = edad.years >= 5
                            seccion.respuestas['pi_vacuna_hepatitis_a'].showSeccion = edad.totalMonths >= 12
                            seccion.respuestas['pi_vacuna_hepatitis_b_rn'].showSeccion = edad.totalMonths >= 0
                            seccion.respuestas['pi_vacuna_influenza_estacional'].showSeccion = edad.totalMonths >= 6
                            seccion.respuestas['pi_vacuna_neumococo_d1'].showSeccion = edad.totalMonths >= 2
                            seccion.respuestas['pi_vacuna_neumococo_d2'].showSeccion = edad.totalMonths >= 4
                            seccion.respuestas['pi_vacuna_neumococo_d3'].showSeccion = edad.totalMonths >= 12
                            seccion.respuestas['pi_vacuna_rotavirus_d1'].showSeccion = edad.totalMonths >= 2
                            seccion.respuestas['pi_vacuna_rotavirus_d2'].showSeccion = edad.totalMonths >= 4
                            seccion.respuestas['pi_vacuna_fiebre_amarilla'].showSeccion = edad.totalMonths >= 18
                            seccion.respuestas['pi_vacuna_dpt_d1'].showSeccion = edad.totalMonths >= 18
                            seccion.respuestas['pi_vacuna_dpt_d2'].showSeccion = edad.years >= 5
                            seccion.respuestas['pi_vacuna_pentavalente_d1'].showSeccion = edad.totalMonths >= 2
                            seccion.respuestas['pi_vacuna_pentavalente_d2'].showSeccion = edad.totalMonths >= 4
                            seccion.respuestas['pi_vacuna_pentavalente_d3'].showSeccion = edad.totalMonths >= 6
                            seccion.respuestas['pi_vacuna_srp_d1'].showSeccion = edad.totalMonths >= 12
                            seccion.respuestas['pi_vacuna_srp_d2'].showSeccion = edad.years >= 5
                            seccion.respuestas['pi_vacuna_varicela'].showSeccion = edad.totalMonths >= 12

                            seccion.respuestas['pi_atencion_medica'].showSeccion = (edad.totalMonths === 1) || (edad.totalMonths === 4) || (edad.totalMonths === 5) || (edad.totalMonths >= 12 && edad.totalMonths <= 18) || (edad.totalMonths >= 24 && edad.totalMonths <= 29) || (edad.years === 3) || (edad.years === 4)
                            seccion.respuestas['pi_atencion_enfermeria'].showSeccion = (edad.totalMonths === 2) || (edad.totalMonths === 3) || (edad.totalMonths >= 6 && edad.totalMonths <= 11) || (edad.totalMonths >= 19 && edad.totalMonths <= 23) || (edad.totalMonths >= 30 && edad.totalMonths <= 35) || (edad.years === 4)
                            seccion.respuestas['pi_atencion_lactancia'].showSeccion = (edad.totalMonths >= 1 && edad.totalMonths <= 6)

                            seccion.respuestas['pi_fluor'].showSeccion = (edad.years >= 1 && edad.years <= 5)
                            seccion.respuestas['pi_profilaxis'].showSeccion = (edad.years >= 1 && edad.years <= 5)
                            seccion.respuestas['pi_sellantes'].showSeccion = edad.years === 3
                            seccion.respuestas['pi_consulta_odontologica'].showSeccion = (edad.totalMonths >= 6 && edad.years <= 5)
                            seccion.show = true
                        }
                        break
                    }
                    case 'infancia': {
                        if (edad?.years <= 5 || edad?.years >= 12) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            seccion.respuestas['juv_cancer_cuello_uterino'].showSeccion = (edad.years >= 9 && edad.totalMonths <= 11)
                            seccion.respuestas['in_vacuna_vph_d1'].showSeccion = (edad.years >= 9 && edad.totalMonths <= 11)
                            seccion.respuestas['in_vacuna_vph_d2'].showSeccion = (edad.years >= 9 && edad.totalMonths <= 11)
                            seccion.respuestas['in_vacuna_vph_d3'].showSeccion = (edad.years >= 9 && edad.totalMonths <= 11)

                            seccion.respuestas['in_atencion_medica'].showSeccion = (edad.years === 6) || (edad.years === 8) || (edad.years === 10)
                            seccion.respuestas['in_atencion_enfermeria'].showSeccion = (edad.years === 7) || (edad.years === 9) || (edad.years === 11)

                            seccion.respuestas['in_consulta_odontologica'].showSeccion = (edad.years >= 6 && edad.years <= 11)
                            seccion.respuestas['in_fluor'].showSeccion = (edad.years >= 6 && edad.years <= 11)
                            seccion.respuestas['in_profilaxis'].showSeccion = (edad.years >= 6 && edad.years <= 11)
                            seccion.respuestas['in_sellantes'].showSeccion = (edad.years >= 6 && edad.years <= 11)
                            seccion.show = true
                        }
                        break
                    }
                    case 'adolecencia': {
                        if (edad?.years <= 11 || edad?.years >= 18) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            seccion.respuestas['adol_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adol_metodo_planficica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adol_desde_cuando_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adol_razon_no_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adol_atencion_medica'].showSeccion = (edad.years === 12) || (edad.years === 14) || (edad.years === 16)
                            seccion.respuestas['adol_atencion_enfermeria'].showSeccion = (edad.years === 13) || (edad.years === 15) || (edad.years === 17)
                            seccion.show = true
                        }
                        break
                    }
                    case 'juventud': {
                        if (edad?.years <= 17 || edad?.years >= 29) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            seccion.respuestas['juv_cancer_cuello_uterino'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_colposcopia'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_bioscopia_cervico'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_examen_seno'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_metodo_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_tiempo_metodo'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_razones_no_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_atencion_enfermeria'].showSeccion = (edad.years >= 20 && edad.years <= 28)
                            seccion.respuestas['juv_vasectomia'].showSeccion = sexo === 'Masculino'
                            seccion.respuestas['juv_esterilizacion_femenina'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_vias_esterilizacion'].showSeccion = sexo === 'Femenino'
                            seccion.show = true
                        }
                        break
                    }
                }
            }
        }
    }
}
