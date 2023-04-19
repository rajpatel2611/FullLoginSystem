const AdminModel = require('../models/AdminModels');

const nodemailer = require('nodemailer');

const cookie = require('cookie-parser');

const emailsend = (req,res) => {
    return res.render('emailsend');
}

const emaildata = async(req,res) => {
    let useremail = req.body.useremail;
    // console.log(req.body);
    try{
        let checkmail = await AdminModel.findOne({email : useremail});
        if(checkmail){
            let otp = Math.floor(Math.random() * 10000);

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'vanshgajera50@gmail.com',
                    pass: 'wqijuhzlehkxsuae'
                }
            });
            
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'vanshgajera50@gmail.com', // sender address
                to: useremail, // list of receivers
                subject: 'Forgot password', // Subject line
                text: 'Your OTP code is :- '+ otp +'. This is valid for 5 minutes :- code', // plain
               // html body
            };
            let obj = {
                email : useremail,
                otp : otp
            }
            res.cookie('userOtp',obj);
            
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                return res.redirect('/otp');
            });

        }else{
            console.log("User not found");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const otp = (req,res) => {
    return res.render('otp');
}

const otpData = (req,res) => {
    let otp = req.cookies.userOtp.otp;
    let userotp = req.body.otp;

    if(otp == userotp){
        return res.redirect('/newpass');
    }else{
        console.log("please check otp");
        return res.redirect('back');
    }
}

const newpass = (req,res) => {
    return res.render('newpass');
}

const newpassData = async(req,res) => {
    try{
        let password = req.body.password;
        let cpassword = req.body.cpassword;
            if(password == cpassword)
            {
                let email = req.cookies.userOtp.email;
                let edituser = await AdminModel.findOneAndUpdate({email : email},{
                    password : password
                });
                
                if(edituser){
                    console.log("password successfully update!");
                    res.clearCookie("userOtp");
                    return res.redirect('/');
                }
            }else{
                console.log("Password and confirm password not match");
                return res.redirect('back');
            }
    }catch(err){
        console.log(err);
        return false;
    }
}


module.exports = {emailsend,emaildata,otp,otpData,newpass,newpassData};