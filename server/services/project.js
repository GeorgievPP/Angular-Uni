const Project = require("../models/Project");
const User = require("../models/User");
const authService = require("./auth");

async function getAllPublicProjects() {
  return await (await Project.find({ public: true })).reverse();
}

async function getAllProfileProjects(userId) {
  return await (await Project.find({ author: userId })).reverse();
}

async function createProject(
  name,
  description,
  imageUrl,
  author,
  public,
  creatorName
) {
  try {
    const project = await Project.create({
      name,
      description,
      imageUrl,
      author,
      public,
      creatorName,
    });
    const user = await User.findById(author);
    user.ownProjects.push(project._id);
    await user.save();
    return project;
  } catch (err) {
    console.log(err);
  }
}

async function deleteProject(projectId) {
  try {
    const project = await Project.findById(projectId);
    const user = await User.findById(project.author);
    let usrIdx = user.ownProjects.indexOf(project._id);
    user.ownProjects.splice(usrIdx, 1);
    await user.save();

    let groupMember;
    project.groupMembers.forEach(async (userId) => {
      groupMember = await User.findById(userId);
      groupMember.otherProjects.splice(
        groupMember.otherProjects.indexOf(groupMember._id),
        1
      );
      await groupMember.save();
    });
    console.log("Vlazinq li?");
    console.log(projectId);
    return await Project.findByIdAndDelete(projectId);
  } catch (err) {
    console.log(err);
  }
}

async function getProjectById(id) {
  return await Project.findById(id).populate("groupMembers").populate("author");
}

async function addMemberToProject(projectId, email) {
  try {
    console.log(projectId, email);
    const user = await authService.getUserByEmail(email);
    const project = await Project.findById(projectId);
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
    return Project.findById(projectId).populate("groupMembers");
  } catch (err) {
    return err.message;
  }
}

async function removeMemberFromProject(projectId, email) {
  try {
    const user = await authService.getUserByEmail(email);
    const project = await Project.findById(projectId);
    const idx = project.groupMembers.indexOf(user._id);
    project.groupMembers.splice(idx, 1);
    await project.save();

    const usrIdx = user.otherProjects.indexOf(project._id);
    user.otherProjects.splice(usrIdx, 1);
    await user.save();
    return Project.findById(projectId).populate("groupMembers");
  } catch (err) {
    return err.message;
  }
}

async function editProject(projectId, data) {
  try {
    return await Project.findByIdAndUpdate(projectId, data, {
      useValidators: true,
      new: true,
    });
  } catch (err) {
    console.log(err);
  }
}

async function addComment(comment, postId) {
  try {
    const project = await Project.findById(postId);
    project.comment.push(comment);
    await project.save();
    return project;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllPublicProjects,
  getAllProfileProjects,
  createProject,
  getProjectById,
  addMemberToProject,
  removeMemberFromProject,
  editProject,
  deleteProject,
  addComment
};
