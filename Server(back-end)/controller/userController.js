const mongoose = require('mongoose');
var Campaign = require('../model/campaignModel');
var Report = require('../model/reportsModel');
var User = require('../model/userModel');
var Favorite = require('../model/favoriteModel');


exports.getAllCampaigns = async (req,res) => {
    const result = await Campaign.find({});
    res.json({
        status : 'success',
        data : result
    });
    return;
}

exports.findCampaign = async (req,res) => {
    
    const result = await Campaign.findOne({campaignAddress : req.body.campaignAddress})
    if(result){
        res.json({
            status : 'success',
            data : result
        });
    
        return ;
    }
    else{
        res.json({
            status : 'error',
            data : result
        })
    }

}



exports.addCampagin = async (req,res) => {
    console.log(req.body);
    const user = await User.findOne({ token : req.body.token});
    const campaign = await Campaign.findOne({user : user._id});
    if(campaign){
        res.json({ status : 'error' ,message : 'you can only make a single campaign at the moment' })
        return;
    }
    else{
        new Campaign({
            name : req.body.name,
            author : req.body.author,
            category : req.body.category,
            campaignAddress : req.body.campaignAddress,
            manager : req.body.manager,
            info : req.body.info,
            image : req.body.image,
            budget : req.body.budget,
            minimum : req.body.minimum,
            description : req.body.description,
            user : user._id
        }).save(async (err)=>{
            if(err){
                res.json({ status : 'error' ,message : err })
                console.log(err);
                return;
            }
            else{
                const newCamp = await Campaign.findOne({campaignAddress : req.body.campaignAddress})
                res.json({ status : 'success',message : 'you posted a new campagin',data : newCamp.campaignAddress});
                
                return;
            }
        })
    }
}

exports.removeCampagin = (req,res) => {

}

exports.editCampagin = (req,res) => {
    
}

exports.likeCampagin = async (req,res) => {
    console.log(req.body);
    const user = await User.findOne({token : req.body.token});
    if(user){
        await new Favorite({
            campaignAddress : req.body.campaignAddress,
            user : user._id
        }).save(err => {
            if(err){
                res.json({
                    status : 'error',
                    message : err
                });
                return;
            }

            else{
                res.json({
                    status : 'success',
                    message : 'you have successfully liked campaign'
                });
                return;
            }
        });
    }
    else{
        res.json({
            status : 'error',
            message : 'there is a problem with your token'
        });
        return;
    }
}

exports.getLike = async (req , res) => {
    const user = await User.findOne({token : req.body.token});
    if(user){
        const liked = await Favorite.findOne({ user : user._id , campaignAddress : req.body.campaignAddress });
        if(liked){
            res.json({
                status : 'success',
                data : true
            });
    
            return;
        }
        else {
            res.json({
                status : 'success',
                data : false
            });
    
            return;
        }
    }else{
        return;
    }

}

exports.dislikeCampaign = async (req,res) => {
    const user = await User.findOne({token : req.body.token});
    if(user) {
        const result = await Favorite.findOneAndRemove({ 
            user : user._id,
            campaignAddress : req.body.campaignAddress
        }).then(err => {
            if(!err) {
                res.json({
                    status : 'success',
                    message : 'you have successfully unlike the campaign'
                });
                return ;
            } else {
                res.json({
                    status : 'error',
                    message : err
                });
                return ;
            }
        });
    }
    else {
        res.json({
            status : 'error',
            message : 'there is a problem with your token'
        });
        return;
    }   
}

exports.reportCampagin = async (req,res) => {
    const user = await User.findOne({token : req.body.token});
    console.log(user);
    await new Report({
        campaignAddress : req.body.campaignAddress,
        user : user._id
    }).save((err)=>{
        if(err)
            res.json({status : "success",data : err});
        else{
            res.json({status : "success",data : "you have success fully report a campaign"});
        }
    })

}

exports.sendEmail = (req,res) => {

}

exports.isValidUser = (req,res) => {

}

