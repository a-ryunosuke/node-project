const Post = require("../models/models")

module.exports = class API {
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async fetchPostDetail(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async createPost(req, res) {
    try {
      const post = req.body;
      try {
        await Post.create(post);
        res.status(201).json({ message: '投稿に成功!!' });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async updatePost(req, res) {
    const id = req.params.id;
    const newPost = req.body;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(201).json({ message: 'post updated' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      res.status(201).json({ message: 'post deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

};

