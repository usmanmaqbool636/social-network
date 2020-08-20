const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
// var bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
});
userSchema.pre("save",async function (next) {
    //  this.password = bcrypt.hashSync(this.password);
    this.password = await bcrypt.hash(this.password, 10);
    next()
})
userSchema.methods.hashPassword =async function (password) {
    const hash= await bcrypt.hash(password, 10);
    return hash;
}
userSchema.methods.decryptPassword = async function (password, hash) {
    const result= await bcrypt.compare(password, hash);
    console.log(result);
    return result;
}
module.exports = mongoose.model("User", userSchema);