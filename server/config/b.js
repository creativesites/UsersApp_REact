const mongo = require('mongodb');
const mongoose = require('mongoose');
const User = require('../models/User')
const bcrypt = require("bcryptjs");
//DB connection test

let pwd = 'Root2022';
const password = require("bcryptjs").hash(pwd, 10);
//'$2a$10$Mlqn2H5teTnex8AOZkWWiOPhSoPaJ13GhWf/MG.jhWgrYiwurd6CS'
console.log(password)
async function aa(){
    try {
        await mongoose.connect('mongodb://localhost:27017/ProfileApp',{
            useNewUrlParser: true,
            useUnifiedTopology: true
            }).then(async()=>{
                console.log('db connected') 
                await User.create({
                    username: 'admin',
                    password: '$2a$10$Mlqn2H5teTnex8AOZkWWiOPhSoPaJ13GhWf/MG.jhWgrYiwurd6CS',
                    role: "admin"
                  }).then((user)=>{
                      console.log(user)
                  })
            })
            
    } catch (error) {
        console.log(error)
    }
}
let username = 'admin'
async function bb(){
    try {
        await mongoose.connect('mongodb://localhost:27017/ProfileApp',{
            useNewUrlParser: true,
            useUnifiedTopology: true
            }).then(async ()=>{
                const user = await User.findOne({ username })
                if (user) {
                    console.log(user)
                }
                
            })
        
    } catch (error) {
        console.log(error)
    }
}
bb()