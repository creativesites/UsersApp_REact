const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: false,
        required: true
    },
    password:{
        type: String,
        unique: false,
        minlength: 6,
        required: true
    },
    role:{
        type: String,
        default: "Basic",
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: false
    },
    job:{
        type: String,
        unique: false,
        required: false,
        default: ''
    },
    salary:{
        type: String,
        unique: false,
        required: false,
        default: ''
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;