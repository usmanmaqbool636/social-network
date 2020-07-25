exports.postValidator = (req, next) => {
    const errors = {}
    const { title, body } = req;
    if (!title) errors.title = "title is required";
    if (title && (title.length < 6 || title.length > 150)) errors.title = "title must be length between 4 and 150"
    if (!body) errors.body = "body is required";
    if (body && (body.length < 6 || body.length > 1000)) errors.body = "body must be length between 4 and 600"
    if (Object.keys(errors).length > 0) {
        return next(errors);
    }   
    return next();
}