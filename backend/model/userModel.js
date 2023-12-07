const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell your name..."],
  },
  email: {
    type: String,
    required: [true, "Please provide your email..."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email..."],
  },
  photo: String,
  role: {
    type: String,
    enum: ["guest", "guide", "superadmin", "admin"],
    default: "guest",
  },
  password: {
    type: String,
    required: [true, "Please provide your email..."],
    minlength: 8,
    select: false,
  },
  cpassword: {
    type: String,
    required: [true, "Please confirm your password..."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  // Only runs on save or create
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.cpassword = undefined;
  next();
});

// Instance method for the comparison of password and confirm password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // changed password after the token was issued is true
    return JWTTimestamp < changedTimestamp;
  }

  // FALSE means not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
