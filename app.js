require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express()
// ポート指定
const port = process.env.PORT || 5000

// MongoDB接続
mongoose
.connect(process.env.DB_URL)
.then(() => console.log("データベース接続に成功"))
.catch((error) => console.log(error))