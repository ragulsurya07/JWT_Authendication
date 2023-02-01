const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

//hash password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// console.log('userSchems ------>>> ', userSchema);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    // console.log('password---->> ', user.password);
    const auth = await bcrypt.compare(password, user.password); //password - frontend entered password, user.password - encrypted password
    if (auth) {
      return user; //here the login process is done from registered email & pwd
      // console.log('USER++++ ',user);
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};


module.exports = mongoose.model("Users", userSchema);
