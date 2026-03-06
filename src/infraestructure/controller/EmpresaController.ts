import { Request, Response } from "express";
import { EmpresaApplication } from "../../application/EmpresaApplication";
import { Empresa } from "../../Domain/RAEE";

export class EmpresaController {
    private app: EmpresaApplication;

    constructor(application: EmpresaApplication) {
        this.app = application;
    }

    async createEmpresa(req: Request, res: Response) {
        try {
            const { nombre, nit, correo, telefono, ciudad, estado } = req.body;
            const empresa: Omit<Empresa, "id_empresa"> = { nombre, nit, correo, telefono, ciudad, estado };
            const id = await this.app.createEmpresa(empresa);
            return res.status(201).json({ message: "Empresa creada con éxito", id });
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async getAllEmpresas(req: Request, res: Response) {
        try {
            const empresas = await this.app.getAllEmpresas();
            return res.status(200).json(empresas);
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async getEmpresaById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const empresa = await this.app.getEmpresaById(id);
            if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
            return res.status(200).json(empresa);
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async updateEmpresa(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const success = await this.app.updateEmpresa(id, req.body);
            if (!success) return res.status(404).json({ error: "Empresa no encontrada" });
            return res.status(200).json({ message: "Empresa actualizada con éxito" });
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async deleteEmpresa(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const success = await this.app.deleteEmpresa(id);
            if (!success) return res.status(404).json({ error: "Empresa no encontrada" });
            return res.status(200).json({ message: "Empresa eliminada con éxito" });
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }
}
