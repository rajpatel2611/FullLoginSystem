const CategoryModel = require('../models/CategoryModels');
const SubcategoryModel = require('../models/SubcategoryModel');

const index = async(req,res) => {
    try{
        let category = await CategoryModel.find({});
        if(category){
            return res.render('add_subcategory',{
                allcategory : category
            })
        }else{
            console.log("Category not found");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategoryData = async(req,res) => {
    try{
        let addsubcategory = await SubcategoryModel.create({
            category_name : req.body.category,
            subcategory : req.body.subcategory,
        })

        if(addsubcategory){
            console.log("Subcategory successfully add");
            return res.redirect('back');
        }else{
            console.log("Subcategory not add");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const view_subcategory = (req,res) => {
    SubcategoryModel.find({}).populate("category_name").then(data => {
        return res.render('view_subcategory',{
            alldata :  data
        });
    });
}

module.exports = {index,subcategoryData,view_subcategory};