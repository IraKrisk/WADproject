var express = require("express");  // require the express module
var app = express();  // create the express application

app.use(express.static("views"));  // access to the view folder
app.use(express.static("scripts"));  // access to the scripts folder
app.use(express.static("images")); // access to the images folder

app.set("view engine", "jade");  // view engine setup

// HTTP GET request for root page
app.get('/', function(req, res) {
  res.render("index");
});
// HTTP GET request for contact page
app.get('/contact', function(req, res) {
  res.render("contact");
});

// server set up
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log("Server started");
});