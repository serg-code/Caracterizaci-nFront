import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const EnfermedadesSaludPublica = {
    component: 'EnfermedadesSaludPublica',
    ref_seccion: 'enfermedades_salud_publica',
    descripcion: 'Enfermedades de interés en salud pública',
    show: true,
    respuestas: {
        tuberculosis: PropsRespuesta,
        lepra: PropsRespuesta,
        chagas: PropsRespuesta,
        sifilis: PropsRespuesta,
        dengue: PropsRespuesta,
        malaria: PropsRespuesta,
        leishmaniasis: PropsRespuesta,
        brucelosis: PropsRespuesta,
        sika_chicungunya: PropsRespuesta,
        varicela: PropsRespuesta,
        intoxicacion: PropsRespuesta,
    }
}

export default EnfermedadesSaludPublica