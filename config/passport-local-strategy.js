const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const AdminModel = require('../models/AdminModels');

passport.use(new passportLocal({
    usernameField : 'email',
},async(email,password,done)=>{
    
    let user = await AdminModel.findOne({email : email});

    if(!user || user.password != password){
        console.log("Email and password not valid");
        return done(null,false);
    }
    return done(null,user);

}))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
    // console.log(usre.id);
});

passport.deserializeUser((id,done)=>{
    AdminModel.findById(id,(err,user)=>{
        if(err){
            return done(null,false);
        }
        return done(null,user);
        // console.log(user);
    })
})

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}


passport.setAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.users = req.user; 
    }
    return next();
}

module.exports = passport;