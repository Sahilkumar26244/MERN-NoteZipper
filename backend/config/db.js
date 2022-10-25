const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/users" , {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Mongoose Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;
