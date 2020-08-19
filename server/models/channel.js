const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    icon: {
        type: String,
        default: "comments"
    },
});

const Channel = mongoose.model('channel', ChannelSchema);
module.exports = Channel;