import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Morbilidad = {
    component: 'IntegranteMorbilidad',
    ref_seccion: 'morbilidad',
    descripcion: 'Morbilidad',
    show: true,
    respuestas: {
        enfermedad_cronica: PropsRespuesta,
        enfermedad_cronica_cual: PropsRespuesta,
        controlada: PropsRespuesta,
        propiedades_respiratorio: PropsRespuesta,
        propiedades_piel: PropsRespuesta,
        enfermedades_congenitas: PropsRespuesta,
    }
}

export default Morbilidad