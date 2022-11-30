import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const HabitosConsumo = {
    component: 'HabitosConsumo',
    ref_seccion: 'habitos_consumo',
    descripcion: 'HÁBITOS Y CONSUMO',
    show: true,
    respuestas: {
        consumo_huevos_crudos: PropsRespuesta,
        alimentos_perecederos: PropsRespuesta,
        hierve_leche: PropsRespuesta,
        lavar_frutas_verduras: PropsRespuesta,
        alimentos_crudos_separados_cocidos: PropsRespuesta,
    }
}

export default HabitosConsumo