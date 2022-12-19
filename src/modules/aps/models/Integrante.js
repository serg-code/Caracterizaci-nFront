import Accidentes from "@/modules/aps/models/integrante/Accidentes";
import CuidadosDomiciliarios from "@/modules/aps/models/integrante/CuidadosDomiciliarios";
import CuidadosEnfermedades from "@/modules/aps/models/integrante/CuidadosEnfermedades";

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
    secciones: {
        accidentes: Accidentes,
        cuidados_domiciliarios: CuidadosDomiciliarios,
        cuidado_enfermedades: CuidadosEnfermedades
    },
}

export default Integrante