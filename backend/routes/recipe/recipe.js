const express = require("express");
const app = express.Router();
const axios = require("axios");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();

const { pool } = require(`./../../mysql`);

app.get("/tenRecentRecipe", async(req, res) => {
    try {
        const [rows, fields] = await pool.query("SELECT recipeName AS rName, recipeImage AS rImage FROM Recipe ORDER BY rID DESC LIMIT 10;");

        res.json(rows);
    }
    catch (e) {
        console.log('===========최근 레시피 조회 중 에러 발생===========');
        console.log(e);
    }
})

app.get("/tenFavorRecipe", async(req, res) => {
    try {
        const [rows, fields] = await pool.query("SELECT r.recipeName AS rName, r.recipeImage AS rImage, count(*) FROM Favorites AS f JOIN Recipe AS r ON f.rID = r.rID GROUP BY r.rID ORDER BY count(*) DESC;");
        
        res.json(rows);
    }
    catch (e) {
        console.log('===========즐겨찾기 탑텐 레시피 조회 중 에러 발생===========');
        console.log(e);
    }
})

app.get("/favorRecipe", async (req, res) => {
    // const uID = req.session.uid;
    const uID = 1;

    try {
        const [rows1, fields1] = await pool.query("SELECT r.recipeName AS rName, r.recipeIntroduce AS rIntroduce, r.recipeImage AS rImage FROM Favorites AS f JOIN Recipe AS r ON r.rID = f.rID WHERE f.uID = ?", [
            uID
        ]);

        res.json(rows1)
    }
    catch (err) {
        console.log('===========즐겨찾기 레시피 조회 중 에러 발생===========');
        console.log(err);
    }
})

module.exports = app;
