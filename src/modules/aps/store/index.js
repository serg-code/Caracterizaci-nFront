import Vue from 'vue'
import Municipios from '@/modules/aps/data/Municipios'
import Departamentos from '@/modules/aps/data/Departamentos'

const state = {
    departamentos: Departamentos,
    municipios: Municipios,
    barrios: [],
    zonas: [],
    preguntas: null,
    hogares: null,
}

const getters = {
}

const actions = {
    async getPreguntas(context) {
        return await new Promise(resolve => {
            Vue.axios.get('preguntas')
                .then(({data}) => {
                    context.commit('setPreguntas', data?.data?.preguntas || null)
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
        state.preguntas = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
