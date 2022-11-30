export default {
    path: '/auth',
    redirect: { name: 'Login' },
    component: () => import('@/layouts/blank/Blank'),
    children: [
        {
            name: 'Login',
            path: 'login',
            component: () => import('@/modules/auth/views/Login'),
            meta: {
                requiresAuth: false,
                title: 'Login',
                footer: true
            }
        }
    ]
}