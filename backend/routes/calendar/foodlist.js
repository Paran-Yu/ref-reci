const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)




//dueday 음식 수량 photo
//classification
app.post("/getItems", async (req, res) =>{
    let getDate = new Date(req.body.date)
    let date = new Date()
    const sql = `SELECT a.Classification2Image as Img, DATEDIFF(productShelfLife, ?) as Dday, b.productName as Name, b.productCount as Count
    FROM refreci.UserProduct as b
    right join refreci.Classification2 as a
    on b.productClassification2 = a.c2ID
    Where b.uID=1 AND productShelfLife = ?;`
    const getyear = getDate.getFullYear().toString();
    let getmonth = getDate.getMonth() + 1;
    getmonth = getmonth < 10 ? '0' + getmonth.toString() : getmonth.toString();
    let getday = getDate.getDate();
    getday = getday < 10 ? '0' + getday.toString() : getday.toString();


    const year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();
    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    console.log(year+'-'+month+'-'+day)
    try {

        const data = await pool.query(sql, [year+'-'+month+'-' + day, getyear + '-' + getmonth + '-' + getday])
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
        res.send(jsonArray)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})

module.exports = app;