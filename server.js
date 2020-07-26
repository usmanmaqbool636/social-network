const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
dotenv.config();
const connectDB = require('./db');
connectDB()
app.use(express.static(path.join(__dirname, "Client/build"))); app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    app.set('socketio', io);
    next()
})

app.use("/api/post", postRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "Client", "build", "index.html"))
})
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: "unauthorized!" });
    }
});

var port = process.env.PORT;
var server = app.listen(port, () => {
    console.log(`server in running on port ${port}`)
})

var io = require('socket.io').listen(server);
require('./sokects/socketio')(io);

