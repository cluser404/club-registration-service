const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/registration-service'
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
    console.info(`Connected to MongoDB at ${mongoUrl}`);
});

module.exports = mongoose;