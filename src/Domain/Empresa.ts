export interface Empresa {
    id_empresa: number;
    nombre: string;
    nit: string;
    correo: string;
    telefono?: string;
    ciudad?: string;
    estado: 'Activa' | 'Pendiente' | 'Deshabilitada';
}
