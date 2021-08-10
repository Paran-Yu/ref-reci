
const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)


//F에서 date 형식을 보내면 해당하는 월의 events를 뿌려줌
app.post("/getMonth", async (req, res) =>{
    let date = req.body.date
    date = new Date(date)
    console.log(date)
    //12월 일때 처리 year
    const year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();
    const sql = `SELECT productShelfLife 
    FROM refreci.UserProduct 
    WHERE uID = 1 AND MONTH(productShelfLife) = ? AND YEAR(productShelfLife) = ?`
    try {

        const data = await pool.query(sql,[month, year])
        console.log(data)
        //나중에 중복제거 할것
        //res.send(data)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})

module.exports = app;
