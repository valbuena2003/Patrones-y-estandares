export interface Usuario {
    id_usuario: number;
    nombre: string;
    correo: string;
    contrasena: string;
    id_empresa: number | undefined;
}
