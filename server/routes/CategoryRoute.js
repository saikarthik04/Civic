const express = require('express');
const { newCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controller/categoryController')
const router = express.Router();

router.post('/',newCategory)

.get('/getcategories',getCategories)

.get('/getcategorybyid/:_id',getCategoryById)

.patch('/upadtecategory/:_id',updateCategory)

.delete('/deleteCategory/:_id',deleteCategory);

exports.router =router;