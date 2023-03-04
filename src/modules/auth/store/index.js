import Vue from 'vue'

const state = {
    access_token: null,
    expires_at: null,
    token_type: null,
    user: null
}

const getters = {
    permissions: state => {
        if (state.user?.permisos?.length) {
            return state.user.permisos.reduce((value, key) => {
                value[key] = value[key] || true
                return value
            }, {})
        }
        return {}
    },
    permissionByName: state => name => {
        return name ? state.user?.permisos?.length && !!state.user.permisos.find(x => x.referencia.toString() === name.toString()) : true
    },
    permissionsByModule: state => modulo => {
        if (state.user?.permisos?.length) {
            return state.user.permisos.filter(x => x.referencia.toString().toLowerCase().split('.')[0] ===  modulo.toString().toLowerCase()).map(x => x.referencia.split(`${modulo}.`)[1]).reduce((value, key) => {
                value[key] = value[key] || true
                return value
            }, {})
        }
        return {}
    }
}

const actions = {
    async login(context, user) {
        return await new Promise(resolve => {
            Vue.axios.post('login', user)
                .then(({data}) => {
                    context.commit('setDataLogin', data?.data || null)
                    context.commit('setUser', data?.data?.usuario || null)
                    context.commit('setDefaultAxios')
                    resolve(true)
                })
                .catch(error => {
                    context.commit('snackbar/setError', { error }, { root: true })
                    resolve(false)
                })
        })
    },
    async getUser(context) {
        return await new Promise(resolve => {
            Vue.axios.get('usuario')
                .then(({data}) => {
                    context.commit('setUser', data?.data?.usuario || null)
                    resolve(true)
                })
                .catch(() => {
                    context.commit('snackbar/setError', { color: 'error', message: 'Error al recuperar el usuario actual.' }, { root: true })
                    resolve(false)
                })
        })
    },
    async logout(context) {
        return await new Promise(resolve => {
            Vue.axios.post('logout')
                .then(() => {
                    context.commit('setLogout')
                    resolve(true)
                })
                .catch(() => {
                    context.commit('snackbar/setError', { color: 'error', message: 'Error al cerrar sesión.' }, { root: true })
                    resolve(false)
                })
        })
    }
}

const mutations = {
    setDataLogin(state, data) {
        state.token_type = 'Bearer'
        state.access_token = data.token
        state.expires_at = null
    },
    setDefaultAxios(state) {
        if (state.access_token && state.token_type) {
            Vue.axios.defaults.headers.common.Authorization = `${state.token_type} ${state.access_token}`
        }
    },
    setLogout(state) {
        state.token_type = null
        state.access_token = null
        state.expires_at = null
        state.user = null
        Vue.axios.defaults.headers.common.Authorization = null
    },
    setUser(state, data) {
        state.user = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
