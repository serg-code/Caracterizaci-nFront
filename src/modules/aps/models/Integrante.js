import Accidentes from '@/modules/aps/models/integrante/Accidentes'
import CuidadosDomiciliarios from '@/modules/aps/models/integrante/CuidadosDomiciliarios'
import CuidadosEnfermedades from '@/modules/aps/models/integrante/CuidadosEnfermedades'
import IdentificacionCiudadana from '@/modules/aps/models/integrante/IdentificacionCiudadana'
import SaludMental from '@/modules/aps/models/integrante/SaludMental'
import EnfermedadesSaludPublica from '@/modules/aps/models/integrante/EnfermedadesSaludPublica'
import Morbilidad from '@/modules/aps/models/integrante/Morbilidad'

// Cursos de vida
import PrimeraInfancia from '@/modules/aps/models/integrante/cursoVida/PrimeraInfancia'
import Infancia from '@/modules/aps/models/integrante/cursoVida/Infancia'
import Adolecencia from '@/modules/aps/models/integrante/cursoVida/Adolecencia'
import Juventud from '@/modules/aps/models/integrante/cursoVida/Juventud'
import Adultez from '@/modules/aps/models/integrante/cursoVida/Adultez'
import Vejez from '@/modules/aps/models/integrante/cursoVida/Vejez'
import MaternoPerinatal from '@/modules/aps/models/integrante/cursoVida/MaternoPerinatal'

const Integrante = {
    id: null,
    hogar_id: null,
    tipo_identificacion: null,
    identificacion: null,
    primer_nombre: null,
    segundo_nombre: null,
    primer_apellido: null,
    segundo_apellido: null,
    fecha_nacimiento: null,
    rh: null,
    estado_civil: null,
    telefono: null,
    correo: null,
    cabeza_familia: null,
    sexo: null,
    puntaje_obtenido: 0,
    puntaje_max: 0,
    estado_registro: 'ABIERTO',
    porcentaje: null,
    color: null,
    secciones: {
        materno_perinatal: MaternoPerinatal,
        primera_infancia: PrimeraInfancia,
        infancia: Infancia,
        adolescencia: Adolecencia,
        juventud: Juventud,
        adultez: Adultez,
        vejez: Vejez,
        identificacion_ciudadana: IdentificacionCiudadana,
        cuidado_enfermedades: CuidadosEnfermedades,
        accidentes: Accidentes,
        cuidados_domiciliarios: CuidadosDomiciliarios,
        salud_mental: SaludMental,
        enfermedades_salud_publica: EnfermedadesSaludPublica,
        morbilidad: Morbilidad
    },
}

export default Integrante