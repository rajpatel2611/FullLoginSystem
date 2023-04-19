const AdminModel = require('../models/AdminModels');

const path = require('path');
const fs = require('fs');


const register = (req,res) => {
    return res.render('register');
}


const login = (req,res) => {
    if(res.locals.users){
        return res.redirect('/admin');
    }
    return res.render('login');
}

const registerData = async(req,res) => {
    try{
        let password = req.body.password;
        let cpassword = req.body.cpassword;
        if(password == cpassword)
        {
            let register = await AdminModel.create({
                name : req.body.name,
                email : req.body.email,
                password : password,
                avatar : path.join('uploads')+"/user.jpg"
            });
            if(register){
                console.log("User successfully register");
                return res.redirect('/');
            }else{
                console.log("User not register");
            }
        }else{
            console.log("confirm passowrd and password not match");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}



const loginData = (req,res) => {
    return res.redirect('/admin');
}

const logout = (req,res) =>{
    req.logout((err)=>{
       if(err){
        console.log("error ");
       }
       return res.redirect('/')
    })
}

module.exports = {login,register,registerData,loginData,logout};