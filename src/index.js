import fastify from "fastify";
import cors from "@fastify/cors";
import config from "./config.js";
import { connect } from "./connect.js";
import addRouteHandlers from "./handlers/index.js";
import mongoose from "mongoose";
import Quote from "./quote/quote-model.js";

const app = fastify({ logger: true });

// CORS pour autoriser les requêtes du front
await app.register(cors, {});

// Routes existantes (ex: /signin)
addRouteHandlers(app);

// Nouvelle route GET /quote
app.get("/quote", async (request, reply) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    reply.send(quote);
  } catch (err) {
    reply.status(500).send({ message: "Erreur serveur", error: err });
  }
});

try {
  await connect(); // Connexion à MongoDB
  await app.listen({ port: config.port, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
