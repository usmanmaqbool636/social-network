const router = require('express').Router();
const User = require('../models/user');
const Post = require("../models/post");
const { requireSignin, verification } = require('../controllers/auth');
const { addFollower, removeFollowing } = require("../controllers/userControler");
const _ = require('lodash');
const fs = require('fs');
const formidable = require('formidable');
var mongo = require('mongodb');

router.put("/follow", requireSignin, addFollower, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, { $push: { following: req.body.followid } }, { new: true })
            .select({ photo: false })
            .populate("following", "_id name")
            .populate("follower", "_id name");

        user.password = undefined;
        user.__v = undefined;
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})

router.put("/unfollow", requireSignin, removeFollowing, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.unfollowid } }, { new: true })
            .select({ photo: false })
            .populate("following", "_id name")
            .populate("follower", "_id name");
        user.password = undefined;
        user.__v = undefined;
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})
router.get('/alluser', async (req, res) => {
    // var io = req.app.get('socketio');
    try {
        const users = await User.find().select({ password: false, "__v": false, updatedAt: false })
            .select({ photo: false });
        return res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).send("internal server Error")
    }
})


router.get("/suggestion", requireSignin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const following = user.following;
        following.push(user._id);
        const suggestion = await User.find({ _id: { "$nin": following } }).select({ name: true })

        return res.json(suggestion)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server Error")
    }
})


router.get("/likesgave", requireSignin, async (req, res) => {
    try {
        console.log(req.user._id);

        // const likes = await Post
        //     .aggregate()
        //     .unwind("likes")
        //     .match({"likes":req.user._id})

        // const likes = await Post.aggregate([
        //     { $unwind: "$likes" },
        //     { $match: { "likes": req.user._id } },
        //     { $count: "likes" }
        // ])

        const likes = await Post.find({ likes: req.user._id })
            .countDocuments()
        const comments = await Post.aggregate()
            .unwind("comments")
            .group({
                _id: "$comments.commentedBy",
                count: { $sum: 1 }
            })
        // .match({"_id":req.user._id})
        const filtercomments = comments.filter(c => {
            return c._id == req.user._id
        })
        // .count({})
        // .project({ comments: true })

        // const comments = await Post.aggregate([
        //     { $unwind: "$comments" },
        //     { $match: { "comments.commentedBy": req.user._id } },
        //     { $count: "comments" }
        // ])

        if (!likes) {
            return res.status(404).json({ message: "no record found" });
        }
        else {
            return res.status(200).json({ likes_post: likes, comments_post: filtercomments.length });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" })
    }
})


router.get("/likesreceive", requireSignin, async (req, res) => {
    try {
        const post = await Post.find({ postedBy: req.user._id }).select({ photo: false })
        let totalLikes = 0;
        let totalComment = 0;
        post.forEach(li => {
            totalLikes += li.likes.length;
            totalComment += li.comments.length;
        })
        if (!post) {
            return res.status(404).json({ message: "no record found" });
        }
        else {
            return res.status(200).json({ likes_receive: totalLikes, comments_receive: totalComment });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select({ password: false, "__v": false, updatedAt: false })
            .populate("follower", "_id name")
            .populate("following", "_id name");
        if (!user) return res.status(404).json({ message: "user not found" });
        return res.json(user);
    } catch (err) {
        console.log(err.message)
        res.status(500).send("internal server Error")
    }
})

router.route("/:id")
    .all(requireSignin, verification)
    .put(async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            const form = formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return res.status(404).json({ error: "photo could not uploaded" });
                }
                user = _.extend(user, fields);

                if (files.photo) {
                    user.photo.data = fs.readFileSync(files.photo.path);
                    user.photo.contentType = files.photo.type;
                }
                user.save((err, data) => {
                    if (err) return res.status(400).json({ message: "user not updated" })
                    data.password = undefined;
                    data.__v = undefined;
                    data.photo = undefined;
                    return res.json(data);
                });
            });
        } catch (err) {
            console.log(err.message)
            res.status(500).send("internal server Error")
        }
    })
    .delete(async (req, res) => {
        try {
            await Post.deleteMany({ postedBy: req.params.id });
            await Post.updateMany({}, { $pull: { "comments": { "commentedBy": req.params.id }, "likes": req.params.id } });
            const user = await User.findByIdAndRemove(req.params.id);
            return res.json({
                message: "user deleted successfully"
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("internal server Error")
        }
    })



router.get("/photo/:id", async (req, res) => {

    try {
        let user = await User.findById(req.params.id);
        if (user.photo.data) {
            res.set(("Content-Type", user.photo.contentType))
            return res.send(user.photo.data)
        }
        else {
            return res.status(404).json({ message: "image not found" });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("internal server Error")
    }

})

module.exports = router;