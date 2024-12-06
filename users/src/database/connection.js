const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        // Connecting to MongoDB
        await mongoose.connect(DB_URL, { 
        });

        console.log('MongoDB connected successfully'); // This should now print if connection succeeds

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected, attempting to reconnect...');
            setTimeout(() => {
                mongoose.connect(DB_URL); // attempt reconnect
            }, 5000); // retry after 5 seconds
        });

    } catch (error) {
        console.error('Error while connecting to MongoDB:', error);
        process.exit(1);
    }
};
