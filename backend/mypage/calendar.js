
const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

function DatePlus(date)
{
    const year = date.getFullYear().toString();

    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    return year + '-' + month + '-' + day ;
}

app.get("/", async (req, res) =>{
    try {
        const [rows, fields] = await pool.query('SELECT productShelfLife FROM refreci.UserProduct WHERE uID = 1')
        
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
            // res.send({
            //     PN : rows[i].productName,
            //     PC : rows[i].productCount,
            //     DATE : rows[i].createdDate,
            //     END_DATE : rows[i].productShelfLife
            // })
        }

        res.json(rows)
    }
    catch (err) {
        console.log(err)
        return new Error(err)
    }

})

module.exports = app;
