const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username field is required"]
    },
    password: {
        type: String,
        required: [true, "Password field is required"]
    },
    channel_id: [{
        type: ObjectId
    }]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;