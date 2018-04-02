
const mongoose = require('mongoose');
const mongodbErrorHandlers = require('mongoose-mongodb-errors');
const validator = require('validator');
/*------------------------------------------------------------------------*/
const connection = 'mongodb://admin:admin@ds111319.mlab.com:11319/kickstarter';
/*------------------------------------------------------------------------*/
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
/*------------------------------------------------------------------------*/

var reportSchema = new Schema({
    
    campaignAddress : {
        type : String,
        unique : false
    },
    user : {    
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }

});

/*------------------------------------------------------------------------*/
mongoose.plugin(mongodbErrorHandlers);
mongoose.connect(connection);
/*------------------------------------------------------------------------*/
module.exports = mongoose.model('Report',reportSchema );
