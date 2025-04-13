import userModel from "../user/user-model.js";
import Quote from "../quote/quote-model.js"; // 👈 IMPORT ICI
import { getHashFromClearText } from "../utils/crypto.js";

export default function addRouteHandlers(app) {
  // Test route
  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  // Création utilisateur
  app.post("/api/users", async (request, reply) => {
    const { email, password, username } = request.body;
    const user = new userModel({
      email,
      password: getHashFromClearText(password),
      username
    });
    await user.save();
    return user.toJSON();
  });

  // ➕ ROUTE À AJOUTER ABSOLUMENT
  app.get("/quote", async (request, reply) => {
    try {
      const count = await Quote.countDocuments();
      const random = Math.floor(Math.random() * count);
      const quote = await Quote.findOne().skip(random);
      return quote;
    } catch (err) {
      reply.status(500).send({ error: "Erreur serveur", details: err.message });
    }
  });
}
