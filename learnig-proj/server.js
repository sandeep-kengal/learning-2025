const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const storedTexts = [];

app.post('/api/store-text', (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    const entry = {
        id: Date.now(),
        text: text,
        timestamp: new Date().toISOString()
    };
    
    storedTexts.push(entry);
    
    res.json({ 
        message: 'Text stored successfully', 
        entry: entry,
        totalEntries: storedTexts.length 
    });
});

app.get('/api/texts', (req, res) => {
    res.json({ texts: storedTexts });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});