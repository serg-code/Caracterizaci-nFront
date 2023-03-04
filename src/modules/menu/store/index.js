import { itemsMenu } from './data'
// state
const state = {
    itemsMenu
}

// getters
const getters = {
    itemsMenu: (state, getters, rootState, rootGetters) => {
        let menuPrincipal = []
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'inicio'))
        if(rootGetters['auth/permissionByName']('hogar.listar')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'encuestasAPS'))
        if(rootGetters['auth/permissionByName']('integrante.listar')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'integrantesAPS'))
        if(rootGetters['auth/permissionByName']('mapa.ver')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'mapaHogaresAPS'))
        if(rootGetters['auth/permissionByName']('BarrioVereda.listar')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'areasTerritorialesAPS'))
        if(rootGetters['auth/permissionByName']('reportes.listar')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'reportes'))
        if(rootGetters['auth/permissionByName']('usuarios.listar'))menuPrincipal.push(state.itemsMenu.find(x => x.id === 'usuarios'))
        if(rootGetters['auth/permissionByName']('roles.listar')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'roles'))
        return menuPrincipal
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
