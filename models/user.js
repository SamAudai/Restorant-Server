var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({ //remove username and password because is call authomatically in passport-local-mongoose module   
    firstname: {
        type: string,
        default: ''
    },
    lastname: {
        type: string,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);