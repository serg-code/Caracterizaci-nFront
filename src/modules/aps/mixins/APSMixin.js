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
        fueraRespuesta(respuesta) {
            respuesta.show = false
            respuesta.model = null
            respuesta.valor = 0
            return respuesta
        },
        calculaRiesgoIntegrante(copiaIntegrante) {
            console.log('copiaIntegrante', copiaIntegrante)
            return copiaIntegrante
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
        getIMC(peso, talla) {
            let hintIMC = ''
            let resultado = null
            if (Number(peso) && Number(talla)) {
                resultado = Number((Number(peso) / Math.pow((Number(talla) / 100), 2)).toFixed(2))
                if (resultado < 18.5) hintIMC = 'Bajo peso'
                if (resultado >= 18.5 && resultado < 25) hintIMC = 'Peso normal'
                if (resultado >= 25 && resultado < 30) hintIMC = 'Sobrepeso'
                if (resultado >= 30 && resultado < 35) hintIMC = 'Obesidad (grado 1)'
                if (resultado >= 35 && resultado < 40) hintIMC = 'Obesidad (grado 2)'
                if (resultado >= 40) hintIMC = 'Obesidad (grado 3)'
                return {resultado, hintIMC}
            } else {
                return {resultado, hintIMC}
            }
        },
        calculaPorcentaje(item) {
            return item.puntaje_obtenido && item.puntaje_max ? ((item.puntaje_obtenido*100)/item.puntaje_max).toFixed(2) : 0
        },
        validadorSeccionIntegrante(seccion, integrante) {
            const edad = integrante?.fecha_nacimiento && this.calculateAge(integrante.fecha_nacimiento) || null
            const sexo = integrante?.sexo || null
            console.log('seccion', seccion)
            if(seccion && integrante){
                switch (seccion.ref_seccion) {
                    case 'cuidado_enfermedades': {
                        const keys = [
                            'ha_estado_embarazada',
                            'cuantos_embarazos_ha_tenido',
                            'hijos_muertos_parto_natural',
                            'hijos_vivos_parto_natural',
                            'hijos_muertos_por_cesarea',
                            'hijos_vivos_por_cesarea',
                            'cuantos_abortos',
                            'cuantos_gemelos_multiples'
                        ]
                        if(sexo === 'Femenino' && edad?.years >= 10){
                            keys.forEach(x => {
                                seccion.respuestas[x].showSeccion = true
                            })
                        } else{
                            keys.forEach(x => {
                                seccion.respuestas[x].showSeccion = false
                                seccion.respuestas[x].model = null
                            })
                        }
                        break
                    }
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
                    case 'adolescencia': {
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
                            seccion.respuestas['juv_control_medico_examen_colposcopia'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_bioscopia_cervico'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_examen_seno'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['juv_control_medico_examen_seno'].showSeccion = sexo === 'Femenino'
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
                    case 'adultez': {
                        if (edad?.years <= 28 || edad?.years >= 60) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            seccion.respuestas['adul_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adul_metodo_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adul_desde_cuando_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adul_razones_no_planifica'].showSeccion = sexo === 'Femenino'

                            seccion.respuestas['adul_cancer_cuello_uterino_adn_vph'].showSeccion = sexo === 'Femenino' && (edad.years >= 30 && edad.years <= 59)
                            seccion.respuestas['adul_cancer_cuello_uterino_adn_vph_positivo'].showSeccion = sexo === 'Femenino' && (edad.years >= 30 && edad.years <= 59)
                            seccion.respuestas['adul_colposcopia_cervico_uterina'].showSeccion = sexo === 'Femenino' && (edad.years >= 30 && edad.years <= 59)
                            seccion.respuestas['adul_biopsia_cervico_uterina'].showSeccion = sexo === 'Femenino' && (edad.years >= 30 && edad.years <= 59)
                            seccion.respuestas['adul_cancer_mama_mamografia'].showSeccion = sexo === 'Femenino' && (edad.years >= 50 && edad.years <= 59)
                            seccion.respuestas['adul_cancer_mama_valoracion_clinica'].showSeccion = sexo === 'Femenino' && (edad.years >= 40 && edad.years <= 59)
                            seccion.respuestas['adul_cancer_prostata'].showSeccion = sexo === 'Masculino' && (edad.years >= 50 && edad.years <= 59)
                            seccion.respuestas['adul_vasectomia'].showSeccion = sexo === 'Masculino'
                            seccion.respuestas['adul_esterilizacion_femenina'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['adul_vias_esterilizacion'].showSeccion = sexo === 'Femenino'
                            seccion.show = true
                        }
                        break
                    }
                    case 'vejez': {
                        if (edad?.years < 60) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            seccion.respuestas['ve_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_metodo_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_desde_cuando_planifica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_razones_no_planifica'].showSeccion = sexo === 'Femenino'

                            seccion.respuestas['ve_cancer_cuello_uterino_adn_vph'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_cancer_cuello_uterino_adn_vph_positivo'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_colposcopia_uterina'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_bioscopia_uterina'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_cancer_mama_mamografia'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_cancer_mama_valoracion_clinica'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_cancer_prostata_psa'].showSeccion = sexo === 'Masculino'
                            seccion.respuestas['ve_cancer_prostata_rectal'].showSeccion = sexo === 'Masculino'
                            seccion.respuestas['ve_vasectomia'].showSeccion = sexo === 'Masculino'
                            seccion.respuestas['ve_esterilizacion_femenina'].showSeccion = sexo === 'Femenino'
                            seccion.respuestas['ve_vias_esterilizacion'].showSeccion = sexo === 'Femenino'
                            seccion.show = true
                        }
                        break
                    }
                    case 'table_materno_perinatal': {
                        if (sexo === 'Masculino' || edad?.years < 10) {
                            Object.values(seccion.respuestas).forEach(x => {
                                x.model = null
                            })
                            seccion.show = false
                        } else {
                            // seccion.respuestas['ve_planifica'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_metodo_planifica'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_desde_cuando_planifica'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_razones_no_planifica'].showSeccion = sexo === 'Femenino'
                            //
                            // seccion.respuestas['ve_cancer_cuello_uterino_adn_vph'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_cancer_cuello_uterino_adn_vph_positivo'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_colposcopia_uterina'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_bioscopia_uterina'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_cancer_mama_mamografia'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_cancer_mama_valoracion_clinica'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_cancer_prostata_psa'].showSeccion = sexo === 'Masculino'
                            // seccion.respuestas['ve_cancer_prostata_rectal'].showSeccion = sexo === 'Masculino'
                            // seccion.respuestas['ve_vasectomia'].showSeccion = sexo === 'Masculino'
                            // seccion.respuestas['ve_esterilizacion_femenina'].showSeccion = sexo === 'Femenino'
                            // seccion.respuestas['ve_vias_esterilizacion'].showSeccion = sexo === 'Femenino'
                            seccion.show = true
                        }
                        break
                    }
                }
            }
        }
    }
}
