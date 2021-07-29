const express = require("express");
const app = express.Router();
const axios = require("axios");

require('dotenv').config();

const githubClientID = process.env.githubClientID;
const githubClientSecret = process.env.githubClientSecret;
const googleClientID = process.env.googleClientID;
const googleClientSecret = process.env.googleClientSecret;

app.get("/github", async (req, res) => {
    const requestToken = req.query.code;

    try {
        //==================================================================
        // const url = 'http://github.com/login/oauth/access_token';

        // const request_body = {
        //     githubClientID: githubClientID,
        //     githubClientSecret: githubClientSecret,
        //     requestToken: requestToken,
        // };
        
        // const headers = {
        //     'Content-Type': 'application/json'
        // };

        // const access_token = await axios.post(url, request_body, {
        //     headers: headers
        // });

        // console.log('============response.data============');
        // console.log(access_token.data);
        // console.log('============access_token============');
        // console.log(access_token.data.access_token);


        //==================================================================
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

        console.log('social login result:', userResponse.data);
        console.log(`${userResponse.data.name}님 환영합니다.`)

        res.redirect('/');
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
            url: `https://oauth2.googleapis.com/token?client_id=${googleClientID}&client_secret=${googleClientSecret}&grant_type=authorization_code&redirect_uri=http://localhost:3001/callback/google&code=${requestToken}`,
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

        console.log('social login result:', userResponse.data);
        console.log(`${userResponse.data.name}님 환영합니다.`)

        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = app;
