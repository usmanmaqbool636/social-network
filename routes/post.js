const router = require("express").Router();
const formidable = require('formidable');
const { requireSignin, isPoster } = require('../controllers/auth');
const Post = require('../models/post');
const { postValidator } = require("../validator/post");
const fs = require('fs');
const _ = require('lodash');


router.get("/photo/:id", async (req, res) => {

    try {
        let post = await Post.findById(req.params.id);
        if (post.photo.data) {
            res.set(("Content-Type", post.photo.contentType))
            return res.send(post.photo.data)
        }
        else {
            return res.status(404).json({ message: "image not found" });
        }
    } catch (error) {
        console.log(err.message)
        res.status(500).send("internal server Error")
    }

})

router.get('/getAllpost',
    async (req, res) => {
        try {
            const posts = await Post.find().select({
                "__v": false
            }).populate("postedBy", "_id name").select({ photo: false })
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
            .populate("postedBy", " name")
            .select({photo:false})
            .sort({ createdAt: -1 })
        return res.status(200).json(post)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "internal server Error"
        })
    }
})
router.post('/createpost', requireSignin, async (req, res) => {

    try {

        // let user = await User.findById(req.params.id);
        const form = formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(404).json({ error: "photo could not uploaded" });
            }
            postValidator(fields, async (err) => {
                if (err) return res.status(403).json(err)
                else {
                    const post = new Post(fields);
                    if (files.photo) {
                        post.photo.data = fs.readFileSync(files.photo.path);
                        post.photo.contentType = files.photo.type;
                    }
                    if (err) return res.status(400).json({ message: "post no created" })
                    post.postedBy = req.user._id;
                    await post.save();
                    post.photo = undefined;
                    return res.status(200).json(post);
                }
            })
        });

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


router.get("/single/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate("postedBy","name")
            .select({photo:false})
        if (!post) {
            return res.status(404).json({
                message: "post not found"
            });

        }
        else {
            return res.json(post);
        }
    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "internal server Error"
        })
    }
})
module.exports = router;