import * as Express from 'express';
import http from 'http';
import envs from '../config/environment-vars';

export class ServerBootstrap {
    private app: Express.Application;

    constructor(app: Express.Application) {
        this.app = app;
    }

    initialize(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            const PORT = Number(envs.PORT);
            server.listen(PORT)
                .on("listening", () => {
                    console.log(`Servidor corriendo en http://localhost:${PORT}`);
                    resolve(true);
                })
                .on("error", (err) => {
                    console.error(`Error al iniciar el servidor: ${err.message}`);
                    reject(false);
                });
        });
    }
}
