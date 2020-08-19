const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserChannelSchema = new Schema({
    username: {
        type: String
    },
    channel_id: {
        type: ObjectId
    }
});

const UserChannel = mongoose.model('users_channels', UserChannelSchema);
module.exports = UserChannel;