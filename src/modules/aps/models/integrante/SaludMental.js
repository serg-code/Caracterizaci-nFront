import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const SaludMental = {
    component: 'SaludMental',
    ref_seccion: 'salud_mental',
    descripcion: 'Salud mental',
    show: true,
    respuestas: {
        depresion: PropsRespuesta,
        intento_suicidio: PropsRespuesta,
        esquizofrenia: PropsRespuesta,
        trastorno_afectivo: PropsRespuesta,
        bulimia: PropsRespuesta,
        anorexia: PropsRespuesta,
        tratamiento: PropsRespuesta,
        diagnostico: PropsRespuesta,
        violencia_fisica: PropsRespuesta,
        violencia_psicologica: PropsRespuesta,
        violencia_sexual: PropsRespuesta,
        violencia_institucional: PropsRespuesta,
        violencia_social: PropsRespuesta,
        violencia_gestacion: PropsRespuesta,
    }
}

export default SaludMental