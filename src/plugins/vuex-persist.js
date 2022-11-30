import VuexPersistence from 'vuex-persist'

export default new VuexPersistence({
    key: 'SosaludAPS',
    storage: window.localStorage,
    modules: [
        'auth',
        'settings',
        'aps'
    ]
})