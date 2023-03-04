export default {
    path: '/roles',
    redirect: { name: 'Roles' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'Roles',
            path: '/roles',
            component: () => import('@/modules/roles/views/Roles.vue'),
            meta: {
                requireAuth: true,
                permission: 'roles.listar',
                title: 'Roles',
                footer: true
            }
        }
    ]
}