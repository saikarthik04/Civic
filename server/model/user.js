const mongoose = require('mongoose')
// userschema 
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    fisrtName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'User email is required']
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
       type: String,
       enum: ['admin', 'customer', 'seller']
    },
    address: [{
        flatNo: String,
        area: String,
        landmark: String,
        phoneno: String,
        alternatephoneno: String,
        pincode: Number,
        city: String,
        state: String,
        country: String
    }],
    shippingaddress: [{
        flatNo: String,
        area: String,
        landmark: String,
        pincode: Number,
        phoneno: String,
        alternatephoneno: String,
        city: String,
        state: String,
        country: String
    }]
});

// creating User model 
const User = mongoose.model('User', userSchema);

module.exports = { User };


