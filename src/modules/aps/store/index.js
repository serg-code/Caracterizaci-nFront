import Vue from 'vue'
import Municipios from '@/modules/aps/data/Municipios'
import Departamentos from '@/modules/aps/data/Departamentos'
import Rhs from '@/modules/aps/data/Rhs'
import EstadosCiviles from '@/modules/aps/data/EstadosCiviles'
import Zonas from '@/modules/aps/data/Zonas'

const state = {
    departamentos: Departamentos,
    municipios: Municipios,
    barrios: [],
    zonas: Zonas,
    preguntas: null,
    preguntasIntegrante: null,
    hogares: null,
    tiposIdentificacion:[],
    rhs: Rhs,
    estadosCiviles: EstadosCiviles,
}

const getters = {
}

const actions = {
    async getPreguntas(context) {
        return await new Promise(resolve => {
            Vue.axios.get('preguntas')
                .then(({data}) => {
                    context.commit('setPreguntas', data?.data || null)
                    resolve(true)
                })
                .catch(error => {
                    context.commit('snackbar/setError', { color: 'error', error }, { root: true })
                    resolve(false)
                })
        })
    },
    async getTiposIdentificacion(context) {
        return await new Promise(resolve => {
            Vue.axios.get('tipo-identificacion')
                .then(({data}) => {
                    console.log('dataaaaaa', data)
                    context.commit('setTiposIdentificacion', data?.data?.tipos_identificacion || null)
                    resolve(true)
                })
                .catch(error => {
                    context.commit('snackbar/setError', { color: 'error', error }, { root: true })
                    resolve(false)
                })
        })
    }
}

const mutations = {
    setPreguntas(state, data) {
        state.preguntas = data.hogar
        state.preguntasIntegrante = data.integrantes
    },
    setTiposIdentificacion(state, data) {
        state.tiposIdentificacion = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
