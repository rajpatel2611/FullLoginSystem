const mongoose = require('mongoose');

const schema = mongoose.Schema({
    category_name : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    subcategory : {
        type : String,
        required : true
    }
});

const subcategory = mongoose.model('subcategory',schema);
module.exports = subcategory;

