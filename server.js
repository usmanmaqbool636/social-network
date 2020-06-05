const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
dotenv.config();
const connectDB = require('./db');
app.use(cors())
app.use(morgan('dev'))
connectDB()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/post", postRoutes);
app.use('/auth', authRoutes);
app.use("/user", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: "unauthorized!" });
    }
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server in running on port ${port}`)
})