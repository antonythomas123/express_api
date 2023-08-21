const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('Users', userScheme);