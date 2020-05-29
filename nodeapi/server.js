const express = require('express');
const app = express();
const { getPost } = require('./routes/post');

app.get("/", getPost)
const port = 8080;
app.listen(port, () => {
    console.log(`server in running on port ${port}`)
})