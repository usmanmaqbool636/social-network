const Post = require('../models/post');
const { validation } = require('../validator/auth');
exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find().select({
            "__v": false
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "internal server error"
        })
    }

}
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        console.log("post created")
        return res.status(200).json(post);
    }
    catch (err) {
        return res.status(500).json(validation(err))
    }

}