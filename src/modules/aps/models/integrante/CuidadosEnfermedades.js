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

        ha_estado_embarazada: PropsRespuesta,
        cuantos_embarazos_ha_tenido: PropsRespuesta,
        hijos_muertos_parto_natural: PropsRespuesta,
        hijos_vivos_parto_natural: PropsRespuesta,
        hijos_muertos_por_cesarea: PropsRespuesta,
        hijos_vivos_por_cesarea: PropsRespuesta,
        cuantos_abortos: PropsRespuesta,
        cuantos_gemelos_multiples: PropsRespuesta,
    }
}

export default CuidadosEnfermedades