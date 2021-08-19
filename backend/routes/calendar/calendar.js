const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)


app.get("/getEvents", async (req, res) =>{

    const sql = `SELECT DISTINCT(productShelfLife)
    FROM refreci.UserProduct 
    WHERE uID = 1`
    try {

        const data = await pool.query(sql)
        // console.log(data)
        let jsonArray 	= new Array();
        for (let i=0; i<data[0].length; i++) {
            
            let jsonObj		= new Object();
                
            jsonObj.title = '';
            jsonObj.start	= new Date(data[0][i].productShelfLife);
            jsonObj.end	= new Date(data[0][i].productShelfLife);
            if (data[0][i].productShelfLife == null){
                jsonObj.title = '';
                jsonObj.start = new Date();
                jsonObj.end	= new Date()
                console.log(data[0][i])
            }
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
