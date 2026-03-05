import { Empresa } from "../Domain/RAEE";
import { EmpresaPort } from "../Domain/RAEEPorts";

export class EmpresaApplication {
    private port: EmpresaPort;

    constructor(port: EmpresaPort) {
        this.port = port;
    }

    async createEmpresa(empresa: Omit<Empresa, "id_empresa">): Promise<number> {
        return this.port.createEmpresa(empresa);
    }

    async getEmpresaById(id: number): Promise<Empresa | null> {
        return this.port.getEmpresaById(id);
    }

    async getAllEmpresas(): Promise<Empresa[]> {
        return this.port.getAllEmpresas();
    }

    async updateEmpresa(id: number, data: Partial<Empresa>): Promise<boolean> {
        return this.port.updateEmpresa(id, data);
    }

    async deleteEmpresa(id: number): Promise<boolean> {
        return this.port.deleteEmpresa(id);
    }
}
