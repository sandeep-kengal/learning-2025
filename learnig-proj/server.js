const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/api/store-text', async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    try {
        const result = await pool.query(
            'INSERT INTO texts (text) VALUES ($1) RETURNING *',
            [text]
        );
        
        const entry = result.rows[0];
        
        const countResult = await pool.query('SELECT COUNT(*) FROM texts');
        const totalEntries = parseInt(countResult.rows[0].count);
        
        res.json({ 
            message: 'Text stored successfully', 
            entry: entry,
            totalEntries: totalEntries 
        });
    } catch (error) {
        console.error('Error storing text:', error);
        res.status(500).json({ error: 'Failed to store text' });
    }
});

app.get('/api/texts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM texts ORDER BY timestamp DESC');
        res.json({ texts: result.rows });
    } catch (error) {
        console.error('Error fetching texts:', error);
        res.status(500).json({ error: 'Failed to fetch texts' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});