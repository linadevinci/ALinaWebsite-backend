import fastify from "fastify";
import cors from "@fastify/cors";
import config from "./config.js";
import { connect } from "./connect.js";
import addRouteHandlers from './handlers/index.js';

const app = fastify({ logger: true });

await app.register(cors, {
    origin: ['https://alinafront.netlify.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });

await connect(); // Connexion à MongoDB

// ✅ ATTENTION : on attend bien les routes avec AWAIT
await addRouteHandlers(app);

await app.listen({ port: config.port, host: "0.0.0.0" });
