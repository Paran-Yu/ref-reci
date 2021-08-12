const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)

app.get("/gets", async (req, res) =>{
    console.log('HIHIHIHIHIHIHIHIHIH')
})


//dueday 음식 수량 photo
app.post("/getItems", async (req, res) =>{
    let date = req.body.date
    date = new Date(date)
    console.log(date)
    const sql = `SELECT DATEDIFF(productShelfLife, createdDate) as Dday, productName as Name, productCount as Count
    FROM refreci.UserProduct 
    where UID = 1 and productShelfLife = ?;`
    const year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();
    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    try {

        const data = await pool.query(sql, year+'-'+month+'-'+day)

        let jsonArray 	= new Array();
        for (let i=0; i<data[0].length; i++) {
            let jsonObj		= new Object();
                
            jsonObj.Dday = data[0][i].Dday;
            jsonObj.Name = data[0][i].Name;
            jsonObj.Count = data[0][i].Count;                
            jsonObj = JSON.stringify(jsonObj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            jsonArray.push(JSON.parse(jsonObj));
        }
        console.log(jsonArray)
        res.send(data)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})

module.exports = app;