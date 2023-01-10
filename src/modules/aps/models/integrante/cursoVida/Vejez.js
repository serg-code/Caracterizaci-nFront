import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Vejez = {
    component: 'Vejez',
    ref_seccion: 'vejez',
    descripcion: 'Vejez',
    show: true,
    respuestas: {
        ve_valoracion_peso: PropsRespuesta,
        ve_valoracion_talla: PropsRespuesta,
        ve_imc: PropsRespuesta,
        ve_asesoria_anticoncepcion: PropsRespuesta,
        ve_planifica: PropsRespuesta,
        ve_metodo_planifica: PropsRespuesta,
        ve_desde_cuando_planifica: PropsRespuesta,
        ve_razones_no_planifica: PropsRespuesta,
        // adul_enfermedad_cronica: PropsRespuesta,
        // adul_cual_enfermedad_cronica: PropsRespuesta,
        // adul_seguimiento_enfermedad_cronica: PropsRespuesta,
        ve_parejas_sexuales_al_anio: PropsRespuesta,
        ve_control_adultos: PropsRespuesta,
        ve_antecedentes_diabetes: PropsRespuesta,
        ve_antecedentes_hipertension: PropsRespuesta,
        ve_alteracion_colesterol: PropsRespuesta,
        ve_perimetro_abdominal: PropsRespuesta,
        ve_salud_medica: PropsRespuesta,
        ve_salud_bucal: PropsRespuesta,

        ve_cancer_cuello_uterino_adn_vph: PropsRespuesta,
        ve_cancer_cuello_uterino_adn_vph_positivo: PropsRespuesta,
        ve_colposcopia_uterina: PropsRespuesta,
        ve_bioscopia_uterina: PropsRespuesta,
        ve_cancer_mama_mamografia: PropsRespuesta,
        ve_cancer_mama_valoracion_clinica: PropsRespuesta,
        ve_cancer_prostata_psa: PropsRespuesta,
        ve_cancer_prostata_rectal: PropsRespuesta,
        ve_vasectomia: PropsRespuesta,
        ve_esterilizacion_femenina: PropsRespuesta,
        ve_vias_esterilizacion: PropsRespuesta,

        ve_profilaxis: PropsRespuesta,
        ve_detartraje_supragingival: PropsRespuesta,

        ve_vacuna_fiebre_amarilla: PropsRespuesta,
        ve_vacuna_influenza: PropsRespuesta,
        ve_prueba_vih: PropsRespuesta,
    }
}

export default Vejez