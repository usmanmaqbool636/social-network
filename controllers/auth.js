const Post = require('../models/post');
const expressJWT = require('express-jwt');
const post = require("../models/post");
require('dotenv').config();
exports.requireSignin = expressJWT({ secret: process.env.JWT_SECRET })
exports.verification = (req, res, next) => {
    console.log(req.user._id === req.params.id)
    if (req.user._id === req.params.id) {
        return next()
    }
    return res.status(401).json({
        message: "you are not allowed to perform this opertation"
    })
}
exports.isPoster = async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "post not found" })
    console.log(req.user._id,post.postedBy)
    if (req.user._id == post.postedBy) {
        next();
    }
    else return res.status(401).json({
        message:"User is not authorized to delete this post"
    })
}