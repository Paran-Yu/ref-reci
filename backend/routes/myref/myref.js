const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//현재 날짜를 yyyy-mm-dd 포맷으로 리턴
function getCurrentDate()
{
    const date = new Date();
    const year = date.getFullYear().toString();

    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    return year + '-' + month + '-' + day ;
}



app.get("/", async (req, res) =>{
    const [rows, fields] = await pool.query('SELECT * FROM project.UserProduct WHERE uID = 1')
    
    for (let i = 0; i < rows.length; i++){
        console.log(rows[i])
    }

})
//재료 삽입
app.post("/", async (req, res) =>{
    const nowDay = getCurrentDate()

    const uID = req.body.uID
    const productName = req.body.productName
    const productCount = req.body.productCount
    const productClassification1 = req.body.productClassification1
    const productClassification2 = req.body.productClassification2
    const productShelfLife = req.body.productShelfLife

    const sql = `INSERT INTO project.UserProduct
    (uID, productName, productCount, createdDate, productClassification1, productClassification2, productShelfLife, isDeleted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
    
    try {
        await pool.query(sql,[uID, productName, productCount, nowDay,productClassification1, productClassification2, productShelfLife, 0])
        res.redirect('/')

        console.log('Call Updated DB')
        const [rows, fields] = await pool.query('SELECT * FROM project.UserProduct WHERE uID = 1')
    
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
        }
    }
    catch (err) {
        console.log(err);
    }

})
//재료명 수정시 소분류 매핑 방법을 생각해 보아야할 듯
app.put("/", async (req, res) =>{
    console.log(req.body);
    const upID = req.body.upID
    const productName = req.body.productName
    const productCount = req.body.productCount
    const productClassification1 = req.body.productClassification1
    const productClassification2 = req.body.productClassification2
    const productShelfLife = req.body.productShelfLife

    const sql = `UPDATE project.UserProduct
    SET productName = ?, productCount = ?, productClassification1 = ?, productClassification2 = ?, productShelfLife =  ?
    WHERE upID = ?;`
    try {
        console.log("Update DB by PUT Method")
        await pool.query(sql,[productName, productCount, productClassification1, productClassification2, productShelfLife, upID])
        res.redirect('/')
        // 테스트를 위한 냉장고 DB 호출 코드

        console.log('Call Updated DB')
        const [rows, fields] = await pool.query('SELECT * FROM project.UserProduct WHERE uID = 1')
    
        for (let i = 0; i < rows.length; i++){
            console.log(rows[i])
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.delete('/', async (req, res) => {
    const uID = req.body.uID
    const upID = req.body.upID
    await pool.query('DELETE FROM project.UserProduct WHERE uID = ? and upID = ?;',[uID,upID])
    // 테스트를 위한 냉장고 DB 호출 코드

    console.log('Call Updated DB')
    const [rows, fields] = await pool.query('SELECT * FROM project.UserProduct WHERE uID = 1')
        
    for (let i = 0; i < rows.length; i++){
        console.log(rows[i])
    }
})


module.exports = app;
