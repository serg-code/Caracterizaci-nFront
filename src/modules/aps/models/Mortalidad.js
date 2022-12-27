import PropsRespuesta from '@/modules/aps/models/PropsRespuesta'
const Mortalidad = {
    component: 'MortalidadHogar',
    ref_seccion: 'mortalidad',
    descripcion: 'Mortalidad',
    show: true,
    respuestas: {
        fallecido_familiar: PropsRespuesta,
        sexo_fallecido: PropsRespuesta,
        edad_fallecido: PropsRespuesta,
        causa_muerte: PropsRespuesta,
        fecha_muerte: PropsRespuesta,
    }
}

export default Mortalidad