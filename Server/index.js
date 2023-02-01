const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redirect = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

//starts express server
app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 4000");
  }
});

//database connectivity
mongoose.connect("mongodb://localhost:27017/JWT", ()=>{
  console.log('Database connected successfully :-)');
})


//it allows to cross-site HTTP requests
app.use( cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

app.use(cookieParser());

app.use(express.json());
app.use("/", redirect);
