const express = require("express");
const app = express.Router();
const axios = require("axios");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require("cors");

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

app.use(cors());

app.post("/register", async (req, res) => {
    const userName = req.body.userName;
    const userID = req.body.userID;
    const inputPassword = req.body.userPW;
    const hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");

    console.log(`userName ${userName}`);
    console.log(`userID ${userID}`);
    console.log(`inputPassword ${inputPassword}`);
    console.log(`hashPassword ${hashPassword}`);
    
    //닉네임이 2자 미만이면 안된다.
    console.log(`닉네임 글자수 ${userName.length}`);
    if (userName.length < 2){
        res.send({ value: 'Short userName' });
        return;
    }

    //비밀번호가 8자 미만이면 안된다.
    console.log(`비밀번호 글자수 ${inputPassword.length}`);
    if (inputPassword.length < 8) {
        res.send({ value: 'Short password' });
        return;
    }

    try {
        const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, ?, NOW(), 0)", [
            userName,
            userID,
            hashPassword,
        ]);

        res.send({ value: 'Success' });
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
        
        //salt값으로 해쉬 처리 해주는 부분
        const hashPassword = crypto.createHash("sha512").update(password).digest("hex");

        console.log(`password: ${password}`);
        console.log(`hashPassword: ${hashPassword}`);
        console.log(`dbUserPW: ${dbUserPW}`);

        if(dbUserPW === hashPassword){
            console.log("비밀번호 일치");
            res.send(true);
        }
        else{
            console.log("비밀번호 불일치");
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
        const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

        if (!reg_email.test(userID)) {
            res.send({ value: 'Wrong Email' });
        }
        else {
            const [rows, fields] = await pool.query("SELECT * FROM User WHERE userID = ?", [
                userID
            ]);

            if (rows.length === 0) {
                res.send({ value: 'Success' });
            }
            else {
                res.send({ value: 'Duplicate Email' });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/emailAuth", async (req, res) => {
    const userID = req.body.userID;
    const randomNumber = Math.floor((Math.random() * (999999 - 100000) + 100000));

    const mailOptions = {
        from: "refreci21@gmail.com",
        to: userID,
        subject: "Ref:Reci 이메일 인증",
        html: `화면에서 다음 숫자를 입력해주세요. <strong>${randomNumber}</strong>`
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
