import "reflect-metadata";
import { DataSource } from "typeorm";
import { EmpresaEntity, UsuarioEntity, ArtefactoEntity, RecepcionEntity, CertificadoEntity } from "../entities/RAEEEntities";
import envs from "./environment-vars";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST || "localhost",
    port: Number(envs.DB_PORT) || 5432,
    username: envs.DB_USER || "postgres",
    password: envs.DB_PASSWORD || "password",
    database: envs.DB_NAME || "db_raee",
    synchronize: false, // Usar false en producción, true para desarrollo inicial si no hay migraciones
    logging: true,
    entities: [EmpresaEntity, UsuarioEntity, ArtefactoEntity, RecepcionEntity, CertificadoEntity],
    subscribers: [],
    migrations: [],
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Base de datos conectada con éxito");
    } catch (error) {
        console.error("Error conectando a la base de datos", error);
        process.exit(1);
    }
};
