import userModel from "../user/user-model.js";
import Quote from "../quote/quote-model.js";
import { getHashFromClearText } from "../utils/crypto.js";

export default async function addRouteHandlers(app) {
  console.log("📌 Handlers enregistrés");

  // 🔐 Route POST /api/token → login + citation aléatoire
  app.post("/api/token", async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.status(400).send({ error: "Champs requis manquants." });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return reply.status(401).send({ error: "Utilisateur introuvable." });
    }

    // In /handlers/index.js, replace the password check with:
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
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

  // 💬 Route GET /api/quote → renvoie une citation aléatoire
  app.get("/api/quote", async (request, reply) => {
    console.log("📥 GET /api/quote appelée !");
    try {
      const count = await Quote.countDocuments();
      const random = Math.floor(Math.random() * count);
      const quote = await Quote.findOne().skip(random);

      if (!quote) {
        return reply.status(404).send({ error: "Aucune citation trouvée." });
      }

      return reply.send(quote);
    } catch (err) {
      console.error("❌ Erreur GET /api/quote :", err);
      return reply.status(500).send({ error: "Erreur serveur" });
    }
  });
}
