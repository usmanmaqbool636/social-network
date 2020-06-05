const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { signUpValidator, signInValidator } = require('../validator/auth');
router.post("/signup", signUpValidator, async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();
        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
})
router.post('/signin', signInValidator, async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if (!user) {
            return res.status(404).json({
                msg: "email and password do not match",
            })
        }
        console.log(user.decryptPassword(req.body.password  ))
        if (!user.decryptPassword(req.body.password)) {
            return res.status(404).json({
                msg: "email and password do not match",
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:9999});
        res.cookie("t", token, { maxAge: new Date(Date.now()+9999) });
        const { _id, name, email } = user;
        return res.json({
            token,
            user:{_id,name,email}
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("internal server error");
    }

})
router.get('/signout',(req,res)=>{
    res.clearCookie("t");
    return res.json({message:"signout successfully"});
})
module.exports = router;