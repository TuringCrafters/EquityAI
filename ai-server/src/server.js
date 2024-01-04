const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/ai', (req, res) => {
    const userInput = req.body.text;
    const processedText = userInput.toUpperCase();
    res.json({ processedText });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});