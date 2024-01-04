const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { sendPromptToAi } = require('./index'); 

app.use(cors({
    origin: 'http://localhost:3001' 
  }));

app.use(express.json());

app.post('/ai', async (req, res) => {
    const userInput = req.body.text;
    try {
        const responseAi = await sendPromptToAi(userInput);
        res.json({ responseAi });
    } catch (error) {
        console.error("Error in AI processing:", error);
        res.status(500).send("Error processing request");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});