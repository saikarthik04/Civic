const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const accessTokenheader = req.headers['access-token'] || req.params.token;
    try {
        if (accessTokenheader) {
            const token = accessTokenheader;
            console.log(token)
            jwt.verify(token, process.env.accessTokenKey, (err, user) => {
                if (err) { res.status(403).json("you are not authenticated") }
                else {
                    req.user = user;
                    console.log(req.user);
                    next();
                }
            })
        }
        else {
            res.status(401).json("token is needed to authenticate");
        }
    }

    catch (err) {
        res.status(500).json("error occured while authentication");
    }
};

exports.verifyIsAdmin = async (req, res, next) => {
    this.verifyToken(req, res, function (){
        if(req.user.role === "admin"){
            next()
        }
        else{
            res.status(403).send(" you don't have access");
        }
    });
}
exports.verifyIsCustomer = async (req, res, next) => {
    this.verifyToken(req, res, function (){
        if(req.user.role === "customer"){
            next()
        }
        else{
            res.status(403).send(" you don't have access");
        }
    });
}
exports.verifyIsSeller = async (req, res, next) => {
    this.verifyToken(req, res, function (){
        if(req.user.role === "Seller"){
            next()
        }
        else{
            res.status(403).send(" you don't have access");
        }
    });
}