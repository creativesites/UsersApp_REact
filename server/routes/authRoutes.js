const express = require("express");
const {adminAuth} = require('../middleware/auth')
const router = express.Router();
const { register, login, update, deleteUser, updateUser, deleteUsr } = require("./auth");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").put(updateUser);
router.route("/update").put(adminAuth,update);
router.route("/delete").post(deleteUsr)
router.route("/deleteUser").delete(adminAuth,deleteUser);
module.exports = router