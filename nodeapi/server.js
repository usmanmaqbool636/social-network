const express = require('express');
const app = express();
app.get("/", (req, res) => {
    res.send("express api")
})
const port = 8080;
app.listen(port, () => {
    console.log(`server in running on port ${port}`)
})