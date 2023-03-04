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
                requireAuth: true,
                permission: 'integrante.listar',
                title: 'Encuestados APS',
                footer: true
            }
        },
        {
            name: 'EncuestasAPS',
            path: 'encuestas',
            component: () => import('@/modules/aps/views/Encuestas.vue'),
            meta: {
                requireAuth: true,
                permission: 'hogar.listar',
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
                requireAuth: true,
                permission: 'hogar.crear',
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
                requireAuth: true,
                permission: 'hogar.resultados',
                title: 'Resultado de encuesta',
                footer: true
            }
        },
        {
            name: 'AreasTerritorialesAPS',
            path: 'areas-territoriales',
            component: () => import('@/modules/aps/views/AreasTerritoriales.vue'),
            meta: {
                requireAuth: true,
                permission: 'BarrioVereda.listar',
                title: 'Areas territoriales',
                footer: true
            }
        },
        {
            name: 'MapaHogaresAPS',
            path: 'georreferenciacion-hogares',
            component: () => import('@/modules/aps/views/MapaHogares.vue'),
            meta: {
                requireAuth: true,
                permission: 'mapa.ver',
                title: 'Georreferenciación hogares',
                footer: true
            }
        }
    ]
}