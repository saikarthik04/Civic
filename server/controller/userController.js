const { User } = require('../model/user');
const CryptoJS = require("crypto-js");
const { json } = require('express');
// post  new user
exports.newuser = async (req, res) => {
    let user = new User(req.body);
    //const existingEmail = await User.findOne({ email: req.body.email }, 'email');
    const existingUser = await User.findOne({ userName: req.body.userName }, 'userName');
    console.log(existingEmail + ' existing email and ' + existingUserName + 'existing username');
    if ( existingUser.email !== null || '') {

        res.status(409).send({ "msg": "user already exists, try another username or E-mail" });
    }
    else {
        const encryptPass = CryptoJS.AES.encrypt(user.password, process.env.secretPassKey).toString();
        user.password = encryptPass;
        user.save();
        res.status(201).send({ "msg": "user sucessfully created" });

    }

}

// get users

exports.getUsers = async (req, res) => {
    try {
        await User.find().then(data => {
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve users" });
    }
}

// get user by userName

exports.getUserByName = async (req, res) => {
    try {
        await User.findOne({ userName: req.params.userName }).then(data => {
            if (data === null) {
                res.status(404).send({ 'msg': "user not found" });
            }
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve user" });
    }
}
// get user by Email
exports.getUserByEmail = async (req, res) => {
    try {
        await User.findOne({ email: req.params.email }).then(data => {
            if (data === null) {
                res.status(404).send({ 'msg': "user not found" });
            }
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve user" });
    }
}

// update user 

exports.updateUser = async (req, res) => {
    try {
        var name = req.params.userName
        console.log(req.params.userName);

        const user = await User.findOne({ userName: name });
        if (!user) {
            res.status(404).json({ "msg": "user not found to update" });
        }
        const encryptPass = CryptoJS.AES.encrypt(user.password, process.env.secretPassKey).toString();

        user.password = encryptPass;
        console.log(user);
        user.save(user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


//delete user

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({ userName: req.params.userName }).then(data => {
            console.log(data);
            if (!data) {
                res.status(404).send({ "msg": "user not found to delete" })
            }
            res.status(200).send({ "msg": "user has deleted successfully" })
        })

    } catch (error) {
        res.status("500").send({ "error": "unable to found or delete user" })
    }
}

