const User = require("../AUTH/Schema");
const jwt = require("jsonwebtoken");

//config JWT signature
const createToken = (id) => {
  // console.log('id========',id); //unique id of user
  return jwt.sign({ id }, "Lays tomato flavour", {expiresIn: "12hours"})
};


//Handle errors
const handleErrors = (err) => {
  let errors = { username:"", email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "Invalid email";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "This email is already registered";
  }


  if (err._message == "Users validation failed" ) {
    // console.log('----------------------------', Object.values(err.errors));
    Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
  }

return errors;
};


//user register setup
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token);

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
  next();
};


//login setup
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log('server request --->>', req);

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token);
    res.status(200).json({ user: user._id, status: true }); //it will be send response on NETWORK
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }

};
