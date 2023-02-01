const User = require("../AUTH/Schema");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('token-----------.', req);
  if (token) {
    jwt.verify( token, "Lays tomato flavour", async (err, client) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          // console.log('client',client);
          const user = await User.findById(client.id);
          if (user) res.json({ status: true, email: user.email, username:user.username }); //this is send response to NETWORK
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
  
};
