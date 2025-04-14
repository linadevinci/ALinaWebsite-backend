import express from 'express';
import Quote from './quote-model.js';

const router = express.Router();

// GET /api/quote → renvoie une citation aléatoire
router.get('/', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);

    if (!quote) {
      return res.status(404).json({ error: 'Aucune citation trouvée.' });
    }

    res.json(quote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de la citation.' });
  }
});

export default router;
