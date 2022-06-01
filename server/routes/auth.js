var app = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;


const dbConnect = require('../config/db');
const User = require('../models/User');

try {
  mongoose.connect('mongodb://localhost:27017/UserApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
      console.log('db connected') 
} catch (error) {
  console.log(error)
}
//app.use(express.json())
//var router = app.Router();

exports.register = async (req, res, next) => {
    const { name, password, email, job, salary } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        bcrypt.hash(password, 10).then(async (hash)=>{
            await User.create({
                name,
                password: hash,
                email,
                job,
                salary,
                role: 'Basic'
              }).then(user =>{
                const maxTime = 3 * 60 * 60;
                const token = jwt.sign({
                    id: user._id,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    job: user.job,
                    salary: user.salary
                }, jwtSecret,
                {
                    expiresIn: maxTime
                });
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxTime * 1000
                })
                res.status(201).json({
                  message: "User successfully created",
                  id: user._id,
                  role: user.role,
                  name: user.name,
                  email: user.email,
                  job: user.job,
                  salary: user.salary
                });
              });
        })
      
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: err.mesage,
      })
    }
  }

  exports.login = async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    // Check if username and password is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or Password not present",
      })
    }
    try {
      const user = await User.findOne({ email })
      if (!user) {
        res.status(400).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        // comparing given password with hashed password
        bcrypt.compare(password, user.password).then(function (result) {
            if(result){
                const maxTime = 3 * 60 * 60;
                const token = jwt.sign(
                    {
                      id: user._id,
                      role: user.role,
                      name: user.name,
                      email: user.email,
                      job: user.job,
                      salary: user.salary
                    },
                    jwtSecret,
                    {expiresIn: maxTime}
                );
                res.cookie("jwt", token,{
                    httpOnly: true,
                    maxAge: maxTime * 1000
                });
                res.status(201).json({
                    message: "Login successful",
                    id: user._id,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    job: user.job,
                    salary: user.salary
                  })
            }else{
                res.status(400).json({ message: "Login not succesful" })
            }
          
        })
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  }
  exports.updateUser = async (req, res, next) => {
    const { name, email, job, salary, password } = req.body
    try {
      bcrypt.hash(password, 10).then(async (hash)=>{
        await User.findOne({ email })
      .then((user)=>{
        user.name = name,
        user.email = email,
        user.job = job,
        user.salary = salary
        user.password = hash
        user.save((err) => {
            if (err) {
            res
                .status("400")
                .json({ message: "An error occurred", error: err.message });
            process.exit(1);
            }
            res.status("201").json({ message: "Update successful", user });
        });
      })
      })
      
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
   
    
  }
  exports.update = async (req, res, next) => {
      try {
        const { role, id } = req.body;
        if (role && id) {
        if (role === "admin") {
            await User.findById(id)
            .then((user) => {
                if (user.role !== "admin") {
                user.role = role;
                user.save((err) => {
                    if (err) {
                    res
                        .status("400")
                        .json({ message: "An error occurred", error: err.message });
                    process.exit(1);
                    }
                    res.status("201").json({ message: "Update successful", user });
                });
                } else {
                res.status(400).json({ message: "User is already an Admin" });
                }
            })
            .catch((error) => {
                res
                .status(400)
                .json({ message: "An error occurred", error: error.message });
            });
            }
        }  
      } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
          })
      }
    
}
exports.deleteUsr = async(req, res, next)=>{
  try {
      const {email } = req.body;
      console.log(req.body)
      await User.findOne({ email })
      .then(user => user.remove())
      .then(user => res.status(201).json({
          message: "deleted successfully", 
          user
      })).catch((error) =>{
        console.log(error)
          res.status(400).json({
              message: "an error occured"
          })
        })
  } catch (error) {
      
  }
}
exports.deleteUser = async(req, res, next)=>{
    try {
        const {id } = req.body;
        await User.findById(id)
        .then(user => user.remove())
        .then(user => res.status(201).json({
            message: "deleted successfully", 
            user
        })).catch(error =>
            res.status(400).json({
                message: "an error occured"
            })
            )
    } catch (error) {
        
    }
}