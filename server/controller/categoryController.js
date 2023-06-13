const { Category } = require('../model/category')

// add Category

exports.newCategory = async (req, res) => {
    const category = new Category(req.body);
    const categoryId = await Category.findOne({ _id: req.body._id });
    try {
        if(categoryId!== null){
            res.status(409).send('{ "msg": "Category already exists" }')
        }
    
        category.createdDate = Date.now();
        console.log(category);
        category.save();
        res.status(201).send({ "msg": "Category added sucessfully" })
    }
    catch (err) {
        res.status(500).send({ "error": "unable to add Category" })
    }
}

// get Categories

exports.getCategories = async (req, res) => {
    try {
        await Category.find().then(data => {
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve Category" });
    }
}

// get Category by Id 


exports.getCategoryById = async (req, res) => {
    try {
        const cId = req.params._id;
        await Category.findById({_id:cId}).then(data => {
            if (data === null) {
                res.status(404).send({ 'msg': "Category not found" });
            }
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve Category" });
    }
}

// update Category by Id

exports.updateCategory = async (req, res) => {
    try {
        var cId = req.params._id;
        console.log(req.params._id);
         
        await Category.findByIdAndUpdate({ _id:cId }, req.body, { new: true }).then(data => {
            if (data != null) {
                console.log(data);

                res.status(200).send({ "msg": "Category has updated successfully" })
            }
            else res.status(404).send({ "msg": "Category not found to update" });
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to update Category" });
    }


}


//delete Category

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.params._id }).then(data => {
            console.log(data);
            if (!data) {
                res.status(404).send({ "msg": "Category not found to delete" })
            }
            res.status(200).send({ "msg": "Category has deleted successfully" })
        })

    } catch (error) {
        res.status("500").send({ "error": "unable to find and delete Category" })
    }
}

