const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;
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
}, {
    timestamps: true
});
userSchema.pre("save", function (next) {

    const hash = crypto.createHmac("sha1", process.env.PASSWORD_SECRET)
        .update(this.password)
        .digest("hex")
        console.log(hash)
    this.password = hash;
    next()
})
userSchema.methods.hashPassword = function (password) {
    const hash = crypto.createHmac("sha1", process.env.PASSWORD_SECRET)
        .update(password)
        .digest("hex")
    return hash;
}
userSchema.methods.decryptPassword=function(password){
    return this.hashPassword(password)===this.password;
}
module.exports = mongoose.model("User", userSchema);