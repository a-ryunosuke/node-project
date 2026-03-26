const Post = require("../models/models")

const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")
const User = require("../models/userModel")

module.exports = class API {
  // 全ての投稿を取得
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // 指定IDの詳細取得
  static async fetchPostDetail(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // 投稿
  static async createPost(req, res) {
    try {
      const post = req.body;
      try {
        await Post.create(post);
        res.status(201).json({ message: '投稿に成功！' });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // 投稿の更新
  static async updatePost(req, res) {
    const id = req.params.id;
    const newPost = req.body;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(201).json({ message: '更新に成功！' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // 投稿の削除
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      res.status(201).json({ message: '投稿の削除に成功！' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // ユーザー登録
  static async signup(req, res) {
    const { email, password } = req.body;
    try {
      // パスワードをハッシュ化
      // ハッシュ化（ハッシュ関数を用いてパシワードをランダムに見える値に変換する）
      // bcrypt.hash(password, 10)の10はハッシュの強度。大きいほど強度が高まる一方処理が遅くなる。
      const hashed = await bcrypt.hash(password, 10);
      await User.create({ email, password: hashed});
      res.status(201).json({ message: "ユーザー登録成功！"});
    } catch (err) {
      res.status(400).json({ message: err.message})
    }
  }
  // ログイン
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      // メールアドレスでユーザーを検索
      const user = await User.findOne({ email });
      if(!user) return res.status(404).json({ message: "ユーザーが見つかりません"});

      // パスワードを照合
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch) return res.status(401).json({ message: "パスワードが一致しません"})
      
      // JWTトークン発行
      // ヘッダ、ペイロード、著名をそれぞれエンコードし連結させたもの
      const token = Jwt.sign(
        { userId: user._id },
        // ↓長くランダムな文字数に変更推奨。本番では.envファイルで管理
        "YOUR_SELECT_KEY",
        // token有効期限
        { expiresIn: "24h"}
      );
      res.status(200).json({ token })
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  }
};

