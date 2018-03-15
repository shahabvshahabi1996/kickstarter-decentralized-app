const mongoose = require('mongoose');
var Campaign = require('../model/campaignModel');


exports.getAllCampaigns = async (req,res) => {
    const result = await Campaign.find({});
    res.json({
        status : 'success',
        data : result
    });

    return;
}

exports.findCampaign = async (req,res) => {
    console.log(req.body);
    const result = await Campaign.findOne({manager : req.body.manager , campaignAddress : req.body.campaignAddress})
    if(result){
        console.log(req.body);
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
    const campaign = await Campaign.findOne({manager : req.body.manager});
    if(campaign){
        res.json({ status : 'error' ,message : 'you can only make a single campaign at the moment' })
        return;
    }
    else{
        console.log(req.body);
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
            description : req.body.description
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

exports.likeCampagin = (req,res) => {
    
}

exports.reportCampagin = (req,res) => {
    
}

exports.sendEmail = (req,res) => {

}

exports.isValidUser = (req,res) => {

}

