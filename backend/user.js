const express = require("express");
const app = express.Router();
const axios = require("axios");
const crypto = require('crypto');

require('dotenv').config();

//const { pool } = require(`${__dirname}/../../mysql`)
const { pool } = require(`./../../mysql`);

app.post("/register", async (req, res) => {
    const userName = req.body.userName;
    const userID = req.body.userID;
    const inputPassword = req.body.userPW;
    const hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");

    console.log(userName);
    console.log(userID);
    console.log(inputPassword);
    console.log(hashPassword);

    try {
        const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, ?, NOW(), 0)", [
            userName,
            userID,
            hashPassword,
        ]);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

})

app.post("/login", async (req, res) => {
    const userID = req.body.userID;
    const password = req.body.userPW;

    console.log(userID);
    console.log(password);

    try {
        const [rows, fields] = await pool.query("SELECT userPW FROM User WHERE userID = ?", [
            userID
        ]);
        
        let dbUserPW = JSON.stringify(rows[0].userPW);
        let t = dbUserPW.replace("\"","");
        let s = t.replace("\"", "");
        dbUserPW = s;


        console.log(`password: ${password}`);
        console.log(`userPW: ${dbUserPW}`);
        
        //salt값으로 해쉬 처리 해주는 부분

        if(dbUserPW === password){
            console.log("비밀번호 일치");
        }
        else{
            console.log("비밀번호 불일치");
        }
        
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = app;
