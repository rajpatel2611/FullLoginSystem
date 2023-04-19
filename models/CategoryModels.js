const mongoose = require('mongoose');

const schema = mongoose.Schema({
    category_name : {
        type : String,
        required : true
    }
});


const category = mongoose.model('category',schema);
module.exports = category;