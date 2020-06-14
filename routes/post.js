const router = require("express").Router();
const formidable = require('formidable');
const { requireSignin, isPoster } = require('../controllers/auth');
const Post = require('../models/post');
const { postValidator } = require("../validator/post");
const fs = require('fs');
const _ = require('lodash')

router.get('/getAllpost',
    async (req, res) => {
        console.log(req.user);
        try {
            const posts = await Post.find().select({
                "__v": false
            }).populate("postedBy", "_id name");
            return res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "internal server error"
            })
        }
    });
router.get("/by/:userid", async (req, res) => {
    try {
        const post = await Post.find({ postedBy: req.params.userid })
            .populate("postedBy", "_id name")
            .sort({ createdAt: -1 })
        return res.status(200).json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "internal server Error"
        })
    }
})
router.post('/createpost', requireSignin, postValidator, async (req, res) => {
    console.log(req.body);
    try {
        // let form = new formidable.IncomingForm();
        // form.keepExtensions = true;
        // form.parse(req, async (err, fields, files) => {

        //     if (err) return res.status(400).json({
        //         message: "Image could not be uploaded"
        //     })
        const post = new Post(req.body);
        console.log(req.user);
        // if (files.photo) {
        //     console.log("photo => ")
        //     post.photo.data = fs.readFileSync(files.photo.path);
        //     post.photo.contentType = files.photo.type;
        // }
        post.postedBy = req.user._id;
        await post.save();
        console.log("post created");
        return res.status(200).json(post);
        // })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "internal server Error"
        })
    }

});
router.route("/:postId")
    .all(requireSignin, isPoster)
    .delete(async (req, res) => {
        console.log(req.body)
        try {
            await Post.findByIdAndRemove(req.params.postId);
            res.status(200).json({ message: "post deleted successfully" });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({
                message: "internal server Error"
            })
        }
    })
    .put(async (req, res) => {
        try {
            let post = await Post.findById(req.params.postId)
            post = _.extend(post, req.body);
            await post.save()
            return res.json(post)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "internal server Error"
            })
        }
    })

module.exports = router;


// 03000223685