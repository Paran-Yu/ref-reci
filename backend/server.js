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
const fs = require("fs");
const { Server } = require("http");
require('dotenv').config();

// --------------------------------------------
// env
const envJson = require(`${__dirname}/env/env.json`);
const uploadFilePath = envJson.uploadFilePath;
const port = envJson.port ? envJson.port : 3001;

//----------------------------------
// middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

const allowList = ['http://i5a203.p.ssafy.io', 'http://i5a203.p.ssafy.io:3001']

app.all('/user/logout', function(req, res, next){
  const origin = req.headers.origin;
  console.log(req.headers)
  console.log(origin)
  if (allowList.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '3600');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Requested-With');

  // res.header("Access-Control-Allow-Origin", "http://i5a203.p.ssafy.io");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  next();
})

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db
//app.use(require(`${__dirname}/middleware/db`));
const { pool } = require(`${__dirname}/mysql`);

let sessionStore = new MySQLStore({}, pool);

app.use(session({
  secret: "EZEZ",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000*60*60*24,
  }
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
app.use("/foodlist", require(`${__dirname}/routes/calendar/foodlist`));


app.get("/", function (req, res) {
  res.send("Hello node.js");
});


app.get("/img", function(req, res){
  const rID = req.query.id;
  fs.readFile(`../../images/${rID}`, function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  })
})

app.listen(port, () => {
  console.log(`{init : ${port}}`);
});
