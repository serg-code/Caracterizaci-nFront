import Accidentes from "@/modules/aps/models/integrante/Accidentes";
import CuidadosDomiciliarios from "@/modules/aps/models/integrante/CuidadosDomiciliarios";
import CuidadosEnfermedades from "@/modules/aps/models/integrante/CuidadosEnfermedades";

const Integrante = {
    id: null,
    tipo_identificacion: null,
    identificacion: null,
    primer_nombre: null,
    segundo_nombre: null,
    primer_apellido: null,
    segundo_apellido: null,
    rh: null,
    estado_civil: null,
    hogar_id: null,
    telefono: null,
    correo: null,
    cabeza_familia: null,
    secciones: {
        accidentes: Accidentes,
        cuidados_domiciliarios: CuidadosDomiciliarios,
        cuidado_enfermedades: CuidadosEnfermedades
    },
}

export default Integrante