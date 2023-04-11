const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = async () => {
    console.log('creating Connection with server');
    try {
        const conn = await mongoose.connect(process.env.ONLINE_DATABASE_KEY);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
module.exports = { connectDB }
