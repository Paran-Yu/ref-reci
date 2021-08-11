//----------------------------------
// lib
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const path = require("path");
const cors = require("cors");
const { response } = require("express");
const axios = require('axios');
require('dotenv').config();

// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;

//----------------------------------
// middleware
app.use(cors({credentials: true}));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db
//app.use(require(`${__dirname}/middleware/db`));
const { pool } = require(`${__dirname}/mysql`);

let sessionStore = new MySQLStore({}, pool);

const expireDate = new Date(Date.now() + 24*60*60*1000);

app.use(session({
  secret: "EZEZ",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
}));

//----------------------------------
// routes
app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
app.use("/base", require(`${__dirname}/routes/base/base`));
app.use("/base/auth", require(`${__dirname}/routes/base/auth`));
app.use("/callback", require(`${__dirname}/routes/callback/callback`));
app.use("/user", require(`${__dirname}/routes/user/user`));
app.use("/fridge", require(`${__dirname}/routes/fridge/fridge`));
app.use("/calendar", require(`${__dirname}/routes/calendar/calendar`));

app.get("/", function (req, res) {
  res.send("Hello node.js");
});

app.post("/add", async (req, res) => {
  const userName = req.body.userName;
  const userID = req.body.userID;
  const userPW = req.body.userPW;

  try {
    const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, ?, NOW(), 0)", [
      userName,
      userID,
      userPW,
    ])
    res.redirect('/');
  }
  catch (err) {
    console.log(err);
  }
});

app.get("/isLogin", async (req, res) => {
  if (req.session.uid) {
    console.log(`환영합니다 유저 넘버 ${req.session.uid}`);
  }
  else {
    console.log('로그인이 되어있지 않습니다.')
  }

  console.log(req.session);
  console.log(req.session.uid);
  res.send({ value: req.session });
})


app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
