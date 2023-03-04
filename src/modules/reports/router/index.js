const routes = {
  path: '/reports',
  redirect: { name: 'Reports' },
  component: () => import('@/layouts/default/Layout'),
  children: [
    {
      name: 'Reportes',
      path: '/reportes',
      component: () => import('@/modules/reports/views/Reports'),
      meta: {
        title: 'Reportes',
        subtitle: 'Descarga de reportes',
        icon: 'mdi-file-table',
        color: 'green',
        module: 'Reportes',
        group: 'Gestión',
        requireAuth: true,
        permission: 'reporte.listar',
        footer: true
      }
    }
  ]
}
export default routes