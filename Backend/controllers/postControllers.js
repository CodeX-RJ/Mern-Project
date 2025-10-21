import Model from "../model/Model.js";


export const getPosts = async (req, res) => {
  try {
    const posts = await Model.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

export const getPostById = async (req, res) => {  
  try {
    const post = await Model.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
};


export const createPost = async(req, res) => {
  console.log(req.body);
  try {
    const { title, description } = req.body;
    const newPost = new Model({ title, description });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedPost = await Model.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).send(`Post with ID ${req.params.id} deleted!`);
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  } 
};