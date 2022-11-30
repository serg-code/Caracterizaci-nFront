import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const FactoresProtectores = {
    component: 'FactoresProtectores',
    ref_seccion: 'factores_protectores',
    descripcion: 'FACTORES PROTECTORES DE LA FAMILIA, HÁBITOS DE CONSUMO Y DE MANIPULACIÓN DE ALIMENTOS',
    show: true,
    respuestas: {
        tipo_familia: PropsRespuesta,
        duermen_ninos_ninas_adultos: PropsRespuesta,
        problemas_alcohol: PropsRespuesta,
        consume_tranquilizantes: PropsRespuesta,
        relaciones_cordiales_respetuosas: PropsRespuesta,
        lavar_manos_antes_comer: PropsRespuesta,
        lavar_manos_antes_preparar_alimentos: PropsRespuesta,
        fumigar_vivienda: PropsRespuesta,
        secretaria_fumigado: PropsRespuesta,
        acido_borico_cucarachas: PropsRespuesta,
    }
}

export default FactoresProtectores