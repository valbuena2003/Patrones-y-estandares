import { Request, Response } from "express";
import { UsuarioApplication } from "../../application/UsuarioApplication";
import { Usuario } from "../../Domain/RAEE";

export class UsuarioController {
    private app: UsuarioApplication;

    constructor(application: UsuarioApplication) {
        this.app = application;
    }

    async createUsuario(req: Request, res: Response) {
        try {
            const { nombre, correo, contrasena, id_empresa } = req.body;
            const usuario: Omit<Usuario, "id_usuario"> = { nombre, correo, contrasena, id_empresa };
            const id = await this.app.createUsuario(usuario);
            return res.status(201).json({ message: "Usuario creado con éxito", id });
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async getAllUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await this.app.getAllUsuarios();
            return res.status(200).json(usuarios);
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async updateUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const success = await this.app.updateUsuario(id, req.body);
            if (!success) return res.status(404).json({ error: "Usuario no encontrado" });
            return res.status(200).json({ message: "Usuario actualizado con éxito" });
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }

    async deleteUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const success = await this.app.deleteUsuario(id);
            if (!success) return res.status(404).json({ error: "Usuario no encontrado" });
            return res.status(200).json({ message: "Usuario deshabilitado con éxito" });
        } catch (error: any) {
            return res.status(500).json({ error: "Error interno", details: error.message });
        }
    }
}
