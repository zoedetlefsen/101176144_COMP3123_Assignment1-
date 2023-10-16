const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        maxlength: 50,
        required: true,
    },
    username: {
        type: String,
        maxlength: 100,
        required: true
    },
    password: {
        type: String,
        maxlength: 50,
        required: true
    }
})

module.exports = mongoose.model("user", userSchema);