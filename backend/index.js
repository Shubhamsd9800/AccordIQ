const express = require("express");
const app = express();
const port = 5000;
const documents = require('./Data/data.js');
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://accord-iq-coral-dev.vercel.app', 'https://accord-iq-coral.vercel.app/'],
  credentials: true,
}));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Document API!');
});

// Get all documents
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

// Get a single document by ID
app.get('/api/documents/:id', (req, res) => {
  const document = documents.find(doc => doc.id === parseInt(req.params.id));
  if (document) {
    res.json(document);
  } else {
    res.status(404).send('Document not found');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});