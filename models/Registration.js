const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    name: String,
    // cardNumber: String,
    // method: String
});

mongoose.model('registration', registrationSchema);