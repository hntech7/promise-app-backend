const mongoose = require('mongoose');
const UserPromise = require('./models/UserPromise');

console.log('UserPromise:', UserPromise);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/test')
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const instance = new UserPromise({
                phoneNumber: '1234567890',
                description: 'Test promise'
            });
            console.log('Instance created:', instance);
        } catch (err) {
            console.error('Error creating instance:', err);
        }
        mongoose.connection.close();
    })
    .catch(err => console.error('MongoDB connection error:', err));