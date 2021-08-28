var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fdishScheama = new Schema({
    dish : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Dish'
    }
});

var favoriteSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dishes : [fdishScheama]
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);