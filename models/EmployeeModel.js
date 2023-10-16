const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 100,
        required: true,
    },
    last_name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxlength: 25
    },
    salary: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("employee", employeeSchema);