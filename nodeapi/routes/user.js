const router = require('express').Router();
const User = require('../models/user');
router.get('/alluser', async (req, res) => {
    try {
        const users = await User.find().select({password:false,"__v":false,updatedAt:false});
        return res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).send("internal server Error")
    }
})
module.exports = router;