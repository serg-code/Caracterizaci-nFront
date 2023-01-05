import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const CuidadosEnfermedades = {
    component: 'CuidadosEnfermedades',
    ref_seccion: 'cuidado_enfermedades',
    descripcion: 'Cuidados enfermedades',
    show: true,
    respuestas: {
        cancer: PropsRespuesta,
        artritis_remautidea: PropsRespuesta,
        vih_sida: PropsRespuesta,
        hemofilia: PropsRespuesta,
        insuficiencia_renal: PropsRespuesta,
        fuma: PropsRespuesta,
        actividad_fisica: PropsRespuesta,
        vacuna_fiebre_amarilla: PropsRespuesta,
        // enfermedades_cronicas: PropsRespuesta,
        diabetes: PropsRespuesta,
        hipertencion_trimestral: PropsRespuesta,
        diabetes_trimestral: PropsRespuesta,
        tension_sistolica: PropsRespuesta,
        tension_diastolica: PropsRespuesta,
        hemoglobina_glococilada: PropsRespuesta,
        enfermedades_costosas: PropsRespuesta,
    }
}

export default CuidadosEnfermedades