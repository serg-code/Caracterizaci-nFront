export default {
    path: '/users',
    redirect: { name: 'Usuarios' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'Usuarios',
            path: '/users',
            component: () => import('@/modules/users/views/Users.vue'),
            meta: {
                requiresAuth: true,
                title: 'Usuarios',
                footer: true
            }
        }
    ]
}