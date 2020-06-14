const router = require('express').Router();
const User = require('../models/user');
const { requireSignin, verification } = require('../controllers/auth');
const _ = require('lodash');
router.get('/alluser', async (req, res) => {
    try {
        const users = await User.find().select({ password: false, "__v": false, updatedAt: false });
        return res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).send("internal server Error")
    }
})
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select({ password: false, "__v": false, updatedAt: false });
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
            user = _.extend(user, req.body)
            await user.save();
            user.password = undefined;
            user.__v = undefined;
            res.json(user);
        } catch (err) {
            console.log(err.message)
            res.status(500).send("internal server Error")
        }
    })
    .delete(async (req, res) => {
        try {
            await User.findByIdAndRemove(req.params.id);
            return res.json({
                message: "user deleted successfully"
            })
        } catch (error) {
            console.log(err.message)
            res.status(500).send("internal server Error")
        }
    })


module.exports = router;