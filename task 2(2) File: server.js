// File: server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Configure EJS as the templating engine
app.set('view engine', 'ejs');

// Route to handle property search: /search/residential-property-for-buy-in-noida
app.get('/search/:type', async (req, res) => {
    const searchType = req.params.type;
    const searchLocation = req.query.location || 'noida';
    const requestUrl = req.originalUrl;

    try {
        // Fetch property listings based on user search criteria
        const response = await axios.get('https://api.example.com/properties', {
            params: {
                type: searchType,
                location: searchLocation
            }
        });

        const propertyList = response.data;

        // Render the search page with SEO-optimized metadata
        res.render('search', {
            pageTitle: `Properties for ${searchType.replace(/-/g, ' ')} in ${searchLocation}`,
            metaDescription: `Find verified ${searchType.replace(/-/g, ' ')} in ${searchLocation} with best deals.`,
            canonicalUrl: `https://www.hexahome.in${requestUrl}`,
            propertyList
        });

    } catch (error) {
        console.error('Error retrieving property data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
