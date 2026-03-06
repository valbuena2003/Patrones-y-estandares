import express, { Request, Response } from "express";
import { EmpresaAdapter } from "./infraestructure/adapter/EmpresaAdapter";
import { EmpresaApplication } from "./application/EmpresaApplication";
import { EmpresaController } from "./infraestructure/controller/EmpresaController";
import { UsuarioAdapter } from "./infraestructure/adapter/UsuarioAdapter";
import { UsuarioApplication } from "./application/UsuarioApplication";
import { UsuarioController } from "./infraestructure/controller/UsuarioController";

class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.routes();
    }

    private routes(): void {
        // Inyección de dependencias manual (siguiendo la estructura base)
        const empresaAdapter = new EmpresaAdapter();
        const empresaApp = new EmpresaApplication(empresaAdapter);
        const empresaController = new EmpresaController(empresaApp);

        const usuarioAdapter = new UsuarioAdapter();
        const usuarioApp = new UsuarioApplication(usuarioAdapter);
        const usuarioController = new UsuarioController(usuarioApp);

        // Rutas Empresa
        this.app.post("/empresas", (req, res) => empresaController.createEmpresa(req, res));
        this.app.get("/empresas", (req, res) => empresaController.getAllEmpresas(req, res));
        this.app.get("/empresas/:id", (req, res) => empresaController.getEmpresaById(req, res));
        this.app.put("/empresas/:id", (req, res) => empresaController.updateEmpresa(req, res));
        this.app.delete("/empresas/:id", (req, res) => empresaController.deleteEmpresa(req, res));

        // Rutas Usuario
        this.app.post("/usuarios", (req, res) => usuarioController.createUsuario(req, res));
        this.app.get("/usuarios", (req, res) => usuarioController.getAllUsuarios(req, res));
        this.app.put("/usuarios/:id", (req, res) => usuarioController.updateUsuario(req, res));
        this.app.delete("/usuarios/:id", (req, res) => usuarioController.deleteUsuario(req, res));

        this.app.get("/", (req: Request, res: Response) => res.send("ReTech API - RAEE Management System"));
    }

    getApp() {
        return this.app;
    }
}

export default new App().getApp();
