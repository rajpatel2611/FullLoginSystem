const express = require('express');
const passport = require('passport');

const routes = express.Router();

const path = require('path');
const multer = require('multer');
const uploads = path.join('uploads');

console.log("index routing is working");

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,uploads)
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

const imageUpload = multer({storage : storage}).single('avatar')

const logincontroller = require('../controllers/LoginController');
const AdminController = require('../controllers/AdminController');
const Forgotpasswordcontroller = require('../controllers/ForgotpasswordController');
const CategoryModel = require('../controllers/CategoryController');
const subcategorycontroller = require('../controllers/SubcategoryController');


routes.get('/',logincontroller.login);
routes.get('/register',logincontroller.register);
routes.post('/registerData',logincontroller.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),logincontroller.loginData);
routes.get('/logout',logincontroller.logout);

// <=========  AdminController  ========>
routes.get('/admin',passport.checkAuthentication,AdminController.admin);
routes.get('/update',AdminController.update);
routes.post('/updateData',imageUpload,passport.checkAuthentication,AdminController.updateData);

// <=========  Forgotpasswordcontroller  ========>
routes.get('/emailsend',Forgotpasswordcontroller.emailsend);
routes.post('/emaildata',Forgotpasswordcontroller.emaildata);
routes.get('/otp',Forgotpasswordcontroller.otp);
routes.post('/otpData',Forgotpasswordcontroller.otpData);
routes.get('/newpass',Forgotpasswordcontroller.newpass);
routes.post('/newpassData',Forgotpasswordcontroller.newpassData);

// <=========  Forgotpasswordcontroller  ========>
routes.get('/category',passport.checkAuthentication,CategoryModel.index);
routes.post('/categoryData',passport.checkAuthentication,CategoryModel.categoryData);
routes.get('/view_category',passport.checkAuthentication,CategoryModel.view_category);

// <=========  subcategorycontroller  ========>
routes.get('/subcategory',passport.checkAuthentication,subcategorycontroller.index);
routes.post('/subcategoryData',passport.checkAuthentication,subcategorycontroller.subcategoryData);
routes.get('/view_subcategory',passport.checkAuthentication,subcategorycontroller.view_subcategory);




module.exports = routes;