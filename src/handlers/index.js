import userModel from "../user/user-model.js";
import Quote from "../quote/quote-model.js";
import { getHashFromClearText } from "../utils/crypto.js";

export default function addRouteHandlers(app) {
  // POST /api/token → Authentifie et renvoie une citation
  app.post("/api/token", async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.status(400).send({ error: "Champs requis manquants." });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return reply.status(401).send({ error: "Utilisateur introuvable." });
    }

    const hashed = getHashFromClearText(password);

    if (user.password !== hashed) {
      return reply.status(401).send({ error: "Mot de passe incorrect." });
    }

    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);

    return reply.send({
      message: `Bonjour ${user.username} !`,
      quote
    });
  });

  // ✅ GET /api/quote → Renvoie une citation aléatoire
  app.get("/api/quote", async (request, reply) => {
    try {
      const count = await Quote.countDocuments();
      const random = Math.floor(Math.random() * count);
      const quote = await Quote.findOne().skip(random);

      if (!quote) {
        return reply.status(404).send({ error: "Aucune citation trouvée." });
      }

      return reply.send(quote);
    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: "Erreur serveur lors de la récupération de la citation." });
    }
  });
}
