// const express = require('express');
// const fetch = require('node-fetch');
import express from 'express';
import fetch from 'node-fetch';
const PORT = 3000;
const app = express();
app.use(express.json());

// // In-memory storage for feedback
let feedbackStorage = [];

const GEOAPIFY_API_KEY = '75443e8e914340ad836ba591601e3c92';

app.get('/api/supermarkets', async (req, res) => {
    // Extract parameters from the query string
    const { lat, lon, radius } = req.query;

    // Construct the Geoapify API URL
    const url = `https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:${lon},${lat},${radius}&apiKey=${GEOAPIFY_API_KEY}`;

    try {
        // Fetch the data from Geoapify Places API
        const response = await fetch(url);
        const data = await response.json();

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/entertainment', async (req, res) => {
    // Extract parameters from the query string and parse them as floats
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    const radius = parseInt(req.query.radius, 10);

    // Validate the parameters
    if (isNaN(lat) || isNaN(lon) || isNaN(radius)) {
        return res.status(400).json({ error: "Invalid 'lat', 'lon', or 'radius' query parameters. They must be valid numbers." });
    }

    // Construct the Geoapify API URL for entertainment categories
    const url = `https://api.geoapify.com/v2/places?categories=entertainment&filter=circle:${lon},${lat},${radius}&apiKey=${GEOAPIFY_API_KEY}`;

    try {
        // Fetch the data from Geoapify Places API
        const response = await fetch(url);
        const data = await response.json();

        // Check if the API returned an error
        if (data.error) {
            return res.status(400).json(data);
        }

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/parks', async (req, res) => {
    // Extract parameters from the query string
    const { lat, lon, radius } = req.query;

    // Construct the Geoapify API URL for parks category
    const url = `https://api.geoapify.com/v2/places?categories=leisure.park&filter=circle:${lon},${lat},${radius}&apiKey=${GEOAPIFY_API_KEY}`;

    try {
        // Fetch the data from Geoapify Places API
        const response = await fetch(url);
        const data = await response.json();

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/restaurants', async (req, res) => {
    // Extract parameters from the query string
    const { lat, lon, radius, categories, conditions } = req.query;

    // Construct the Geoapify API URL for restaurants category
    // You can add more criteria by appending additional query parameters
    let url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},${radius}&apiKey=${GEOAPIFY_API_KEY}`;

    // Add optional categories if provided
    if (categories) {
        url += `&categories=${categories}`;
    }

    // Add optional conditions if provided
    if (conditions) {
        url += `&conditions=${conditions}`;
    }

    try {
        // Fetch the data from Geoapify Places API
        const response = await fetch(url);
        const data = await response.json();

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/feedback', (req, res) => {
    // Extract feedback from the request body
    const { user, comment } = req.body;

    // Simple validation
    if (!user || !comment) {
        return res.status(400).json({ error: 'User and comment are required.' });
    }

    // Create a feedback object
    const feedback = {
        id: feedbackStorage.length + 1,
        user,
        comment,
        timestamp: new Date()
    };

    // Store the feedback in memory
    feedbackStorage.push(feedback);

    // Send a success response
    res.status(201).json({ message: 'Feedback received', feedback });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// At the end of src/index.js
export default app;
