
const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)


app.get("/", async (req, res) =>{
    const [rows, fields] = await pool.query('SELECT * FROM project.UserProduct WHERE uID = 1')
    
    for (let i = 0; i < rows.length; i++){
        console.log(rows[i])
    }
    console.log(fields)

})

app.post("/", async (req, res) =>{
    const upID = req.body.upID
    const productName = req.body.product
    const productCount = req.body.productCount
    const productClassification1 = req.body.productClassification1
    const productClassification2 = req.body.productClassification2
    const productShelfLife = req.body.productShelfLife

    const sql = `UPDATE project.UserProduct
    SET productName = ?, productCount = ?, productClassification1 = ?, productClassification2 = ?, productShelfLife =  ?
    WHERE upID = ?;`
    try {
        await pool.query(sql,[productName, productCount, productClassification1, productClassification2, productShelfLife, upID])
        res.redirect('/')
    }
    catch (err) {
        console.log(err);
    }
})

app.update


module.exports = app;
