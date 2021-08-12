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
        user: process.env.emailID,
        pass: process.env.emailPW
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
        const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, ?, NOW(), 0, 0)", [
            userName,
            userID,
            hashPassword,
        ]);

        res.send({ value: 'Success' });
    }
    catch (err) {
        console.log('===========회원가입 중 에러 발생===========');
        console.log(err);
    }

})

app.post("/login", async (req, res) => {
    const userID = req.body.userID;
    const password = req.body.userPW;

    // console.log(userID);
    // console.log(password);

    try {
        const [rows, fields] = await pool.query("SELECT uID, userPW FROM User WHERE userID = ?", [
            userID
        ]);
        
        let dbUserPW = JSON.stringify(rows[0].userPW);
        let t = dbUserPW.replace("\"","");
        let s = t.replace("\"", "");
        dbUserPW = s;
        
        //salt값으로 해쉬 처리 해주는 부분
        const hashPassword = crypto.createHash("sha512").update(password).digest("hex");

        // console.log(`password: ${password}`);
        // console.log(`hashPassword: ${hashPassword}`);
        // console.log(`dbUserPW: ${dbUserPW}`);

        if(dbUserPW === hashPassword){
            console.log("비밀번호 일치");
            req.session.uid = rows[0].uID;

            req.session.save(() => {
                res.send(true);
                console.log(req.session);
            });
            
        }
        else{
            console.log("비밀번호 불일치");
            res.send(false);
        }
        
    }
    catch (err) {
        console.log('===========로그인 중 에러 발생===========');
        console.log(err);
    }
});

app.get("/logout", async(req, res) => {
    try{
        req.session.destroy(()=>{
            res.clearCookie('connect.sid');
            console.log('로그아웃 됨');
            res.redirect('http://i5a203.p.ssafy.io/signin');
        })
    }
    catch(err){
        console.log(err);
    }
})

app.post("/searchID", async (req, res) => {
    const userID = req.body.userID;

    // console.log(userID);

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
        console.log('===========아이디 검색 중 에러 발생===========');
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
    //res.send(JSON.stringify(randomNumber));

    try{
        const email = await smtpTransport.sendMail(mailOptions);
        smtpTransport.close();
        res.send({value: 'Email Sent', number: randomNumber});
    }
    catch(err){
        console.log('===========이메일 전송 중 에러 발생===========');
        console.log(err);
        res.send({ value: 'Email Error' });
    }
});

app.post("/changePassword", async (req, res) => {
    const userID = req.body.userID;
    const password = req.body.userPW;

    console.log(`바꿀 비밀번호 ${password}`);

    if (password.length < 8) {
        res.send({ value: 'Short password' });
        return;
    }

    try {
        const hashPassword = crypto.createHash("sha512").update(password).digest("hex");

        await pool.query("UPDATE User SET userPW = ? WHERE userID = ?", [
            hashPassword,
            userID,
        ]);

        res.send({ value: 'Success' });
    }
    catch (err) {
        console.log('===========비밀번호 변경 중 에러 발생===========');
        console.log(err);
    }
});

app.get("/isLogin", async (req, res) => {
    if(req.session.uid){
        console.log(`환영합니다 유저 넘버 ${req.session.uid}`);
    }
    else{
        console.log('로그인이 되어있지 않습니다.')
    }
    
    console.log(req.sessionID)
    console.log(req.session);
    res.send({value:req.session.uid});
})

app.get("/userInfo", async (req, res) => {
    const uID = req.session.uid;
    //const uID = 1;

    try {
        const [rows1, fields1] = await pool.query("SELECT userID, userName FROM User WHERE uID = ?", [
            uID
        ]);

        const userID = rows1[0].userID;
        const userName = rows1[0].userName;

        console.log(userID);
        console.log(userName);

        const [rows2, fields2] = await pool.query("SELECT COUNT(productName) AS cnt FROM UserProduct WHERE uID = ?", [
            uID
        ]);

        const foodCount = rows2[0].cnt;
        console.log(foodCount);
        
        const [rows3, fields3] = await pool.query("SELECT COUNT(productName) AS cnt FROM UserProduct WHERE uID = ? AND 0 <= DATE(productShelfLife) - DATE(NOW()) AND DATE(productShelfLife) - DATE(NOW()) <= 3", [
            uID
        ]);

        const expire3FoodCount = rows3[0].cnt;
        console.log(expire3FoodCount);

        const [rows4, fields4] = await pool.query("SELECT COUNT(productName) AS cnt FROM UserProduct WHERE uID = ? AND 0 > DATE(productShelfLife) - DATE(NOW())", [
            uID
        ]);

        const expiredFoodCount = rows4[0].cnt;
        console.log(expiredFoodCount);

        res.send({
            userID: userID,
            userName: userName,
            foodCount: foodCount,
            expire3FoodCount: expire3FoodCount,
            expiredFoodCount: expiredFoodCount,
        })
    }
    catch (err) {
        console.log('===========유저 정보 조회 중 에러 발생===========');
        console.log(err);
    }
})

app.get("/recipeInfo", async (req, res) => {
    // const uID = req.session.uid;
    const uID = 1;

    try {
        const [rows1, fields1] = await pool.query("SELECT r.recipeName AS rName, r.recipeIntroduce AS rIntroduce, r.recipeImage AS rImage FROM Favorites AS f JOIN Recipe AS r ON r.rID = f.rID WHERE f.uID = ?", [
            uID
        ]);

        const len = rows1.length
        console.log(len);

        // for(let i=0; i<len; i++){
        //     console.log(rows1[i].rName);
        //     console.log(rows1[i].rIntroduce);
        //     console.log(rows1[i].rImage);
        // }
        
        // console.log(rows1)

        res.json(rows1)
    }
    catch (err) {
        console.log('===========즐겨찾기 레시피 조회 중 에러 발생===========');
        console.log(err);
    }
})

module.exports = app;
