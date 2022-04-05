const Project = require("../models/Project");
// const User = require("../models/User");
const Comment = require("../models/Comment");
// const authService = require("./auth");

async function getAllComments(neshto) {
  //   const post = await Project.findById(id);
  return await (await Comment.find({ post: neshto })).reverse();
}

async function createComment(description, author, jimHelper, post) {
  try {
    const comment = await Comment.create({
      description,
      author,
      jimHelper,
      post,
    });
    return comment;
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(commentId) {
  try {
    return await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllComments,
  createComment,
  deleteComment
};
