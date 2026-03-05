import { Repository, Not } from "typeorm";
import { Usuario as UsuarioDomain } from "../../Domain/RAEE";
import { UsuarioPort } from "../../Domain/RAEEPorts";
import { UsuarioEntity } from "../entities/RAEEEntities";
import { AppDataSource } from "../config/data-bas";

export class UsuarioAdapter implements UsuarioPort {
    private repository: Repository<UsuarioEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(UsuarioEntity);
    }

    private toDomain(entity: UsuarioEntity): UsuarioDomain {
        return {
            id_usuario: entity.id_usuario,
            nombre: entity.nombre,
            correo: entity.correo,
            contrasena: entity.contrasena,
            id_empresa: entity.id_empresa,
            estado: entity.estado
        };
    }

    private toEntity(domain: Omit<UsuarioDomain, "id_usuario">): UsuarioEntity {
        const entity = new UsuarioEntity();
        entity.nombre = domain.nombre;
        entity.correo = domain.correo;
        entity.contrasena = domain.contrasena;
        entity.id_empresa = domain.id_empresa;
        entity.estado = domain.estado || 'Activo';
        return entity;
    }

    async createUsuario(usuario: Omit<UsuarioDomain, "id_usuario">): Promise<number> {
        try {
            const entity = this.toEntity(usuario);
            const saved = await this.repository.save(entity);
            return saved.id_usuario;
        } catch (error) {
            console.error("Error creando usuario", error);
            throw new Error("Error al crear usuario");
        }
    }

    async getUsuarioByEmail(email: string): Promise<UsuarioDomain | null> {
        // Solo obtener si no está deshabilitado
        const entity = await this.repository.findOne({ 
            where: { 
                correo: email,
                estado: Not('Deshabilitado' as any)
            } 
        });
        return entity ? this.toDomain(entity) : null;
    }

    async getUsuarioById(id: number): Promise<UsuarioDomain | null> {
        // Solo obtener si no está deshabilitado
        const entity = await this.repository.findOne({ 
            where: { 
                id_usuario: id,
                estado: Not('Deshabilitado' as any)
            } 
        });
        return entity ? this.toDomain(entity) : null;
    }

    async getAllUsuarios(): Promise<UsuarioDomain[]> {
        // Filtrar usuarios deshabilitados
        const entities = await this.repository.find({
            where: {
                estado: Not('Deshabilitado' as any)
            }
        });
        return entities.map(e => this.toDomain(e));
    }

    async updateUsuario(id: number, data: Partial<UsuarioDomain>): Promise<boolean> {
        try {
            const existing = await this.repository.findOne({ where: { id_usuario: id } });
            if (!existing) return false;

            Object.assign(existing, {
                nombre: data.nombre ?? existing.nombre,
                correo: data.correo ?? existing.correo,
                contrasena: data.contrasena ?? existing.contrasena,
                id_empresa: data.id_empresa !== undefined ? data.id_empresa : existing.id_empresa,
                estado: data.estado ?? existing.estado
            });

            await this.repository.save(existing);
            return true;
        } catch (error) {
            console.error("Error actualizando usuario", error);
            throw new Error("Error actualizando usuario");
        }
    }

    async deleteUsuario(id: number): Promise<boolean> {
        try {
            // Borrado lógico: cambiar estado a 'Deshabilitado'
            const existing = await this.repository.findOne({ where: { id_usuario: id } });
            if (!existing) return false;

            existing.estado = 'Deshabilitado';
            await this.repository.save(existing);
            return true;
        } catch (error) {
            console.error("Error deshabilitando usuario", error);
            throw new Error("Error al deshabilitar usuario");
        }
    }
}
