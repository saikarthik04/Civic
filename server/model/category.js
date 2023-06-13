const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    _id: String,
    categoryName: {
        type: String,
        required: true
    },
    categoryType:{
        type: String,
        required: true
    },
    CatDesc: {
        type: String,

    },
    createdDate: {
        type: Date
    }
})
const Category = mongoose.model('Category', categorySchema)

module.exports = { Category }