import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    }catch(err){
        res.status(404).json({message: err.message})
    }
};

export const createPost = async (req, res) => {
    const {body: post} = req;
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        // https://www.restapitutorial.com/httpstatuscodes.html
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message: err.message})
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    (!mongoose.Types.ObjectId.isValid(id)) && res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id}= req.params;

    (!mongoose.Types.ObjectId.isValid(id)) && res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'} )
};

export const likePost = async(req, res) => {
    const {id} = req.params;

    (!mongoose.Types.ObjectId.isValid(id)) && res.status(404).send('No post with id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);
}