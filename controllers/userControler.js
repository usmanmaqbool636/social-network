const User = require('../models/user');
exports.addFollower = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.followid, { $push: { follower: req.user._id } })
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
    
    
    
}
exports.removeFollowing = async (req, res, next) => {
    try {
        const user=await User.findById(req.body.unfollowid);
        user.follower.pull(req.user._id);
        await user.save();
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}