const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie")

// models

const userSchema = new mongoose.Schema({
    usernmae: {
        type: String,
        required: [true, "Username is Required"]

    },
    email: {
        type: String,
        required: [true, "Email is Required"]

    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlenght: [6, "Password lenght shuold be 6 characters long"]

    },
    customerId: {
        type: String,
        default: "",

    },
    subcription: {
        type: String,
        default: "",

    },
});

// hashed password
userSchema.pre("save", async function (next) {
    //update
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()

});

// match password

userSchema.method.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)

}
// sing token

userSchema.method.getSignedToken = function (res) {
    const accessToken = jwt.sign({ id: this.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIREIN })
    const refreshToken = jwt.sign({ id: this.id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_EXPIREIN })
    res.cookie("refreshToken", `${refreshToken}`, { maxAge: 86400 * 7000, httponly: true })
}

const User = mongoose.model("User", userSchema);

module.exports = User;