const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Sahilkumar26244:Sahilkr123@mongodbcluster.nrwwxgv.mongodb.net/?retryWrites=true&w=majority" , {
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
