import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const CuidadosDomiciliarios = {
    component: 'CuidadosDomiciliarios',
    ref_seccion: 'cuidados_domiciliarios',
    descripcion: 'Cuidados domiciliarios',
    show: true,
    respuestas: {
        cuidados_domiciliarios: PropsRespuesta,
        diagnostico_principal: PropsRespuesta,
        causa: PropsRespuesta,
        fecha_inicio_domiciliario: PropsRespuesta,
        oxigeno_domiciliario: PropsRespuesta,
        plan_aprobado: PropsRespuesta,
    }
}

export default CuidadosDomiciliarios