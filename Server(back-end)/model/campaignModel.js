
const mongoose = require('mongoose');
const mongodbErrorHandlers = require('mongoose-mongodb-errors');
const validator = require('validator');
/*------------------------------------------------------------------------*/
const connection = 'mongodb://admin:admin@ds111319.mlab.com:11319/kickstarter';
/*------------------------------------------------------------------------*/
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
/*------------------------------------------------------------------------*/

var campaignSchema = new Schema({
    name : {
        trim : true,
        type : String,
        required : 'Plz enter a name for your project'
    },
    expiredDate : {
        type : Date,
        default : Date.now() + 1296000000,//15 days later your project will be gone automaticly
        required : true
    },
    author : {
        type : String,
        require : 'You must enter a valid Author'
    },
    category : {
        type : String,
        required : 'Plz enter a category for your project'
    },
    campaignAddress : {
        unique : true,
        type : String,
        required : true
    },
    manager : {
      type : String,
      unique : true,
      required : 'Plz enter a valid wallet address'  
    },
    info : {
        type : String,
        required : 'Plz write some thing about your project'
    },
    image : {
        type : String,
        required : 'Plz enter a picture from your project'
    },
    budget : {
        type : Number,
        required : 'Plz enter your dreamy budget'
    },
    minimum : {
        type : Number,
        required : 'Plz enter a minimum contribution amount'
    }

});

/*------------------------------------------------------------------------*/
mongoose.plugin(mongodbErrorHandlers);
mongoose.connect(connection);
/*------------------------------------------------------------------------*/

module.exports = mongoose.model('Campaign',campaignSchema );
