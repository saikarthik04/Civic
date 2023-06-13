const { User } = require('../model/user');
const CryptoJS = require("crypto-js");
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        console.log(user);
        console.log(user.userName);
        if (user !== null) {
            console.log(user.password);
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.secretPassKey);
            console.log(bytes);
            const originalPass = bytes.toString(CryptoJS.enc.Utf8);
            console.log(originalPass);
            if (originalPass !== req.body.password) { return res.status(401).send('wrong password') };
            const { password, ...others } = user._doc
            return res.status(200).json(others);
        }
        return res.status(401).send('user not found');
    }
    catch (err) {
        return res.status(500).json(err);
    }
}