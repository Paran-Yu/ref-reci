const express = require("express");
const app = express.Router();
const axios = require("axios");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();

const { pool } = require(`./../../mysql`);

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "refreci21@gmail.com",
        pass: "refreci2021!"
    },
    tls: {
        rejectUnauthorized: false
    }
});

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

app.post("/searchName", async (req, res) => {
    const userName = req.body.userName;

    console.log(userName);

    try {
        const [rows, fields] = await pool.query("SELECT * FROM User WHERE userName = ?", [
            userName
        ]);

        if(rows.length === 0){
            res.send(true);
        }
        else{
            res.send(false);
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/searchID", async (req, res) => {
    const userID = req.body.userID;

    console.log(userID);

    try {
        const [rows, fields] = await pool.query("SELECT * FROM User WHERE userID = ?", [
            userID
        ]);

        if (rows.length === 0) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/emailAuth", async (req, res) => {
    const userID = req.body.userID;
    const randomNumber = Math.floor((Math.random() * (100 - 1) + 1));

    const mailOptions = {
        from: "refreci21@gmail.com",
        to: userID,
        subject: "Ref:Reci 이메일 인증",
        html: `화면에서 다음 숫자를 입력해주세요. <h>${randomNumber}</h>`
    };
    console.log(userID);
    console.log(randomNumber);
    res.send(JSON.stringify(randomNumber));

    try{
        const email = await smtpTransport.sendMail(mailOptions);
        smtpTransport.close();
    }
    catch(err){
        console.log(err);
    }
});

module.exports = app;
