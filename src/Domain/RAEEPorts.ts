import { Empresa, Usuario, Artefacto, Recepcion, Certificado } from "./RAEE";

export interface EmpresaPort {
    createEmpresa(empresa: Omit<Empresa, "id_empresa">): Promise<number>;
    getEmpresaById(id: number): Promise<Empresa | null>;
    getAllEmpresas(): Promise<Empresa[]>;
    updateEmpresa(id: number, data: Partial<Empresa>): Promise<boolean>;
    deleteEmpresa(id: number): Promise<boolean>;
}

export interface UsuarioPort {
    createUsuario(usuario: Omit<Usuario, "id_usuario">): Promise<number>;
    getUsuarioByEmail(email: string): Promise<Usuario | null>;
    getUsuarioById(id: number): Promise<Usuario | null>;
    getAllUsuarios(): Promise<Usuario[]>;
    updateUsuario(id: number, data: Partial<Usuario>): Promise<boolean>;
    deleteUsuario(id: number): Promise<boolean>;
}

export interface ArtefactoPort {
    createArtefacto(artefacto: Omit<Artefacto, "id_artefacto">): Promise<number>;
    getArtefactosByEmpresa(id_empresa: number): Promise<Artefacto[]>;
}
