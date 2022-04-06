const Post = require("../models/Post");
const User = require("../models/User");
const authService = require("./auth");

async function getAllPublicPosts() {
  return await (await Post.find({ public: true })).reverse();
}

async function getAllProfilePosts(userId) {
  return await (await Post.find({ author: userId })).reverse();
}

async function createPost(
  name,
  description,
  imageUrl,
  author,
  public,
  creatorName
) {
  try {
    const post = await Post.create({
      name,
      description,
      imageUrl,
      author,
      public,
      creatorName,
    });
    const user = await User.findById(author);
    user.ownProjects.push(post._id);
    await user.save();
    return post;
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(projectId) {
  try {
    const post = await Post.findById(projectId);
    const user = await User.findById(post.author);
    let usrIdx = user.ownProjects.indexOf(post._id);
    user.ownProjects.splice(usrIdx, 1);
    await user.save();

    let groupMember;
    post.groupMembers.forEach(async (userId) => {
      groupMember = await User.findById(userId);
      groupMember.otherProjects.splice(
        groupMember.otherProjects.indexOf(groupMember._id),
        1
      );
      await groupMember.save();
    });
    // console.log("Vlazinq li?"); xaxaxaxa

    console.log(projectId);
    return await Post.findByIdAndDelete(projectId);
  } catch (err) {
    console.log(err);
  }
}

async function getPostById(id) {
  return await Post.findById(id).populate("groupMembers").populate("author");
}

async function addMemberToPost(projectId, email) {
  try {
    console.log(projectId, email);
    const user = await authService.getUserByEmail(email);
    const project = await Post.findById(projectId);
    console.log(project, user);
    if (
      !project.groupMembers.includes(user._id) &&
      !project.author.equals(user._id)
    ) {
      project.groupMembers.push(user._id);
      user.otherProjects.push(project._id);
      await user.save();
      await project.save();
    }
    return Post.findById(projectId).populate("groupMembers");
  } catch (err) {
    return err.message;
  }
}

async function removeMemberFromPost(projectId, email) {
  try {
    const user = await authService.getUserByEmail(email);
    const project = await Post.findById(projectId);
    const idx = project.groupMembers.indexOf(user._id);
    project.groupMembers.splice(idx, 1);
    await project.save();

    const usrIdx = user.otherProjects.indexOf(project._id);
    user.otherProjects.splice(usrIdx, 1);
    await user.save();
    return Post.findById(projectId).populate("groupMembers");
  } catch (err) {
    return err.message;
  }
}

async function editPost(projectId, data) {
  try {
    return await Post.findByIdAndUpdate(projectId, data, {
      useValidators: true,
      new: true,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllPublicPosts,
  getAllProfilePosts,
  createPost,
  getPostById,
  addMemberToPost,
  removeMemberFromPost,
  editPost,
  deletePost,
};
