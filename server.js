const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const logger = require('morgan');

require('dotenv').config();
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

const mongoose = require("mongoose");

app.use(cookieParser());
// use morgan for logging requests
app.use(logger("dev"));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  console.log('production1')
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lore", { useNewUrlParser: true, useUnifiedTopology: true });
// fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", withAuth, (req, res) => {
  console.log('server path');
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
//   res.sendFile(path.join(__dirname, "./login.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
