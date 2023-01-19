import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const SeguridadAlimentaria = {
    component: 'SeguridadAlimentaria',
    ref_seccion: 'seguridad_alimentaria',
    descripcion: 'Seguridad alimentaria',
    show: true,
    respuestas: {
        falto_dinero: PropsRespuesta,
        animales_silvestres: PropsRespuesta,
        consume_cerdo_res_pollo: PropsRespuesta,
        consume_huevos: PropsRespuesta,
        consume_frijol_lentejas: PropsRespuesta,
        consume_lacteos: PropsRespuesta,
        consume_harinas: PropsRespuesta,
        consume_verduras: PropsRespuesta,
        consume_frutas_frescas: PropsRespuesta,
        consume_enlatados: PropsRespuesta,
        consume_platano_yuca: PropsRespuesta,
        consume_gaseosas: PropsRespuesta,
    }
}

export default SeguridadAlimentaria