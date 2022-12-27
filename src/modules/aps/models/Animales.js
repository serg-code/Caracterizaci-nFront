import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Animales = {
    component: 'AnimalesHogar',
    ref_seccion: 'animales',
    descripcion: 'Animales',
    show: true,
    respuestas: {
        gatos: PropsRespuesta,
        gatos_cuantos: PropsRespuesta,
        gatos_vacunados: PropsRespuesta,
        perros: PropsRespuesta,
        perros_cuantos: PropsRespuesta,
        perros_vacunados: PropsRespuesta,
        equinos: PropsRespuesta,
        equinos_cuantos: PropsRespuesta,
        equinos_vacunados: PropsRespuesta,
        aves: PropsRespuesta,
        porcinos: PropsRespuesta,
        porcinos_cuantos: PropsRespuesta,
        porcinos_vacunados: PropsRespuesta,
        animales_no_rabia: PropsRespuesta,
        animales_si_rabia: PropsRespuesta,
    }
}

export default Animales