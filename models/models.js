// ライブラリ読み込み
const mongoose = require("mongoose")

// データの設計図
const PostSchema = mongoose.Schema({
    // タイトルとその型の指定
    // required true ＝ 必須項目
    title: { type: String, required: true},
    // コンテンツとその型
    content: { type: String, required: true},
    // 投稿時間
    // default デフォルト
    created_at: { type: Date, default: Date.now},
})

module.exports = mongoose.model("Post", PostSchema);