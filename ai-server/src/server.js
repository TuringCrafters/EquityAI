const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3001' 
  }));

app.use(express.json());

app.post('/ai', (req, res) => {
    const userInput = req.body.text;
    const response = userInput.toUpperCase();
    res.json({ response });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});