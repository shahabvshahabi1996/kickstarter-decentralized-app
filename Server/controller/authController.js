const mongoose = require('mongoose');
var User = require('../model/userModel');
const jwt = require('jsonwebtoken');


exports.verifyToken = async (req,res,next) => {
    console.log(req.body);
    jwt.verify(req.body.token , 'secretkey' , (err,decoded)=>{
        if(!err){
            next();
            return;
        } 
        else{
            res.json({
                status : 'error',
                message : 'your token is not valid'
            })
            return;
        }
    });

    return;
}


exports.verifyUserForLogIn = async ( req,res,next )=>{
    console.log(req.body);
    const user = await User.findOne({email : req.body.email , password : req.body.password})
    if(user){
        req.body.data = {
            email : user.email,
            password : user.password,
            name:user.name
        }
        next();
        return;
    }

    else{
        res.json({
            status : 'error',
            message : 'please enter a valid email and password'
        })
    }
}

exports.validateLogin = (req, res , next) => {
    req.checkBody('email','plz enter a valid email address').notEmpty().isEmail();
    req.checkBody('password','plz enter passowd').notEmpty();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();
    if(errors){
        let message = [];
        for(let i=0;i<errors.length;i++){
            message.push(errors[i].msg);  
        }
        res.json({
            status : 'error',
            message : message
        })
    }
    else
    next();
}

exports.validateRegister = (req,res,next) => {

    req.checkBody('name' , 'plz enter a valid name').notEmpty()
    req.checkBody('password', 'your passwords is not match').equals(req.body.repassword);
    req.checkBody('password', 'passwords must be at least 5 chars long and contain one number').isLength({ min: 5 }).notEmpty();
    req.checkBody('email','plz enter a valid email address').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();
    if(errors){
        let message = [];
        for(let i=0;i<errors.length;i++){
            message.push(errors[i].msg);  
        }
        res.json({
            status : 'error',
            message : message
        })
    }
    else
    next();
}

exports.verifyUserForSignUp = async ( req, res , next) => {

    const user = await User.findOne({email : req.body.email});
    if(!user){
       req.body.data = { name : req.body.name , email : req.body.email , password : req.body.password } 
        next();
        return;
    }
    else{
        res.json({
            status : 'error',
            message : 'Hey there were a problem with your signup plz check the email'
        })
        return;
    }
}

exports.signToken = (req, res , next) => {

    jwt.sign({ data : req.body.data}, 'secretkey',{expiresIn : '24 hours'} , (err,token) => {
        if(err){
            res.json({
                status : 'error',
                message : 'something went wrong in signing a token'
            })
            return ;
        }

        else{
            req.body.token = token;
            next();
        }
    });    
}   

exports.signup = async (req,res) => {
    const token = req.body.token;
    new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        token : req.body.token,
        expiredToken : new Date() + 86400000
    }).save((err)=>{ 
        if(err){
            res.json({
                status : 'error',
                message : 'there were a problem with your signup!!'
            })
            return;
        }
        else{
            res.json({ 
                token,
                status : 'success',
                message : 'you have success fully signed up!'
            });
        }
    })

    return;

}

exports.login = async (req,res) => {
    await User.findOneAndUpdate({email : req.body.email , password : req.body.password} , { token : req.body.token} , (err , data) => {
        console.log(data);
        if(err){
            res.json({
                status : 'error',
                message : 'there were an error while you logging in'
            });
            return;
        }

        else{
            let token = req.body.token;
            res.json({ 
                token,
                status : 'success',
                message : 'you have success fully logged in!'
            });
        }
    });
}

exports.logout = async (req,res) => {
    const user = await User.findOne({token : req.body.token});
    if(user){
        user.token = undefined;
        user.expiredToken = undefined;
        res.json({
            status : 'success',
            message : 'you have successfully loged out'
        });
    }
    else{
        res.json({
            status : 'error',
            message : 'there is a problem with your logging out!'
        });
    }
}

exports.findUser = async (req , res) => {
    const user = await User.findOne({token : req.body.token});
    if(user){
        res.json({
            data : user,
            status : 'success'
        });

        return;
    }

    else{
        return;
    }
}

exports.deleteAccount = async (req,res) => {
    User.findOneAndRemove({token : req.body.token} , (err) => {
        if(err){
            res.json({
                status : 'err',
                message : err
            })
        }else{
            res.json({
                status : 'success',
                message : 'you have successfully deleted your profile!'
            })
        }
    });

    return;
}

exports.forgotPassword = async (req,res,next) => {
    const user = await User.findOne({email : req.body.email});
    if(user) {
        req.body.user = user;

        // next();
        res.json({
            status : 'success',
            message : `your password is : ${user.password}`
        })
        return;
    }

    else {
        res.json({
            status : 'err',
            message : 'there is no email address like this'
        });
    }

    return ;
}

exports.changePassword = (req,res) => {
    User.findOneAndUpdate({token : req.body.token} , { password : req.body.password } , (err) => {
        if(err) {
            res.json({
                status : 'err',
                message : err
            });
        } else { 
            res.json({
                status : 'success' ,
                message : 'you have successfully changed your password!'
            });
        }
    });

    return ;
}

exports.changeEmail = (req,res) => {
    User.findOneAndUpdate({token : req.body.token} , { email : req.body.email } , (err) => {
        if(err) {
            res.json({
                status : 'err',
                message : err
            });
        } else { 
            res.json({
                status : 'success' ,
                message : 'you have successfully changed your email!'
            });
        }
    });

    return ;
}
