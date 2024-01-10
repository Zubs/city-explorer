
// const express = require('express');
// const fetch = require('node-fetch');
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet';
import router from './apiRoutes';
import 'dotenv/config'


const PORT = 8000;
const app = express();
app.use(express.json());

// // In-memory storage for feedback
let feedbackStorage = [];

const {GEOAPIFY_API_KEY} = process.env;


app.use(cors());

app.use(morgan('combined')); // 'combined' format includes more details

app.use(express.json());

app.use(helmet());

// app.use((req, res, next) => {
//     const start = Date.now();
//     next();
//     const end = Date.now();
//     console.log(`${req.method} ${req.url} took ${end - start} ms`);
//   });
  


app.use('/api', router);


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

