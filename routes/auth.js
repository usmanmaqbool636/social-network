const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { signUpValidator, signInValidator } = require('../validator/auth');
const { requireSignin } = require('../controllers/auth');

router.post("/signup", signUpValidator, async (req, res) => {
    try {
        const user = new User(req.body);
        // const hash=await user.hashPassword(req.body.password);
        // user.password=hash;
        await user.save();
        user.password = undefined;
        user.__v = undefined;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 9999 });
        res.cookie("t", token, { maxAge: new Date(Date.now() + 9999) });
        const { _id, name, email, createdAt } = user;
        return res.json({
            token,
            user: { _id, name, email, createdAt }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
router.post('/signin', signInValidator, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
            .select({ photo: false })
            .populate("following", "_id name")
            .populate("follower", "_id name");
        if (!user) {
            return res.status(404).json({
                error: "email and password do not match",
            })
        }
        const comparePassword = await user.decryptPassword(req.body.password, user.password);
        console.log("comparePassword", comparePassword)
        if (!comparePassword) {
            console.log("compare password")
            return res.status(404).json({
                error: "email and password do not match",
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 9999 });
        res.cookie("t", token, { maxAge: new Date(Date.now() + 9999) });
        const { _id, name, email, createdAt } = user;
        return res.json({
            token,
            user: { _id, name, email, createdAt }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" });

    }

})
router.get("/logedin", requireSignin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select({
            password: false,
            __v: false,
            updatedAt: false,
            photo:false
        })
            .populate("following", "_id name")
            .populate("follower", "_id name");
        if (user) return res.status(200).json(user)
        return res.status(404).json({ error: "User Not Found" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" });
    }

})
router.get('/signout', (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "signout successfully" });
})
module.exports = router;