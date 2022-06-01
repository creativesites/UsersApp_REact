const mongo = require('mongodb');
const mongoose = require('mongoose');

//DB connection
const connectDB = async() =>{
    try {
        mongoose.connect('mongodb://localhost:27017/UserApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
            console.log('db connected') 
    } catch (error) {
        console.log(error)
    }
    
};

module.exports = connectDB;