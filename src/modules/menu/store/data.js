// char data
export const itemsMenu = [
    {
        id: 'inicio',
        title: 'Inicio',
        subtitle: null,
        icon: 'mdi-home',
        color: 'light-blue',
        routeName: 'Home',
        typeRoute: 'general'
    },
    {
        id: 'usuarios',
        title: 'Usuarios',
        subtitle: null,
        icon: 'mdi-account-group',
        color: 'indigo',
        routeName: 'Usuarios',
        typeRoute: 'administrativo'
    },
    {
        id: 'roles',
        title: 'Roles',
        subtitle: 'Roles y Permisos',
        icon: 'mdi-account-switch',
        color: 'blue',
        routeName: 'Roles',
        typeRoute: 'administrativo'
    },
    {
        id: 'encuestasAPS',
        title: 'Encuestas APS',
        subtitle: 'Encuestas',
        icon: 'mdi-clipboard-list',
        color: 'green',
        routeName: 'EncuestasAPS',
        typeRoute: 'aps'
    },
    {
        id: 'integrantesAPS',
        title: 'Encuestados APS',
        subtitle: 'Integrantes de encuestas',
        icon: 'mdi-clipboard-account',
        color: 'primary',
        routeName: 'IntegrantesAPS',
        typeRoute: 'aps'
    },
    {
        id: 'areasTerritorialesAPS',
        title: 'Áreas territoriales',
        subtitle: 'Barrios, veredas y corregimientos',
        icon: 'mdi-puzzle',
        color: 'purple',
        routeName: 'AreasTerritorialesAPS',
        typeRoute: 'aps'
    },
    {
        id: 'mapaHogaresAPS',
        title: 'Georreferenciación hogares',
        subtitle: 'Georreferenciación de hogares encuestados',
        icon: 'mdi-map',
        color: 'indigo',
        routeName: 'MapaHogaresAPS',
        typeRoute: 'aps'
    }
]