import FactoresProtectores from '@/modules/aps/models/FactoresProtectores'
import HabitosConsumo from '@/modules/aps/models/HabitosConsumo'

const Hogar = {
    id: null,
    barrio_vereda_id: null,
    zona: null,
    cod_dpto: null,
    departamentoObj: null,
    cod_mun: null,
    municipioObj: null,
    tipo: null,
    direccion: null,
    geolocalizacion: null,
    encuesta: null,
    puntaje_max: 0,
    puntaje_obtenido: 0,
    estado_registro: 'ABIERTO',
    secciones: {
        factores_protectores: FactoresProtectores,
        habitos_consumo: HabitosConsumo,
    },
    integrantes:[]
}

export default Hogar