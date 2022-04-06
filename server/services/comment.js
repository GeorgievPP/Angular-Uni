const Project = require("../models/Post");
const Comment = require("../models/Comment");

async function getAllComments(neshto) {
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
