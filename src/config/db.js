const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/registration-backend');

mongoose.connection.on('connected', () => {
    console.info('Connected to MongoDB');
});

module.exports = mongoose;