const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})


userSchema.pre('save', async function (next) {
    var salt = await bcrypt.genSalt(10)
    var hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next();

    // console.log(this.password);
})

var userModel = mongoose.model('User', userSchema)
module.exports = userModel

