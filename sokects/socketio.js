const { random } = require("lodash");
const Post = require("../models/post");
const socket = io => {
    io.on('connection', socket => {
        socket.on("postUpdate", async (_id) => {
            console.log("postLikes==>>", _id);
            const post = await Post.findById(_id)
                .populate("postedBy", "name")
                .populate("comments", "text createdAt")
                .populate("comments.commentedBy", "name")
                .select({ photo: false })

            io.emit("post", post)
        })
    });
}

module.exports = socket;