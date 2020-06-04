const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
    title: {
        type: String,
        required: [true,"title is required"],
        minlength: [4,"title length between 4 and 150"],
        maxlength: [150,"title length between 4 and 150"]
    },
    body: {
        type: String,
        required: [true,"body is required"],
        minlength: [4,"body length between 4 and 600"],
        maxlength: [2000,"body length between 4 and 600"],
    },
});
module.exports = mongoose.model("Post", postSchema);