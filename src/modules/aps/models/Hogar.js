import FactoresProtectores from '@/modules/aps/models/FactoresProtectores'
import HabitosConsumo from '@/modules/aps/models/HabitosConsumo'

const Hogar = {
    id: null,
    zona: null,
    cod_mun: null,
    cod_dpto: null,
    municipioObj: null,
    departamentoObj: null,
    barrio: null,
    direccion: null,
    geolocalizacion: null,
    encuesta: null,
    estado: 1,
    tipo: null,
    secciones: {
        factores_protectores: FactoresProtectores,
        habitos_consumo: HabitosConsumo,
    }
}

export default Hogar