const express = require('express');

const port = 3333;

const app = express();

const path = require('path');

const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const session = require('express-session');

const cookieparser = require('cookie-parser');

const multer = require('multer');
const uploads = path.join('uploads');


const db = require('./config/mongoose');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/uploads',express.static(path.join('uploads')));

app.use(session({
    name : 'vansh',
    secret : 'youtube',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 100*60*60*100
    }
}))

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookieparser());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Server not start");
        return false;
    }
    console.log("Server is start port :-"+port);
})