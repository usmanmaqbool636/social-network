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
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        text: String,
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});
module.exports = mongoose.model("Post", postSchema);