const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

const mongoUri = process.env.DB_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoUri).then((data) => {
            console.log(`Mongodb connected with server`);
        });
    } catch (err) {
        console.log('Error fetching data from MongoDB:', err);
    }
}
module.exports = mongoDB;