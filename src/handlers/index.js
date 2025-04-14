export default async function addRouteHandlers(app) {
  console.log("📌 Enregistrement des handlers");

  app.post("/api/token", async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.status(400).send({ error: "Champs requis manquants." });
    }

    const user = await userModel.findOne({ username });
    if (!user) return reply.status(401).send({ error: "Utilisateur introuvable." });

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

  app.get("/api/quote", async (request, reply) => {
    console.log("📥 GET /api/quote reçue !");
    try {
      const count = await Quote.countDocuments();
      const random = Math.floor(Math.random() * count);
      const quote = await Quote.findOne().skip(random);

      if (!quote) return reply.status(404).send({ error: "Aucune citation trouvée." });

      return reply.send(quote);
    } catch (err) {
      console.error("❌ Erreur dans GET /api/quote :", err);
      return reply.status(500).send({ error: "Erreur serveur" });
    }
  });
}
