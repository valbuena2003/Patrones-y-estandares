import { Repository, Not } from "typeorm";
import { Empresa as EmpresaDomain } from "../../Domain/RAEE";
import { EmpresaPort } from "../../Domain/RAEEPorts";
import { EmpresaEntity } from "../entities/RAEEEntities";
import { AppDataSource } from "../config/data-bas";

export class EmpresaAdapter implements EmpresaPort {
    private repository: Repository<EmpresaEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(EmpresaEntity);
    }

    private toDomain(entity: EmpresaEntity): EmpresaDomain {
        return {
            id_empresa: entity.id_empresa,
            nombre: entity.nombre,
            nit: entity.nit,
            correo: entity.correo,
            telefono: entity.telefono ??"",
            ciudad: entity.ciudad ??"" ,
            estado: entity.estado
        };
    }

    private toEntity(domain: Omit<EmpresaDomain, "id_empresa">): EmpresaEntity {
        const entity = new EmpresaEntity();
        entity.nombre = domain.nombre;
        entity.nit = domain.nit;
        entity.correo = domain.correo;
        entity.telefono = domain.telefono ?? "";
        entity.ciudad = domain.ciudad ?? "";
        entity.estado = domain.estado;
        return entity;
    }

    async createEmpresa(empresa: Omit<EmpresaDomain, "id_empresa">): Promise<number> {
        try {
            const entity = this.toEntity(empresa);
            const saved = await this.repository.save(entity);
            return saved.id_empresa;
        } catch (error) {
            console.error("Error creando empresa", error);
            throw new Error("Error al crear empresa");
        }
    }

    async getEmpresaById(id: number): Promise<EmpresaDomain | null> {
        // Solo obtener si no está deshabilitada
        const entity = await this.repository.findOne({ 
            where: { 
                id_empresa: id,
                estado: Not('Deshabilitada' as any)
            } 
        });
        return entity ? this.toDomain(entity) : null;
    }

    async getAllEmpresas(): Promise<EmpresaDomain[]> {
        // Filtrar empresas deshabilitadas
        const entities = await this.repository.find({
            where: {
                estado: Not('Deshabilitada' as any)
            }
        });
        return entities.map(e =>this.toDomain(e));
    }

    async updateEmpresa(id: number, data: Partial<EmpresaDomain>): Promise<boolean> {
        try {
            const existing = await this.repository.findOne({ where: { id_empresa: id } });
            if (!existing) return false;

            Object.assign(existing, {
                nombre: data.nombre ?? existing.nombre,
                nit: data.nit ?? existing.nit,
                correo: data.correo ?? existing.correo,
                telefono: data.telefono ?? existing.telefono,
                ciudad: data.ciudad ?? existing.ciudad,
                estado: data.estado ?? existing.estado
            });

            await this.repository.save(existing);
            return true;
        } catch (error) {
            console.error("Error actualizando empresa", error);
            throw new Error("Error actualizando empresa");
        }
    }

    async deleteEmpresa(id: number): Promise<boolean> {
        try {
            // Borrado lógico: cambiar estado a 'Deshabilitada'
            const existing = await this.repository.findOne({ where: { id_empresa: id } });
            if (!existing) return false;

            existing.estado = 'Deshabilitada';
            await this.repository.save(existing);
            return true;
        } catch (error) {
            console.error("Error deshabilitando empresa", error);
            throw new Error("Error al deshabilitar empresa");
        }
    }
}
