const User = require('../models/user');


const isEmail = (email) => {
    const Email = RegExp(/.+\@.+\..+/)
    return Email.test(email);
}

exports.signUpValidator = async(req, res, next) => {
    let errors = {}
    const { name, email, password } = req.body;
    if (!isEmail(email)) {
        errors.email = `${email} is not a valid email!`
    }
    const user =await User.findOne({ email:email });
    if (user) {
        errors.email = "email already exists"
    }
    if (!email) {
        errors.email = "email is required"
    }
    if (!name) {
        errors.name = "name is required"
    }
    if (password && password.length < 6) {
        errors.password = "password must contains atleast six character"
    }
    if (!password) {
        errors.password = "password is required"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(403).json(errors)
    }
    return next();
}

exports.signInValidator= (req, res, next) => {
    let errors = {}
    const { email, password } = req.body;
    if (!isEmail(email)) {
        errors.email = "invalid email"
    }
    if (!email) {
        errors.email = "email is required"
    }
    if (!password) {
        errors.password = "password is required"
    }
    if (Object.keys(errors).length > 0) {
        console.log("error");
        return res.status(403).json(errors)
    }
    return next()
}