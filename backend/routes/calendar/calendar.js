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

app.get("/getEvents", async (req, res) =>{

    const sql = `SELECT DISTINCT(productShelfLife)
    FROM refreci.UserProduct 
    WHERE uID = 1`
    try {

        const data = await pool.query(sql)
        console.log(data)
        let jsonArray 	= new Array();
        for (let i=0; i<data[0].length; i++) {
            let jsonObj		= new Object();
                
            jsonObj.title = '';
            jsonObj.start	= new Date(data[0][i].productShelfLife);
            jsonObj.end	= new Date(data[0][i].productShelfLife);
                
            jsonObj = JSON.stringify(jsonObj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            jsonArray.push(JSON.parse(jsonObj));
        }
        //나중에 중복제거 할것
        //하나하나 title = '' start = ''' end = ''
        console.log(jsonArray)
        res.send(jsonArray)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})

module.exports = app;
