//----------------------------------
// lib
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const { response } = require("express");
const axios = require('axios');

// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;
require('dotenv').config();

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

//----------------------------------
// middleware

// cors
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// db
//app.use(require(`${__dirname}/middleware/db`));
const { pool } = require(`${__dirname}/mysql`)
//----------------------------------
// routes
app.use(uploadFilePath, express.static(path.join(__dirname + uploadFilePath)));
app.use("/base", require(`${__dirname}/routes/base/base`));
app.use("/base/auth", require(`${__dirname}/routes/base/auth`));

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

app.get("/callback/github", async (req, res) => {
  const requestToken = req.query.code;

  try {
    const access_token = await axios({
      method: 'post',
      url: `http://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    });

    console.log('response.data');
    console.log(access_token.data);
    console.log('access_token');
    console.log(access_token.data.access_token);

    const userResponse = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${access_token.data.access_token}`,
      },
    });

    console.log('social login result:', userResponse.data);
    console.log(`${userResponse.data.name}님 환영합니다.`)

    res.redirect('/');
  }

  catch (err) {
    console.log(err);
  }
});



//----------------------------------
//
app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
