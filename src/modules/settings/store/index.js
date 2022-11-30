// state
const state = {
    navigationDrawer: true,
    customizerDrawer: false,
    darkMode: false,
    primaryColor: '#1C4A75',
    optionsPrimary: [
        '#00A1E5',
        '#55BB46',
        '#1C4A75',
        '#563DEA',
        '#9C27B0',
        '#00B278'
    ]
}

// getters
const getters = {
    swatchesPrimary: state => {
        let swatchesPrimary = []
        const primaryColors = state.optionsPrimary
        const length = 2
        for (let i = 0; i < primaryColors.length; i += length) {
            const swatchesRow = primaryColors.slice(i, i + length)
            swatchesPrimary.push(swatchesRow)
        }
        return swatchesPrimary
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
    setCustomizerDrawer(state, show) {
        state.customizerDrawer = show
    },
    setThemeMode (state, dark) {
        state.darkMode = dark
    },
    setThemeColor (state, color) {
        state.primaryColor = color
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
