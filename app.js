// 必要なモジュールのインポート
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express(); // express のインスタンス化
app.use(express.json());
const port = process.env.PORT || 5000; // ポート番号の指定

// ルート設定
const posts = require('./routes/route');
app.use('/api/posts', posts);

// MongoDB接続
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('データベース接続に成功しました'))
  .catch((err) => console.log(err));

// サーバー立ち上げ
app.listen(port, () => console.log(`server running at localhost:${port}`));