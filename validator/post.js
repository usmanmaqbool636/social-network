exports.postValidator = (req, res, next) => {
    const errors = {}
    const { title, body } = req.body;
    if (!title) errors.title = "title is required";
    if (title && (title.length < 6 || title.length > 150)) errors.title = "title must be length between 4 and 150"
    if (!body) errors.body = "body is required";
    if (body && (body.length < 6 || body.length > 600)) errors.body = "body must be length between 4 and 600"
    if (Object.keys(errors).length > 0) {
        return res.status(403).json(errors)
    }   
    return next();
}