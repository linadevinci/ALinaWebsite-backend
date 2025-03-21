import fastify from "fastify";
import config from "./config";
import connect from "./connect";
import addRouteHandlers from"./handlers/index.js";

const app = fastify({ logger: true });

addRouteHandlers(app);

try {
    await connect();
    app.listen({ port: config.port });
} catch (error) {
    app.log.error(error);
    process.exit(1);
}