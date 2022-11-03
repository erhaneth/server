
require('dotenv').config();
const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/dbank';

//connect to mongo db
mongoose.connect(MONGODB_URI);

//connection events
const db = mongoose.connection;
db.once('connected', () => console.log(`Connected ⛓  to MongoDB at ${db.host}:${db.port}`));

// when error occurs
db.on('error', (error) => console.log(`Database error\n${error} 🥹`));

module.exports = {
    //export all models
    User: require('./User'),
    
};