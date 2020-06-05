const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    body: {
        type: String,
        required: [true, "body is required"]
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Post", postSchema);