const CategoryModel = require('../models/CategoryModels');

const index = (req,res) => {
    return res.render('category');
}

const categoryData = async(req,res) => {
    try{
        let category = await CategoryModel.create({
            category_name : req.body.category
        });

        if(category){
            console.log("Category sucessfully add");
            return res.redirect('back');
        }else{
            console.log("Category not add");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const view_category = async(req,res) => {
    try{
        let viewrecord = await CategoryModel.find({});
        if(viewrecord){
            return res.render('view_category',{
                alldata : viewrecord
            });
        }else{
            console.log("Record not view");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {index,categoryData,view_category};