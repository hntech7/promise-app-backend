require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserPromise = require('./models/UserPromise');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Test endpoint: Root route
app.get('/', (req, res) => {
    res.send('Promise App API is running!');
});

// Test endpoint: Ping
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// Test endpoint: Echo
app.post('/echo', (req, res) => {
    res.json({
        received: req.body,
        message: 'This is your echoed data!',
    });
});

// Create a new promise
app.post('/promises', async (req, res) => {
    try {
        const { phoneNumber, description } = req.body;
        if (!phoneNumber || !description) {
            return res.status(400).json({ error: 'phoneNumber and description are required' });
        }
        const newPromise = new UserPromise({ phoneNumber, description });
        await newPromise.save();
        res.status(201).json(newPromise);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create promise', details: error.message });
    }
});

// Get promise by id
app.get('/promises/:id', async (req, res) => {
    try {
        const promise = await UserPromise.findById(req.params.id);
        if (!promise) {
            return res.status(404).json({ error: 'Promise not found' });
        }
        res.json(promise);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving promise', details: error.message });
    }
});

// Delete a promise by id
app.delete('/promises/:id', async (req, res) => {
    try {
        const promise = await UserPromise.findByIdAndDelete(req.params.id);
        if (!promise) {
            return res.status(404).json({ error: 'Promise not found' });
        }
        res.json({ message: 'Promise removed successfully', promise });
    } catch (error) {
        res.status(500).json({ error: 'Error removing promise', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});