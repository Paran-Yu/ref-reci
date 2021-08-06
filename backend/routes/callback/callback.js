const express = require("express");
const app = express.Router();
const axios = require("axios");

require('dotenv').config();

const { pool } = require(`./../../mysql`);

const githubClientID = process.env.githubClientID2;
const githubClientSecret = process.env.githubClientSecret2;
const googleClientID = process.env.googleClientID2;
const googleClientSecret = process.env.googleClientSecret2;
const kakaoClientID = process.env.kakaoClientID2;
const kakaoClientSecret = process.env.kakaoClientSecret2;
const serverip = process.env.serverip2;

app.get("/github", async (req, res) => {
    const requestToken = req.query.code;

    console.log(requestToken);
    console.log(githubClientID);
    console.log(githubClientSecret);
    console.log(requestToken);

    try {
        const access_token = await axios({
            method: 'post',
            url: `http://github.com/login/oauth/access_token?client_id=${githubClientID}&client_secret=${githubClientSecret}&code=${requestToken}`,
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

        //console.log('social login result:', userResponse.data);
        console.log(`id: ${userResponse.data.id}`);
        console.log(`userName: ${userResponse.data.name}`);

        const [rows, fields] = await pool.query("SELECT * FROM User WHERE userID = ?", [
            userResponse.data.id
        ]);

        if(rows.length === 0){
            const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, 0, NOW(), 0, 1)", [
                userResponse.data.name,
                userResponse.data.id,
            ]);
        }
        res.redirect("http://localhost:3000/");
    }

    catch (err) {
        console.log(err);
    }
});

app.get("/google", async (req, res) => {
    const requestToken = req.query.code;
    console.log(requestToken);
    try {

        const access_token = await axios({
            method: 'post',
            url: `https://oauth2.googleapis.com/token?client_id=${googleClientID}&client_secret=${googleClientSecret}&grant_type=authorization_code&redirect_uri=${serverip}/callback/google&code=${requestToken}`,
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
            url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token.data.access_token}`,
            headers: {
                accept: 'application/json',
            },
        });

        //console.log('social login result:', userResponse.data);
        console.log(`id: ${userResponse.data.id}`);
        console.log(`userName: ${userResponse.data.name}`);

        const [rows, fields] = await pool.query("SELECT * FROM User WHERE userID = ?", [
            userResponse.data.id
        ]);

        if (rows.length === 0) {
            const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, 0, NOW(), 0, 1)", [
                userResponse.data.name,
                userResponse.data.id,
            ]);
        }
        res.redirect("http://localhost:3000/");
    }
    catch (err) {
        console.log(err);
    }

});

app.get("/kakao", async (req, res) => {
    const requestToken = req.query.code;
    console.log(requestToken);
    try {

        const access_token = await axios({
            method: 'post',
            url: `https://kauth.kakao.com/oauth/token?client_id=${kakaoClientID}&client_secret=${kakaoClientSecret}&grant_type=authorization_code&redirect_uri=${serverip}/callback/kakao&code=${requestToken}`,
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
            url: `https://kapi.kakao.com/v2/user/me?Authorization=${access_token.data.access_token}`,
            headers: {
                Authorization: `Bearer ${access_token.data.access_token}`,
                accept: 'application/json',
            },
        });

        //console.log('social login result:', userResponse.data);
        console.log(`id: ${userResponse.data.id}`);
        console.log(`userName: ${userResponse.data.properties.nickname}`);

        const [rows, fields] = await pool.query("SELECT * FROM User WHERE userID = ?", [
            userResponse.data.id
        ]);

        if (rows.length === 0) {
            const data = await pool.query("INSERT INTO User VALUES (null, ?, ?, 0, NOW(), 0, 1)", [
                userResponse.data.properties.nickname,
                userResponse.data.id,
            ]);
        }
        res.redirect("http://localhost:3000/");
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = app;
