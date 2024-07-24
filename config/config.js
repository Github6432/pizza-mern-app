const mongoose = require('mongoose');
require('colors');


const connectDB = async() => {
    try {
        const url = process.env.MONGO_URI
        const conn = await mongoose.connect(url);
        console.log(`Mongodb DataBase Connected! ${conn.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`Error: ${error.message}`.bgRed);
    }
};

module.exports = connectDB;