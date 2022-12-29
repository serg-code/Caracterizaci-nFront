import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import store from '@/store'

import auth from '@/modules/auth/router'
import settings from '@/modules/settings/router'
import aps from '@/modules/aps/router'
import users from '@/modules/users/router'
import roles from '@/modules/roles/router'

Vue.use(VueRouter)

const routes = [
    settings,
    auth,
    aps,
    users,
    roles
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0
        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }
        return goTo(scrollTo)
    },
    routes
})

router.beforeEach(async (to, from, next) => {
    document.title = `SosaludAPS | ${to.meta.title}`
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!store.state.auth.access_token) {
            next({name: 'Login'})
        } else if (!to.meta.permission || (await store.getters['auth/permissionByName'](to.meta.permission))) {
            next()
        } else {
            setTimeout(() => {
                store.commit('snackbar/set', {
                    color: 'warning',
                    message: `No tiene permisos para entrar en ${to.meta.title}.`
                })
            }, 200)
            next({name: 'Home'})
        }
    } else {
        next()
    }
})

export default router
