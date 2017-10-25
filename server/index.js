require("./config");

const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require("./db/mongoose");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

require("./services/passport");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// enable cookies in express app
app.use(
  cookieSession({
    // how long does this cookie going to be in the browser
    // expressed in miliseconds
    // so 30 days will be
    // 30 days * 24 hours each day * 60 minutes in a hour * 60 seconds in a minute * 1000 ms in a second
    maxAge: 30 * 24 * 60 * 60 * 1000,

    // keys to encrypt this cookie and this value should be random and difficult to remember
    keys: [process.env.cookieKey]
    // keys: ['asr5g4asrarg3ag4ag651aga5s'],
  })
);

// expressSession is used in order to authenticate with twitter oauth
// app.use (
//   expressSession ({
//     secret: '3d4nstj4k5sty35sty4js65',
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// enable passport to use cookies in authentication
app.use(passport.initialize());
app.use(passport.session());

// Logic in production if there is no match the express routes here
// Routes
authRoutes(app);
billingRoutes(app);

// then go and check if public index.html file has one
if (process.env.NODE_ENV === "production") {
  // Making sure that express will serve up production
  // assets like out main.js file, or main.css file
  app.use(express.static("client/public"));

  // if there's not a public index.html go directly to index.html

  // express will serves up the index.hmtl file if it
  // doesnt recognize the route
  // const path = require ('path');
  // app.get ('*', (req, res) => {
  //   res.sendFile (path.resolve (__dirname, 'client', 'public', 'index.html'));
  // });
}

app.listen(PORT, () => {
  console.log(`Server completely running on port ${PORT}`);
});
