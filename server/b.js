const crypto = require("crypto").randomBytes(35).toString("hex")
//console.log(crypto)


//     97225087bfed458ab545ef3a3eba11e4a3570bc0b06e02d1eb6ed53d605b19c93a001c
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret)