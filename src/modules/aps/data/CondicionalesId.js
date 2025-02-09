const hogar = {
    // ViviendaHogar
    encuesta_sisben: 249, // SI
    tratamiento_agua: 289, // SI
    actividad_productiva: 314, // SI
    // AnimalesHogar
    gatos: 361, // SI
    perros: 365, // SI
    equinos: 369, // SI
    porcinos: 375, // SI
    // MortalidadHogar
    fallecido_familiar: 381, // SI
}

const integrante = {
    // IdentificacionCiudadana
    programas: 186, // SI
    esta_estudiando: 202, // NO
    esta_estudiando_si: 203, // SI
    discapacidad: 223, // diferente de ninguna => NINGUNA
    // CuidadosEnfermedades
    ha_estado_embarazada: 92, // SI
    // IntegranteAccidentes
    accidentes_transito: 36, // SI
    // CuidadosDomiciliarios
    cuidados_domiciliarios: 45, // SI
    oxigeno_domiciliario: 52, // SI
    // SaludMental
    tratamiento: 113, // SI
    // IntegranteMorbilidad
    enfermedad_cronica: 150, // SI
    // PrimeraInfancia
    pi_carnet_vacunacion: 423, // SI
    // Infancia
    in_carnet_vacunacion: 505, // SI
    // Adolecencia
    adol_vacunacion: 583, // SI
    adol_planifica: 542, // SI
    // Juventud
    juv_cancer_cuello_uterino: 592, // ANORMAL
    juv_colposcopia: 594, // NO (habilitar campo de control médico)
    juv_examen_seno: 601, // ANORMAL (habilitar campo de control médico)
    juv_planifica: 603, // SI
    juv_esterilizacion_femenina: 641, // SI
    // Adultez
    adul_planifica: 664, // SI
    adul_esterilizacion_femenina: 729, // SI
    // Vejez
    ve_planifica: 747, // SI
    ve_esterilizacion_femenina: 815, // SI
    // MaternoPerinatal
    ma_hemoparasitos_chagas: 923 // POSITIVO
}
export { hogar, integrante }