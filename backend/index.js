const express= require("express");
const app= express();
const port=5000;
const documents= require('./Data/data.js');
const cors=require("cors");
//middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true,
}));

// all doc
app.get('/', (req, res) => {
    res.json(documents);
  });


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
    console.log(`Server is running on ${port}`);
  });
  