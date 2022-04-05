const router = require("express").Router();
const auth = require("../middlewares/auth");
const projectsService = require("../services/project");
const commentsService = require("../services/comment");

router.get("/all", async (req, res) => {
  const projects = await projectsService.getAllPublicProjects();
  res.status(200).json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await projectsService.getProjectById(req.params.id);
  res.status(200).json(project);
});

router.post("/profile-posts", async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await projectsService.getAllProfileProjects(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  // middleware: auth
  try {
    // let comment = [];
    const { name, description, imageUrl, user_id, public, creatorName } = req.body;
    const project = await projectsService.createProject(
      name,
      description,
      imageUrl,
      user_id,
      public,
      creatorName
    );
    res.status(200).json(project);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.post("/like", async (req, res) => {
  // middleware: auth
  try {
    const { postId, email } = req.body;
    console.log(postId, email);

    const updatedProject = await projectsService.addMemberToProject(
      postId,
      email
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send("An error has occurred while adding a new member to the project!");
  }
});

router.post("/unlike", async (req, res) => {
  // middleware: auth
  try {
    const { postId, email } = req.body;
    const groupMembers = await projectsService.removeMemberFromProject(
      postId,
      email
    );
    res.status(200).json(groupMembers);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send("An error has occurred while removing a member from the project!");
  }
});

router.post("/delete", async (req, res) => {
  // middleware: auth
  try {
    console.log(req.body);
    const { id } = req.body;
    console.log(id);
    const result = await projectsService.deleteProject(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("An error has occurred while deleting the project!");
  }
});

router.post("/edit", async (req, res) => {
  // middleware: auth
  try {
    const { projectId, name, description, imageUrl, public, data } = req.body;
    let project = {};
    console.log(req.body);
    if (data) {
      const updateData = {
        name,
        description,
        imageUrl,
        public,
        data,
      };
      project = await projectsService.editProject(projectId, updateData);
    } else {
      const updateData = {
        name,
        description,
        imageUrl,
        public,
      };
      project = await projectsService.editProject(projectId, updateData);
    }
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(400).send("An error has occurred while editing the project!");
  }
});

//Comments

// router.get("/comments", async (req, res) => {
//   try {
//     const { neshto } = req.body;
//     const comments = await commentsService.getAllComments(neshto);
//     res.status(200).json(comments);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send(error.message);
//   }
// });

// router.post("/add-comment", async (req, res) => {
//   try {
//     const { description, author, post } = req.body;
//     console.log("tyka");
//     const newComment = await commentsService.createComment(
//       description,
//       author,
//       post
//     );
//     res.status(200).json(newComment);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send(error.message);
//   }
// });

module.exports = router;
