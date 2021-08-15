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
        const [rows, fields] = await pool.query("SELECT r.recipeName AS rName, r.recipeImage AS rImage, count(*) FROM Favorites AS f JOIN Recipe AS r ON f.rID = r.rID GROUP BY r.rID ORDER BY count(*) DESC LIMIT 10;");
        
        console.log("탑텐 레시피")
        console.log(rows);

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

app.post("/search", async(req, res) => {

    const cl2 = req.body.cl2;
    console.log(cl2)
    console.log(typeof cl2)
    let cl2Str = "(";
    const len = cl2.length;
    for(let i=0; i<len; i++){
        cl2Str = cl2Str + cl2[i];
        if(i===len-1){
            cl2Str = cl2Str + ")";
        }
        else{
            cl2Str = cl2Str + ",";
        }
    }

    console.log(cl2Str);
    console.log(typeof cl2Str);

    const sql = "SELECT r.rID, r.recipeName, r.recipeImage, r.recipeTime \
    FROM Recipe r, (SELECT DISTINCT ri.rID, count(*) count FROM RecipeIngredient ri, Ingredient i \
    WHERE ri.iID = i.iID and i.ingredientName REGEXP(SELECT REPLACE(GROUP_CONCAT(a.classification2Name), ',', '|') AS NAME FROM(SELECT c2.classification2Name FROM Classification2 c2 WHERE c2.c2ID in " + cl2Str + ") a) Group by ri.rID) rid WHERE r.rID = rid.rID Order by rid.count DESC;"

    try {
        const [rows1, fields1] = await pool.query(sql, []);

        res.json(rows1)
    }
    catch (err) {
        console.log('===========소분류로 레시피 조회 중 에러 발생===========');
        console.log(err);
    }
})

module.exports = app;
