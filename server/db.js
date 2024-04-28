const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const Connection = async () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/CSCFI");
        console.log("<Database connected>");
    }
    catch(err) {
        console.log("<Database Connection error: " + err + ">");
    }
};

Connection();