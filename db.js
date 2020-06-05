const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/SocialNetwork", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`DB connected`)
    }
    catch (e) {
        mongoose.connection.on("error",(err)=>{
            console.log(`DB not Connected ${err.message}`)
        })
    }
}

module.exports = connectDB;