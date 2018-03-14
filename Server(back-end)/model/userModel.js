const mongoose = require('mongoose');
const mongodbErrorHandlers = require('mongoose-mongodb-errors');
var passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
/*------------------------------------------------------------------------*/
const connection = 'mongodb://admin:admin@ds111319.mlab.com:11319/kickstarter';
/*------------------------------------------------------------------------*/
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
/*------------------------------------------------------------------------*/

const userSchema = new Schema({
    name: {
        type: String,
        required: 'plz choose a name',
        trim : true,
    },
    email:{
        type:String,
        trim : true,
        unique : true,
        lowercase : true,
        validate : [validator.isEmail,'your email address is not valid'],
        required : 'you must enter a valid email address'
    },
    UserPhoto : {
          type:String,
          default : "/images/profile-black.jpg"
    },
    token : String,
    expiredToken : Date
})

/*------------------------------------------------------------------------*/
mongoose.plugin(mongodbErrorHandlers);
mongoose.connect(connection);
userSchema.plugin(passportLocalMongoose,{ usernameField : 'email'});
/*------------------------------------------------------------------------*/

module.exports = mongoose.model('User',userSchema);