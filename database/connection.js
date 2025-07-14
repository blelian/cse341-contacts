const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI; 


let db;

const connectToDb = (callback) => {
    MongoClient.connect(uri)
        .then(client => {
            db = client.db();
            console.log('Connected to MongoDB');
            callback();
        })
        .catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
};

const getDb = () => db;

module.exports = { connectToDb, getDb };
