import FactoresProtectores from '@/modules/aps/models/FactoresProtectores'
import HabitosConsumo from '@/modules/aps/models/HabitosConsumo'
import Vivienda from '@/modules/aps/models/Vivienda'
import Animales from '@/modules/aps/models/Animales'
import SeguridadAlimentaria from '@/modules/aps/models/SeguridadAlimentaria'
import Mortalidad from '@/modules/aps/models/Mortalidad'

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
    realizo_encuesta: 1,
    motivos: null,
    motivosObj: null,
    secciones: {
        vivienda: Vivienda,
        animales: Animales,
        factores_protectores: FactoresProtectores,
        habitos_consumo: HabitosConsumo,
        seguridad_alimentaria: SeguridadAlimentaria,
        mortalidad: Mortalidad,
    },
    integrantes:[]
}

export default Hogar