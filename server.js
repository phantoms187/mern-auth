const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
//const environment = process.env.
const passport = require("passport");
const users = require("./routes/api/users");
const path = require("path");


// Bodyparser middleware
app.use( bodyParser.urlencoded({extended: false}) );
app.use( bodyParser.json() );

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect( db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get("/test", (req, res) => {
  console.log("working");
     res.send("Testing");
});
  
app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Server is up and running on port ${port}!`));