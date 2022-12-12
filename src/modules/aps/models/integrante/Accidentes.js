import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Accidentes = {
    component: 'IntegranteAccidentes',
    ref_seccion: 'acccidentes',
    descripcion: 'ACCIDENTES',
    show: true,
    respuestas: {
        accidentes_transito: PropsRespuesta,
        tipo_lesion: PropsRespuesta,
        accidentes_laborales: PropsRespuesta
    }
}

export default Accidentes