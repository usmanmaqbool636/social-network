const Post = require('../models/post');
const router = require("express").Router();
require('dotenv').config()
const { createPost } = require('../controllers/post');
const { postValidator } = require("../validator/post");
const expressJWT = require('express-jwt');
const User = require('../models/user');
router.get('/getAllpost'
// ,
//  expressJWT({ secret: process.env.JWT_SECRET }),
//     async (req, res, next) => {
//         const user = await User.findById(req.user._id).select({ password: false, "__v": false })
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         req.user = user;
//         next()
//     }
    , async (req, res) => {
        console.log(req.user);
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

    });
router.post('/createPost', expressJWT({ secret: process.env.JWT_SECRET }), postValidator, createPost);
module.exports = router;


// 03000223685