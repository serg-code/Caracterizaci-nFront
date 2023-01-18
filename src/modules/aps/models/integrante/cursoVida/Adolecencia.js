import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Adolecencia = {
    component: 'Adolecencia',
    ref_seccion: 'adolescencia',
    descripcion: 'Adolecencia',
    show: true,
    respuestas: {
        adol_peso: PropsRespuesta,
        adol_talla: PropsRespuesta,
        adol_imc: PropsRespuesta,
        adol_asesoria_anticonceptiva: PropsRespuesta,
        adol_planifica: PropsRespuesta,
        adol_metodo_planficica: PropsRespuesta,
        adol_desde_cuando_planifica: PropsRespuesta,
        adol_razon_no_planifica: PropsRespuesta,

        adol_atencion_medica: PropsRespuesta,
        adol_atencion_enfermeria: PropsRespuesta,
        adol_salud_bucal: PropsRespuesta,
        adol_fluor: PropsRespuesta,
        adol_profilaxis: PropsRespuesta,
        adol_sellantes: PropsRespuesta,
        adol_supragingival: PropsRespuesta,

        adol_vacunacion: PropsRespuesta,
        adol_vacuna_fiebre_amarilla: PropsRespuesta,
        adol_vacuna_vph: PropsRespuesta,
        adol_vacuna_toxoide_tetanico: PropsRespuesta,
    }
}

export default Adolecencia