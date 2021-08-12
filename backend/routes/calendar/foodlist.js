const express = require("express");
const app = express.Router();
const axios = require("axios");
const { pool } = require(`../../mysql`)