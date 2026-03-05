import app from "./app";
import { ServerBootstrap } from "./infraestructure/bootstrap/server.bootstrap";
import { connectDB } from "./infraestructure/config/data-bas";

const serverBootstrap = new ServerBootstrap(app);

(async () => {
    try {
        await connectDB();
        await serverBootstrap.initialize();
    } catch (error) {
        console.error("Error al iniciar la aplicación", error);
        process.exit(1);
    }
})();
