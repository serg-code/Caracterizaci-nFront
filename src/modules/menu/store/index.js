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
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'encuestasAPS'))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'integrantesAPS'))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'areasTerritorialesAPS'))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'usuarios'))
        if(rootGetters['auth/permissionByName']('roles.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 'roles'))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 'roles'))
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
