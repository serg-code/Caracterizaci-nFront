import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Vivienda = {
    component: 'ViviendaHogar',
    ref_seccion: 'vivienda',
    descripcion: 'Vivienda',
    show: true,
    respuestas: {
        encuesta_sisben: PropsRespuesta,
        ficha_sisben: PropsRespuesta,
        puntaje_sisben: PropsRespuesta,
        nivel_sisben: PropsRespuesta,
        tipos_vivienda: PropsRespuesta,
        tipos_tenecia: PropsRespuesta,
        servicios_sanitarios: PropsRespuesta,
        tipos_alumbrado: PropsRespuesta,
        dormitorios: PropsRespuesta,
        humo_vivienda: PropsRespuesta,
        fuentes_agua: PropsRespuesta,
        tratamiento_agua: PropsRespuesta,
        tipos_tratamiento_agua: PropsRespuesta,
        tipos_disposicion_basura: PropsRespuesta,
        reciclan: PropsRespuesta,
        iluminacion_adecuada: PropsRespuesta,
        ventilacion_adecuada: PropsRespuesta,
        roedores: PropsRespuesta,
        reservorios_agua: PropsRespuesta,
        anjeos: PropsRespuesta,
        tipos_insectos_vectores: PropsRespuesta,
        conservacion_alimentos: PropsRespuesta,
        actividad_productiva: PropsRespuesta,
        ciuu: PropsRespuesta,
        tipos_material_piso: PropsRespuesta,
        tipos_material_techo: PropsRespuesta,
        tipos_material_paredes: PropsRespuesta,
    }
}

export default Vivienda