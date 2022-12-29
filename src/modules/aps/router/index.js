export default {
    path: '/aps',
    redirect: { name: 'EncuestasAPS' },
    component: () => import('@/layouts/default/Layout'),
    children: [
        {
            name: 'IntegrantesAPS',
            path: 'integrantes',
            component: () => import('@/modules/aps/views/Integrantes.vue'),
            meta: {
                requiresAuth: true,
                title: 'Encuestados APS',
                footer: true
            }
        },
        {
            name: 'EncuestasAPS',
            path: 'encuestas',
            component: () => import('@/modules/aps/views/Encuestas.vue'),
            meta: {
                requiresAuth: true,
                title: 'Encuestas APS',
                footer: true
            }
        },
        {
            name: 'RegistroEncuestaAPS',
            path: 'registro-encuesta/:uuid?',
            props: true,
            component: () => import('@/modules/aps/views/RegistroEncuesta.vue'),
            meta: {
                requiresAuth: true,
                title: 'Registro de encuesta',
                footer: true
            }
        },
        {
            name: 'ResultadosEncuestaAPS',
            path: 'resultado-encuesta/:uuid?',
            props: true,
            component: () => import('@/modules/aps/views/ResultadoEncuesta.vue'),
            meta: {
                requiresAuth: true,
                title: 'Resultado de encuesta',
                footer: true
            }
        }
    ]
}