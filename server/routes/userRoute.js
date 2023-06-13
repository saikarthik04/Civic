const  { newuser,getUsers, getUserByName, getUserByEmail, updateUser, deleteUser, login } = require ('../controller/userController');
const express = require("express");
const router = express.Router();

// create new user

router.post('/signup',newuser)

// get all users
.get('/getusers',getUsers)

// get User by userName
.get('/getuser/:userName',getUserByName)

// get user by email
.get('/getuserbyemail/:email',getUserByEmail)

// update user by userName 
.patch('/updateuser/:userName',updateUser)

//delete user by userName
.delete('/deleteuser/:userName',deleteUser);


exports.router = router;
