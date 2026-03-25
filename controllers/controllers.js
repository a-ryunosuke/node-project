const Post = require("../models/models")

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

};

