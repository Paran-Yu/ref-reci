const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)




//dueday 음식 수량 photo
//classification
app.post("/getItems", async (req, res) =>{
    console.log(req.body)
    let type
    let  sql
    let getDate, date, getyear, getmonth, getday, year, month, day
    if (req.body.date == ''){
        type = 1
        sql = `SELECT a.Classification2Image as Img, DATEDIFF(productShelfLife, now()) as Dday, b.productName as Name, b.productCount as Count
        FROM refreci.UserProduct as b
        right join refreci.Classification2 as a
        on b.productClassification2 = a.c2ID
        Where b.uID=1
        Order by DATEDIFF(productShelfLife, now()) ASC`
    }
    else{
        type = 2
        getDate = new Date(req.body.date)
        date = new Date()
        sql = `SELECT a.Classification2Image as Img, DATEDIFF(productShelfLife, ?) as Dday, b.productName as Name, b.productCount as Count
        FROM refreci.UserProduct as b
        right join refreci.Classification2 as a
        on b.productClassification2 = a.c2ID
        Where b.uID=1 AND productShelfLife = ?;`

        getyear = getDate.getFullYear().toString();
        getmonth = getDate.getMonth() + 1;
        getmonth = getmonth < 10 ? '0' + getmonth.toString() : getmonth.toString();
        getday = getDate.getDate();
        getday = getday < 10 ? '0' + getday.toString() : getday.toString();


        year = date.getFullYear().toString();
        month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();
        day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();
    }
    // console.log(year+'-'+month+'-'+day)
    try {
        let data
        console.log(sql)
        if (type == 1){
            data = await pool.query(sql)
            console.log(data[0])
        }
        else if (type == 2){
            data = await pool.query(sql, [year+'-'+month+'-' + day, getyear + '-' + getmonth + '-' + getday])
            console.log(data[0])
        }
        let jsonArray 	= new Array();
        for (let i=0; i<data[0].length; i++) {
            let jsonObj		= new Object();
            jsonObj.Img = data[0][i].Img
            jsonObj.Dday = data[0][i].Dday;
            jsonObj.Name = data[0][i].Name;
            jsonObj.Count = data[0][i].Count;
            jsonObj = JSON.stringify(jsonObj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            jsonArray.push(JSON.parse(jsonObj));
        }
        console.log(jsonArray)
        if (!jsonArray){
            console.log('HIHIHIHI')
        }
        res.send(jsonArray)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})

module.exports = app;