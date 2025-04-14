import fastify from "fastify";
import cors from "@fastify/cors";
import config from "./config.js";
import { connect } from "./connect.js";
import addRouteHandlers from './handlers/index.js';

const app = fastify({ logger: true });

// Autoriser les requêtes cross-origin (depuis Netlify par ex)
await app.register(cors, {});

// Ajouter toutes les routes définies dans /handlers/index.js
addRouteHandlers(app);

try {
  // Connexion à MongoDB
  await connect();

  // Lancement du serveur Fastify
  await app.listen({ port: config.port, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
