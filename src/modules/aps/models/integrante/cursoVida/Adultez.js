import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Adultez = {
    component: 'Adultez',
    ref_seccion: 'adultez',
    descripcion: 'Adultez',
    show: true,
    respuestas: {
        adul_valoracion_peso: PropsRespuesta,
        adul_valoracion_talla: PropsRespuesta,
        adul_imc: PropsRespuesta,
        adul_asesoria_anticoncepcion: PropsRespuesta,
        adul_planifica: PropsRespuesta,
        adul_metodo_planifica: PropsRespuesta,
        adul_desde_cuando_planifica: PropsRespuesta,
        adul_razones_no_planifica: PropsRespuesta,
        // adul_enfermedad_cronica: PropsRespuesta,
        // adul_cual_enfermedad_cronica: PropsRespuesta,
        // adul_seguimiento_enfermedad_cronica: PropsRespuesta,
        adul_parejas_sexuales_al_anio: PropsRespuesta,
        adul_control_adultos: PropsRespuesta,
        adul_antecedentes_diabetes: PropsRespuesta,
        adul_antecedentes_hipertension: PropsRespuesta,
        adul_antecedentes_colesterol: PropsRespuesta,
        adul_perimetro_abdominal: PropsRespuesta,
        adul_atencion_medica: PropsRespuesta,
        adul_salud_bucal: PropsRespuesta,

        adul_cancer_cuello_uterino_adn_vph: PropsRespuesta,
        adul_cancer_cuello_uterino_adn_vph_positivo: PropsRespuesta,
        adul_colposcopia_cervico_uterina: PropsRespuesta,
        adul_biopsia_cervico_uterina: PropsRespuesta,
        adul_cancer_mama_mamografia: PropsRespuesta,
        adul_cancer_mama_valoracion_clinica: PropsRespuesta,
        adul_cancer_prostata: PropsRespuesta,
        adul_vasectomia: PropsRespuesta,
        adul_esterilizacion_femenina: PropsRespuesta,
        adul_vias_esterilizacion: PropsRespuesta,

        adul_profilaxis: PropsRespuesta,
        adul_detartraje_supragingival: PropsRespuesta,

        adul_fiebre_amarilla: PropsRespuesta,
        adul_prueba_vih: PropsRespuesta,
    }
}

export default Adultez