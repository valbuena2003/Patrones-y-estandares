export interface Recepcion {
    id_recepcion: number;
    id_artefacto: number;
    fecha: Date;
    id_usuario: number;
    estado?: string;
}
