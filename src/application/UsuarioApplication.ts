import { Usuario } from "../Domain/RAEE";
import { UsuarioPort } from "../Domain/RAEEPorts";

export class UsuarioApplication {
    private port: UsuarioPort;

    constructor(port: UsuarioPort) {
        this.port = port;
    }

    async createUsuario(usuario: Omit<Usuario, "id_usuario">): Promise<number> {
        const existing = await this.port.getUsuarioByEmail(usuario.correo);
        if (existing) throw new Error("El correo ya está registrado");
        return this.port.createUsuario(usuario);
    }

    async getUsuarioById(id: number): Promise<Usuario | null> {
        return this.port.getUsuarioById(id);
    }

    async getAllUsuarios(): Promise<Usuario[]> {
        return this.port.getAllUsuarios();
    }

    async updateUsuario(id: number, data: Partial<Usuario>): Promise<boolean> {
        return this.port.updateUsuario(id, data);
    }

    async deleteUsuario(id: number): Promise<boolean> {
        return this.port.deleteUsuario(id);
    }
}
