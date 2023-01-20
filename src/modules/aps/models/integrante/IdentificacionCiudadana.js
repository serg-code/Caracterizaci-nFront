import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const IdentificacionCiudadana = {
    component: 'IdentificacionCiudadana',
    ref_seccion: 'identificacion_ciudadana',
    descripcion: 'Identificacion ciudadana',
    show: true,
    respuestas: {
        grupo_etnia: PropsRespuesta,
        grupo_atencion_especial: PropsRespuesta,
        programas: PropsRespuesta,
        cual_programa: PropsRespuesta,
        seguridad_social: PropsRespuesta,
        esta_estudiando: PropsRespuesta,
        tipo_educacion: PropsRespuesta,
        por_que: PropsRespuesta,
        ocupacion_ingreso: PropsRespuesta,
        discapacidad: PropsRespuesta,
        ayudas_tenicas: PropsRespuesta,
    }
}

export default IdentificacionCiudadana