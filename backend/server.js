//----------------------------------
// lib
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const { response } = require("express");
const axios = require('axios');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const option = {
  host: 'i5a203.p.ssafy.io',
  user: 'user',
  password: process.env.dbPassword,
  database: 'refreci',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
};
const sessionStore = new MySQLStore(option);
// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;

//----------------------------------
// middleware

// cors
// app.use(
//   cors({
//     origin: "*",
//     optionsSuccessStatus: 200,
//   })
// );
app.use(cors());
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// db
//app.use(require(`${__dirname}/middleware/db`));
const { pool } = require(`${__dirname}/mysql`);
app.use(session({
  httpOnly: true,
  secret: "EZEZ",
  resave: false,
  saveUninitialized: true,
  store: sessionStore
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


app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
