// router.HTTPメソッド("エンドポイント", 実行する処理)

const express = require('express');
const router = express.Router();
const API = require('../controllers/controllers.js');

// 全権取得
router.get('/', API.fetchAllPost);
// 指定IDの詳細取得
router.get('/:id', API.fetchPostDetail);
// コンテンツの投稿
router.post('/', API.createPost);
// 指定DIのコンテンツの投稿
router.put('/:id', API.updatePost);
// 指定IDのコンテンツの削除
router.delete('/:id', API.deletePost);
// サインアップ
router.post("/signup", API.signup)
// ログイン
router.post("/login", API.login)

module.exports = router;

// https://qiita.com/takengineer1216/items/7523d1b23c1ab15271e6