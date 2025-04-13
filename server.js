const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://quickybooster:3yEjKoLPOUjAed5o@115.78.15.110/vocabularyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const vocabularySchema = new mongoose.Schema({
  english: String,
  vietnamese: String,
  audioLink: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

// Routes
app.post('/addVocabulary', async (req, res) => {
  try {
    const vocab = new Vocabulary(req.body);
    await vocab.save();
    res.status(201).json(vocab);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add vocabulary' });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server is running on http://localhost:${PORT}`);
});