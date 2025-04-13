import express from "express";
import Quote from "./quote-model.js";

const router = express.Router();

// GET /quote → retourne une citation aléatoire
router.get("/", async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

export default router;
