const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const SIDESHIFT_API_URL = 'https://sideshift.ai/api/v2';
const SIDESHIFT_API_KEY = '09a670d0198998d1813981bd9fe23904';

app.use(express.json());

app.post('/api/quote', async (req, res) => {
    try {
        const response = await axios.post(`${SIDESHIFT_API_URL}/quotes`, req.body, {
            headers: {
                'x-sideshift-secret': SIDESHIFT_API_KEY,
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.post('/api/shift', async (req, res) => {
    try {
        const response = await axios.post(`${SIDESHIFT_API_URL}/shifts/fixed`, req.body, {
            headers: {
                'x-sideshift-secret': SIDESHIFT_API_KEY,
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating shift:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
