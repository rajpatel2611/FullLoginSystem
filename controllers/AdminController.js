const Admintbl = require('../models/AdminModels');

const path = require('path');
const fs = require('fs');
const uploads = path.join('uploads');

const admin = (req,res) => {
    return res.render('admin');
}



const update = async(req,res) => {

    return res.render('profile')
}
const updateData = async(req,res) => {

    let id = req.body.editid; 

    try{

        if(req.file){

            let upimg = await Admintbl.findById(id)

            if(upimg.avatar){
                // fs.unlinkSync(upimg.avatar);
                let avatar = uploads+'/'+ req.file.filename;

                let update = await Admintbl.findByIdAndUpdate(id,{
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    avatar : avatar
                })
        
                if(update){
                    console.log("record are fetch");
                    return res.redirect('/');
                }
                else{
                    console.log("record not fetch");
                    return false;
                }
            }
            else{
                console.log('Can not Update img');
                return false;
            }
        }
        else{
            let upimg = await Admintbl.findById(id);

            if(upimg.avatar){
                let avatar = upimg.avatar;
                
                let update = await Admintbl.findByIdAndUpdate(id,{
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    avatar : avatar,
                })
                if(update){
                    console.log("record are fetch");
                    return res.redirect('/');
                }
                else{
                    console.log("record not fetch");
                    return false;
                }
            }
            else{
                console.log('Can not Update img');
                return false;
            }
        }

    }
    catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {admin,update,updateData};