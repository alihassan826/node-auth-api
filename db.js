const mongoose = require('mongoose');
const dbURL = "mongodb+srv://alihassan486788:1234@cluster0.si3672y.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
        await mongoose.connect(dbURL);

        console.log('Mongodb Connected');
    } catch (err) {
        console.log(err);
        process.exit(1); // if any issue occur with mongodb connection, this piece of code will crash the server
    }
};

module.exports = connectDb;
